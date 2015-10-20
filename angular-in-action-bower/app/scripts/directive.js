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