/**
 * Created by vizewang on 2015/10/17.
 */
var myModule=angular.module("MyModule",[]);
myModule.directive("hello",function(){
  return{
    restrict:'E',
    template:'<div>Hi everyone!</div>',
    replace:true
  }
})
