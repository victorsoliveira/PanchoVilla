/**
 * Created by victoroliveira on 07/04/16.
 */

(function () {
    'use strict';

    var app =angular.module('app', ['ngMaterial', 'ui.ace']);

    app.run(['handlebarsHelpers', function(handlebarsHelpers){
        handlebarsHelpers.register();
    }]);

})();