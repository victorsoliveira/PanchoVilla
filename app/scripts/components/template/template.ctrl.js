/**
 * Created by victoroliveira on 08/04/16.
 */

(function(){

    'use strict';

    angular.module('app')
        .controller('templateCtrl', ['handlebars', templateCtrl]);

    function templateCtrl(handlebars) {

        var vm = this;
        var sampleEditor, templateEditor;

        angular.extend(vm, {
            source: "",
            template: "",
            view: "",

            onTemplateContentLoad: onTemplateContentLoad,
            onModelContentLoad: onModelContentLoad,
            onTemplateContentChange: onTemplateContentChange,
            onModelContentChange: onModelContentChange
        });


        function onTemplateContentLoad(editor) {
            editor.$blockScrolling = "Infinity";
            templateEditor = editor;

            templateEditor.getSession().setValue("<html> <head> <title>Sample</title> </head> <body>{{info}} </body> </html>")
        }

        function onModelContentLoad(editor) {
            editor.$blockScrolling = "Infinity";
            sampleEditor = editor;
        }

        function onTemplateContentChange() {
            generatePreview();
        }

        function onModelContentChange() {
            vm.source = sampleEditor.getSession().getValue();
            generatePreview();
        }

        function generatePreview() {

            var template = handlebars.compile(templateEditor.getSession().getValue());

            try {

                var json = {};

                if (vm.source && vm.source != ""){
                    json = JSON.parse(vm.source);
                }

                vm.view = template(json);

            } catch (e) {

            }

        }

    }

})();
