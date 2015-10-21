/**
 * Created by weizwang on 2015/10/20.
 */
appModule.directive('hello', function() {
    return {
        restrict: 'E',
        template: '<div>Hi there <span ng-transclude></span> </div>',
        transclude: true
    };
});

appModule.directive('hello1',function(){
    return {
        restrict: 'E',
        template: '<span>Hi there</span>',
        replace: true
    };
})

appModule.directive('button',function(){
    return{
        restrict:'E',
        compile:function(element,attributes){
            element.addClass('btn');
            if(attributes.type==='submit'){
                element.addClass('btn-primary');
            }
            if(attributes.size){
                element.addClass('btn-'+attributes.size);
            }
        }
    }
})

 appModule.directive('pagination',function(){
     return{
         restrict:'E',
         scope:{
             numPages: '=',
             currentPage: '=',
             onSelectPage: '&'
         },
         template:
         '<div class="pagination"><ul>' +
         '<li ng-class="{disabled: noPrevious()}"><a ng-click="selectPrevious()">Previous</a></li>' +
         '<li ng-repeat="page in pages" ng-class="{active: isActive(page)}"><a ng-click="selectPage(page)">{{page}}</a></li>' +
         '<li ng-class="{disabled: noNext()}"><a ng-click="selectNext()">Next</a></li>' +
         '</ul>' +
         '</div>',
         replace:true,
         link:function(scope){
             scope.$watch('nubPages',function(value){
                 scope.pages = [];
                 for(var i=1;i<=value;i++) {
                     scope.pages.push(i);
                 }
                 if ( scope.currentPage > value ) {
                     scope.selectPage(value);
                 }
             });

             scope.noPrevious = function() {
                 return scope.currentPage === 1;
             };
             scope.noNext = function() {
                 return scope.currentPage === scope.numPages;
             };
             scope.isActive = function(page) {
                 return scope.currentPage === page;
             };

             scope.selectPage = function(page) {
                 if ( ! scope.isActive(page) ) {
                     scope.currentPage = page;
                     scope.onSelectPage({ page: page });
                 }
             };

             scope.selectPrevious = function() {
                 if ( !scope.noPrevious() ) {
                     scope.selectPage(scope.currentPage-1);
                 }
             };
             scope.selectNext = function() {
                 if ( !scope.noNext() ) {
                     scope.selectPage(scope.currentPage+1);
                 }
             };
         }
     }
 })

appModule.directive('validateEquals',function(){
   return {
       restrict: 'A',
       require:'ngModel',
       link: function(scope, element, attrs, ngModelCtrl) {
           function validateEqual(myValue) {
               var valid = (myValue === scope.$eval(attrs.validateEquals));
               ngModelCtrl.$setValidity('equal', valid);
               return valid ? myValue : undefined;
           }

           ngModelCtrl.$parsers.push(validateEqual);
           ngModelCtrl.$formatters.push(validateEqual);

           scope.$watch(attrs.validateEquals, function() {
               ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
           });
       }
   }
})

appModule.directive('datePicker', function () {
    return {
        require:'ngModel',
        link:function (scope, element, attrs, ngModelCtrl) {

            var updateModel = function () {
                scope.$apply(function () {
                    var date = element.datepicker("getDate");
                    element.datepicker("setDate", element.val());
                    ngModelCtrl.$setViewValue(date);
                });
            };

            var onSelectHandler = function(userHandler) {
                if ( userHandler ) {
                    // Caller has specified their own onSelect handler
                    // so call this as well as updating the model
                    return function(value, picker) {
                        updateModel();
                        return userHandler(value, picker);
                    };
                } else {
                    return updateModel;
                }
            };

            var setUpDatePicker = function () {
                var options = scope.$eval(attrs.datePicker) || {};
                // Bind to the date picker select event
                options.onSelect = onSelectHandler(options.onSelect);
                // In case the user changes the text directly in the input box
                element.bind('change', updateModel);
                // Remove any previous date picker, to ensure any config changes are picked up
                element.datepicker('destroy');
                // Create the new datepicker widget
                element.datepicker(options);
                // Render will update the date picker with the date
                ngModelCtrl.$render();
            };

            ngModelCtrl.$formatters.push(function(date) {
                if ( angular.isDefined(date) && date !== null && !angular.isDate(date) ) {
                    throw new Error('ng-Model value must be a Date object - currently it is a ' + typeof date);
                }
                return date;
            });

            ngModelCtrl.$render = function () {
                element.datepicker("setDate", ngModelCtrl.$viewValue);
            };

            // Watch for changes to the directives options
            scope.$watch(attrs.datePicker, setUpDatePicker, true);
        }
    };
})

appModule.directive('myd', function($timeout) {
    return {
        restrict: 'E',
        template:function(element,attr){
            console.log(attr.noModel)
            return '<div>isolate scope: name={{name}}----name2={{name2}}</div>'},
        require: 'ngModel',
        scope: { name2: '=ngModel',test:'@test1'},
        link: function(scope, el, attrs, ctrl) {
            //console.log(scope.name2, scope);
            //console.log(scope.test);
            //console.log(ctrl.$viewValue.currentText,ctrl.$modelValue)
            $timeout(function() {
                ctrl.$setViewValue('Mark');
            }, 2000);
        }
    }
})
expanderModule.directive('expander', function() {
    return {
        restrict : 'EA',
        replace : true,
        transclude : true,
        scope : {
            title : '=expanderTitle'
        },
        template : '<div>'
        + '<div class="title" ng-click="toggle()">{{title}}</div>'
        + '<div class="body" ng-show="showMe" ng-transclude></div>'
        + '</div>',
        link : function(scope, element, attrs) {
            scope.showMe = false;
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
            }
        }
    }
})

