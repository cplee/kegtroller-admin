'use strict';

angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('kegauth example page', {
            url: '/kegauth/example',
            templateUrl: 'kegauth/views/index.html'
        });
    }
]);
