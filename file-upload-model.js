/**
 * angularjs.fileUploadModel
 * AngularJS directive used for picking up file(s) on input of type "file" to be made available in the $scope and assigned to the binded model
 * @version v1.0.0 - 2019-08-02
 * @link https://github.com/omostan/fileUploadModel.git
 * @author Stanley Omoregie <stan@omotech.com> (http://www.omotech.com)>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function (angular) {

    'use strict';

    angular.module('angularjs.fileUploadModel', [])
        .directive('fileUploadModel', fileUploadModel);
        
    fileUploadModel.$inject = ['$log'];
    
    function fileUploadModel($log) {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                ngModel: '=',
                ngChange: '&',
                type: '@'
            },
            link: fn_link
        }
        function fn_link(scope, element, attrs, ngModel) {
            if (scope.type.toLowerCase() !== 'file') {
                return;
            }
            var isMultiple = attrs.multiple;
            element.bind('change', function () {
                scope.files = [];
                angular.forEach(element[0].files, function (file) {
                    var fileObj = {
                        // File Name
                        name: file.name,
                        //File Size
                        size: file.size,
                        //File URL to view
                        url: URL.createObjectURL(file),
                        // File Input Value
                        _file: file
                    };
                    scope.files.push(fileObj);
                });
                //$log.debug('File data: ' + JSON.stringify(scope.files));
                isMultiple ? ngModel.$setViewValue(scope.files) : ngModel.$setViewValue(scope.files[0]);
                scope.ngChange();
            });
        }
    };
})(window.angular);
