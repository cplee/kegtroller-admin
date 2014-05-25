'use strict';

angular.module('mean.kegauth').factory('PutKegAuthService',['$resource',
  function($resource){
    return $resource('/api/authorization', {},  {
      'get':    {method:'GET'},
      'update':   {method:'PUT'}
    });
  }
]);
