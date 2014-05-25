'use strict';

angular.module('mean.kegauth').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('kegauth', {
            url: '/kegauth',
            templateUrl: 'public/kegauth/views/index.html'
        });
    }
]);
