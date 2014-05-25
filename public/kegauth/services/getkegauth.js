'use strict';

angular.module('mean.kegauth').factory('GetKegAuthService',['$resource',
  function($resource){
    return $resource('/api/authorization', {});
  }
]);
