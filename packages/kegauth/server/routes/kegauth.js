'use strict';

// The Package is past automatically as first parameter
module.exports = function(Kegauth, app, auth, database) {

    var authorization = {
      'confirm': true,
      'expiry': 0,
      'waiters': [],
      'to_json': function() {
        var ttl = (this.expiry - new Date().getTime());
        if(ttl <= 0) {
          return null;
        } else {
          return  {
              'confirm': this.confirm,
              'ttl': ttl
          };
        }
      }
    };

    /* GET authorization  */
    app.get('/api/authorization', function(req, res) {
      auth = authorization.to_json();
      if(auth === null) {
        if(req.query.wait === 'true') {
          authorization.waiters.push(res);
          console.log('Suspending GET Auth...200');
        } else {
          console.log('No auth...404');
          res.status(404).send();
        }
      } else {
        console.log('GET Auth...200');
        res.json(auth);
      }
    });

    /* PUT authorization */
    app.put('/api/authorization', auth.requiresLogin, function(req, res) {
      var api_key = req.body.api_key;
      if(api_key !== 'pourme') {
        console.log('PUT auth fail...401');
        res.status(401).send();
      } else {
        authorization.confirm = req.body.confirm;
        authorization.expiry = new Date().getTime() + req.body.ttl;
        console.log('PUT auth...201');
        var auth_json = authorization.to_json();
        res.json(auth_json);

        //respond to the waiters
        authorization.waiters.map(function(susp_res) {
          console.log('Resuming GET Auth...200');
          susp_res.json(auth_json);
        });
        authorization.waiters = [];

      }
    });


    
};
