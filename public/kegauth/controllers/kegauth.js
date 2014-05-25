'use strict';

angular.module('mean.kegauth').controller('KegauthController', ['$scope', '$rootScope', 'Global', 'GetKegAuthService','PutKegAuthService',
    function($scope, $rootScope, Global, GetKegAuthService, PutKegAuthService) {
        $scope.global = Global;
        $scope.authenticated = Global.authenticated;


        $scope.refresh=function() {
          $scope.kegauth = {
              name: 'kegauth',
          };
          GetKegAuthService.get(function(response) {
              $scope.kegauth = response;
          });
        };

        $scope.unlock=function() {
          PutKegAuthService.update({
            api_key:'pourme',
            confirm:true,
            ttl:30000
          },
            function(response) {
              $scope.kegauth = response;
          });
        };


        $rootScope.$on('loggedin', function() {
            $scope.authenticated = true;
        });

        $scope.refresh();
    }
]);
