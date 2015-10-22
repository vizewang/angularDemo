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

appModule.controller('MyCtrl',['$scope',function(scope){
    scope.name="Artem";
    scope.name2="vize";
}])

appModule.controller('AlertController', function ($scope) {
    $scope.alerts = [
        { type: 'error', msg: 'Oh snap! Something went wrong.' },
        { type: 'success', msg: 'Well done! It worked out in the end.' }
    ];

    $scope.addAlert = function() {
        $scope.alerts.push({msg: "Watch out - another alert!"});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
})