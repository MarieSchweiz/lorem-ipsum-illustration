var SourSoundApp = angular.module('LoremIpsumIllustration', [
'ngRoute',
'LiiControllers',
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
 when('/project', {
    templateUrl: 'views/project.html',
    controller: 'ProjectCtrl'
  }).

  otherwise({
    redirectTo: '/home'
  });
}]);
