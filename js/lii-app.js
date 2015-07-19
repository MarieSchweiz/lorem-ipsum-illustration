var SourSoundApp = angular.module('LoremIpsumIllustration', [
'ngRoute',
'timelineControllers',
'ngMessages',
//'routeStyles',
//'skillsrender.directive',
//'langrender.directive',
//'SourSound'
]);

SourSoundApp.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl'
  }).
  when('/material', {
    templateUrl: 'views/material.html',
    controller: 'MaterialCtrl'
  }).
  when('/project', {
    templateUrl: 'views/project.html',
    controller: 'ProjectCtrl'
  }).

  otherwise({
    redirectTo: '/home'
  });
}]);
