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

        function register() {

            handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

                var operators, result;

                if (arguments.length < 3) {
                    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
                }

                if (options === undefined) {
                    options = rvalue;
                    rvalue = operator;
                    operator = "===";
                }

                operators = {
                    '==': function (l, r) { return l == r; },
                    '===': function (l, r) { return l === r; },
                    '!=': function (l, r) { return l != r; },
                    '!==': function (l, r) { return l !== r; },
                    '<': function (l, r) { return l < r; },
                    '>': function (l, r) { return l > r; },
                    '<=': function (l, r) { return l <= r; },
                    '>=': function (l, r) { return l >= r; },
                    'typeof': function (l, r) { return typeof l == r; }
                };

                if (!operators[operator]) {
                    throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
                }

                result = operators[operator](lvalue, rvalue);

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
            handlebars.registerHelper('table', function(data) {

                var getColumns = function(source){
                    'use strict';
                    var columns = [];

                    source.forEach(function(el){
                        Object.keys(el).forEach(function(value){
                            columns.push(value);
                        });
                    });

                    return columns.filter(function (item, pos) {return columns.indexOf(item) == pos});
                };

                var columns = getColumns(data);

                var str = '<table>';

                str += '<thead>';
                str += '<tr>';

                for (var c = 0; c < columns.length; c++) {
                    str += '<th>' + columns[c] + '</th>';
                }

                str += '</tr>';
                str += '</thead>';

                str += '<tbody>';

                for (var i = 0; i < data.length; i++ ) {
                    str += '<tr>';
                    for (var key in data[i]) {
                        str += '<td>' + data[i][key] + '</td>';
                    }
                    str += '</tr>';
                }

                str += '</tbody>';
                str += '</table>';

                return new handlebars.SafeString (str);

            });

        }

    }

})();