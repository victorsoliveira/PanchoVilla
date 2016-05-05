/**
 * Created by victor.oliveira on 05/05/2016.
 */

(function() {

    'use strict';

    angular.module('app')
        .service('handlebarsHelpers', ['handlebars', handlebarsHelpers]);

    function handlebarsHelpers(handlebars) {

        return {
            register: register
        };

        function register (){

            handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

                if (arguments.length < 3) {
                    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
                }

                if (options === undefined) {
                    options = rvalue;
                    rvalue = operator;
                    operator = "===";
                }

                var result = eval(lvalue + " " + operator + " " + rvalue);

                if (result) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }

            });
            handlebars.registerHelper('formatDate', function (date, options) {

                if (typeof date === "undefined" || typeof date !== "string" || date === "") {
                    return "Invalid date";
                }

                if (options.hash && options.hash.format) {
                    var format = options.hash.format;
                    return moment(date).format(format);
                }

            });
        }

    }

})();