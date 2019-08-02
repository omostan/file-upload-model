(function (angular) {

    'use strict';

    angular.module('file-Upload-Model', [])
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
                $log.debug('File data: ' + JSON.stringify(scope.files));
                isMultiple ? ngModel.$setViewValue(scope.files) : ngModel.$setViewValue(scope.files[0]);
                scope.ngChange();
            });
        }
    };
})(window.angular);
