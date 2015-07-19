/**
* Created by Zack Boman on 1/31/14.
* http://www.zackboman.com or tennisgent@gmail.com
*/

(function(){

  var mod = angular.module('routeStyles', ['ngRoute']);

  mod.directive('head', ['$rootScope','$compile',
  function($rootScope, $compile){
    return {
      restrict: 'E',
      link: function(scope, elem){
        var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" >';
        elem.append($compile(html)(scope));
        scope.routeStyles = {};
        $rootScope.$on('$routeChangeStart', function (e, next, current) {
          if(current && current.$$route && current.$$route.css){
            if(!Array.isArray(current.$$route.css)){
              current.$$route.css = [current.$$route.css];
            }
            angular.forEach(current.$$route.css, function(sheet){
              delete scope.routeStyles[sheet];
            });
          }
          if(next && next.$$route && next.$$route.css){
            if(!Array.isArray(next.$$route.css)){
              next.$$route.css = [next.$$route.css];
            }
            angular.forEach(next.$$route.css, function(sheet){
              scope.routeStyles[sheet] = sheet;
            });
          }
        });
      }
    };
  }
  ]);


  var langrender = angular.module('langrender.directive', [])

  langrender.directive('onFinishRender', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function () {
            scope.$emit('ngLangFinished');
          });
        }
      }
    }
  });


  var skillrender = angular.module('skillsrender.directive', [])

  skillrender.directive('onFinishRender', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function () {
            scope.$emit('ngSkillsFinished');
          });
        }
      }
    }
  });

})();
