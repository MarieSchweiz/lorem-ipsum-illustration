/**
* Created by Erik Woitschig on 07/19/15.
*/

(function(){

var LiiControllers = angular.module('LiiControllers', []);

// example user
LiiControllers.value('project', {
  name: 'lorem ipsum illustration',
  author: 'Marie Schweiz',
  infotext: 'this project is licenced unter the MIT 2.0 licence and launched on Nov. 11. on '
});

LiiControllers.controller('HomeCtrl', ['$scope', '$location', 'project',
function($scope, $location, project) {

  $scope.project = project;

}
]);

LiiControllers.controller('MaterialCtrl', ['$scope', '$routeParams', '$location', 'user',
function($scope, $routeParams, $location, user) {

  $scope.project = project;

  SourSound.getUser(user.id)
  .then(
    function( friends ) {
      $scope.uservalue = friends;
    }
  );



}]);

LiiControllers.controller('ProjectCtrl', ['$scope', '$routeParams', '$location', 'user',
function($scope, $routeParams, $location, user) {

  user.name = $routeParams.username;

  $scope.project = {
    title: 'SourSound'
  };
  $scope.uservalue = '';
  $scope.user = {name: user.name};


  url = 'http://soundcloud.com/' + $scope.user.name;

  var resolveId = 0;

  SourSound.resolve(url)
  .then(
    function( resp ) {
      user.id = resp.id;
      SourSound.getUser(resp.id)
      .then(
        function( friends ) {
          $scope.uservalue = friends;
        }
      );

    });


  $scope.test = function() {

    url = 'http://soundcloud.com/' + $scope.user.name;
    user.name = $scope.user.name;

    var resolveId = 0;

    SourSound.resolve(url)
    .then(
      function( resp ) {
        user.id = resp.id;
        SourSound.getUser(resp.id)
        .then(
          function( friends ) {
            $scope.uservalue = friends;
          }
        );

      });
    };
  }]);

})();
