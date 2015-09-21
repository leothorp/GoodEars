angular.module('et', [
  // 'et.sonority',
  // 'et.playback',
   'ui.router'])

//check on ui-sref-active="selected" from 25:16 of solution lecture
//uise ui-view instead of ng-view
//directives sectio nof video: 29:46
//metnion of templateUurl in directives: 36:15
//use replace:true with a template in the DDO
//including a scope object will create an isolate scope.
//every property we put inside the scope object will be an attribute we can access on the directive 
//in the HTML
//placing the equal sign as the value of this property, means it will have 2way data binding and be passed an object
//& lets you pass in a function
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('');
  $stateProvider
    .state('sonority', {
      templateURL: '' ,
      url: '' ,
      controller: '' 

    })
    .state('playback', {
      templateURL: '' ,
      url: '' ,
      controller: '' 
      
    });


}]);