/**
 * * Created by weizwang on 2015/10/20.
 */
appModule.controller('MyController',['$scope',function($scope){
    $scope.things = [1,2,3,4,5,6];
}])

expanderModule.controller('SomeCtrl',['$scope',function($scope){
    $scope.title='点击展开';
    $scope.text='这里是内部的内容';
}])