/**
 * Created by victoroliveira on 08/04/16.
 */

(function () {
    'use strict';

    angular.module('app')
    .config(['$provide', '$mdThemingProvider', function ($provide, $mdThemingProvider) {

        $provide.constant('handlebars', window.Handlebars);

        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey', {
                'default': '400'
            });

    }])

}());