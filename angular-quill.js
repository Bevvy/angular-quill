(function() {
'use strict';

/**
 * usage: <div ng-model="article.body" quill="{
    theme: 'mytheme'
  }"></div>
 *
 *    extra options:
 *      quill: pass as a string
 *
 * bevvyco: updated to work with Quill 1.0+
 */

angular
    .module('angular-quill', [])
    .directive("quill", ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            require: "ngModel",
            template: '<div class="quill-wrapper"><div class="editor"></div></div>',
            controller: function() {

            },
            link: function(scope, element, attrs, ngModel) {

                var updateModel = function updateModel(value) {
                        scope.$apply(function() {
                            if (value.trim()!=='<p></p>' && value.trim()!=='<p><br></p>') {
                                // Quill's representation of empty content uses an empty <p> tag
                                // so ignore that, and only update the model if has real content
                                ngModel.$setViewValue(value);
                            }
                        });
                    },
                    options = {
                        // debug: 'info',
                        formats: ['bold','italic','strike','link','image','header','list'], // what's allowed
                        modules: {
                            'toolbar': [
                                [{ 'header': [2, 3, 4, false] }],
                                ['bold', 'italic', 'strike'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                ['link']
                                // ['link', 'image']
                            ]
                        },
                        theme: 'snow'
                    },
                    extraOptions = attrs.quill ? scope.$eval(attrs.quill) : {},
                    editor;

                angular.extend(options, extraOptions);

                $timeout(function() {
                    editor = new Quill(element[0].querySelector('.editor'), options);

                    ngModel.$render();

                    editor.on('text-change', function(delta, oldContents, source) {
                        updateModel(editor.scroll.domNode.innerHTML);
                    });
                });

                ngModel.$render = function() {
                    if (angular.isDefined(editor)) {
                        $timeout(function() {
                            editor.pasteHTML(ngModel.$viewValue || '');     // makes editor dirty

                            // reset model and form to pristine, as we've only initialized
                            // with existing content and no changes have been made yet
                            ngModel.$$parentForm.$setPristine();

                            // quill editor now initialized
                        });
                    }
                };

            }
        };
    }]);

})();
