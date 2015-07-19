/**
* GitHubSrv
* AngularJS Service for Github
*
* Created by Erik Woitschig on 07/19/15.
* http://bnz-power.com
* http://twitter.com/devbnz

*/

(function(){


  var soursound = angular.module('GitHubSrv', []);

  soursound.service("GitHub",
  function( $http, $q) {
    var baseUrl = 'https://api.github.com';
    return({
            getContributors   : getContributors
    });


function getContributors(projectpath) {

  var request = $http({
    method: "get",
    url: baseUrl + "/repos/" + projectpath + "/contributors"
    //repos/marieschweiz/lorem-ipsum-illustration/contributors
  });

  return( request.then( handleSuccess, handleError ) );

}

function handleError( response ) {

  // The API response from the server should be returned in a
  // nomralized format. However, if the request was not handled by the
  // server (or what not handles properly - ex. server error), then we
  // may have to normalize it on our end, as best we can.
  if (
    ! angular.isObject( response.data ) ||
    ! response.data.message
  ) {

    return( $q.reject( "An unknown error occurred." ) );

  }

  // Otherwise, use expected error message.
  return( $q.reject( response.data.message ) );

}

function handleSuccess( response ) {

  return( response.data );

}

}
);


})();
