/**
* Created by Erik Woitschig on 07/19/15.
*/

(function(){

var timelineControllers = angular.module('timelineControllers', []);

// example user
timelineControllers.value('project', {
  name: 'lorem ipsum illustration',
  author: 'Marie Schweiz',
  infotext: 'this project is licenced unter the MIT 2.0 licence and launched on Nov. 11. on '
});

timelineControllers.controller('HomeCtrl', ['$scope', '$routeParams', '$location', 'project',
function($scope, $routeParams, $location, project) {

  $scope.project = project;

/*
  $scope.milestones = [
        {     id    :   1,
              body  : "project started",
              date  : "2015-03-07"
        },
        {     id    :   2,
              body  : "GET /users endpoint + subres finished",
              date  : "2015-03-09" },
        {     id    :   3,
              body  : "GET /tracks + /playlists + /groups + /comments finished",
              date  : "2015-03-13"
            },
            {     id    :   4,
              body  : "GET /users can now be used as API explorer - just fill in your SC username",
              date  : "2015-03-14"
            },
            { id    :   5,
              body  : "Project cleanup - renaming, removing old code - refactoring",
              date  : "2015-03-15"
            }
        ];
*/


}
]);

timelineControllers.controller('MaterialCtrl', ['$scope', '$routeParams', '$location', 'user',
function($scope, $routeParams, $location, user) {

  $scope.project = {
    title: 'SourSound'
  };
  $scope.uservalue = '';
  $scope.user = {name: user.name};

  SourSound.getUser(user.id)
  .then(
    function( friends ) {
      $scope.uservalue = friends;
    }
  );


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

timelineControllers.controller('ProjectCtrl', ['$scope', '$routeParams', '$location', 'user',
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
