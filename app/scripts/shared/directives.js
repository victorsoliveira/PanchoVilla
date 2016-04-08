/**
 * Created by victoroliveira on 07/04/16.
 */

(function(){

    'use strict';

    angular.module('app')
        .directive('resize', ['$window', function($window) {

            return {
                restrict: 'A',
                scope: {
                    fixHeight: '@'
                },
                link: function (scope, element) {

                    var w = angular.element($window);
                    var changeHeight = function () { element.css('height', (w.height() - scope.fixHeight) + 'px'); };

                    w.bind('resize', function () {
                        changeHeight();   // when window size gets changed
                    });

                    changeHeight(); // when page loads

                    scope.$watch('fixHeight', function () {
                        changeHeight();
                    });
                }
            };

        }])
        .directive('iframeInjector', function(){

            return {
                restrict: 'A',
                scope: {
                    content: '@'
                },
                link: function (scope, el) {

                    if (el[0].nodeName.toLowerCase() !== 'iframe'){
                        throw new Error('Element must be an IFRAME');
                    }

                    var iframe = el[0];
                    var html_string = '';
                    var iframedoc = getIframeDoc();

                    scope.$watch('content', function(newValue) {

                        html_string = newValue;

                        if (iframedoc){
                            iframedoc.open();
                            iframedoc.writeln(html_string);
                            iframedoc.close();
                        } else {
                            console.error('Cannot inject dynamic contents into iframe.');
                        }

                    });

                    function getIframeDoc() {

                        if (iframe.contentDocument){
                            return iframe.contentDocument;
                        } else if (iframe.contentWindow) {
                            return iframe.contentWindow.document;
                        }

                        return iframe.document;

                    }

                }
            };

        });
})();
