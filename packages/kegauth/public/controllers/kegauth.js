'use strict';

angular.module('mean').controller('KegauthController', ['$scope', 'Global',
    function($scope, Global, Kegauth) {
        $scope.global = Global;
        $scope.kegauth = {
            name: 'kegauth'
        };
    }
]);
