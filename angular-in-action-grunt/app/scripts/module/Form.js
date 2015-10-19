/**
 *
 * Created by vizewang on 2015/10/19.
 */
var userInfoModule = angular.module('UserInfoModule', []);

userInfoModule.controller('UserInfoCtrl', ['$scope', function ($scope) {
  $scope.userInfo = {
    email: "232414@qq.com",
    password: "23144124",
    autoLogin: true
  }
  $scope.getFormData = function () {
    console.log($scope.userInfo);
  }
  $scope.setFormData=function(){
    $scope.userInfo={
      email:'lahfd;aj;@126.com',
      password:'sdfasdf',
      autoLogin:false
    }
  }
  $scope.resetForm=function(){
    $scope.userInfo = {
      email: "232414@qq.com",
      password: "23144124",
      autoLogin: true
    }
  }
}])
