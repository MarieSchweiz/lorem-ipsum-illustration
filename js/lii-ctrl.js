/**
* Created by Erik Woitschig on 07/19/15.
*/

(function(){

var LiiControllers = angular.module('LiiControllers', []);

// project details
LiiControllers.value('project', {
  name: 'lorem ipsum illustration',
  author: 'Marie Schweiz',
  authorwebsite: 'http://marie-schweiz.de/',
  repourl: 'https://github.com/MarieSchweiz/lorem-ipsum-illustration',
  infotext: 'this project is licenced unter the MIT 2.0 licence and launched on Nov. 11. on ',
  tagPalette: ["food", "landscape", "space", "sport", "office", "gift"],
  selectPalette: ["green", "red", "blue", "black", "petrol", "orange", "yellow"]
});

LiiControllers.controller('HomeCtrl', ['$scope', '$location', '$http', 'project',
function($scope, $location, $http, project) {

  $scope.project = project;

  // vars
  var illuraw = '';

  // function that eliminates duplicates in a js-array
  function eliminateDuplicates(arr) {
    var i,
    len=arr.length,
    out=[],
    obj={};

    for (i=0;i<len;i++) {
      obj[arr[i]]=0;
    }
    for (i in obj) {

      out.push("<div class='button' data-filter='."+i+"'>"+i+"</div>");
    }
    return out;
  }

  function count(doublearr) {
    weightedTags = [];
    array_elements = doublearr;
    array_elements.sort();

    var current = null;
    var cnt = 0;
    for (var i = 0; i < array_elements.length; i++) {
      if (array_elements[i] != current) {
        if (cnt > 2) {
          //  document.write(current + ' NO-comes --> ' + cnt + ' times<br>');
          weightedTags.push(current);
        }
        current = array_elements[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt > 2) {
      //document.write(current + ' YO-------comes --> ' + cnt + ' times');
      weightedTags.push(current);
    }

    return weightedTags;
  }

  $http.get('api.json').
    success(function(data, status, headers, config) {
    illuraw = data;
    var items = [];
    var prefix = 'png/';
    var endfix = '_360.png';
    var endfix1080 = '_1080.png';
    var endfix1980 = '_1980.png';
    var selectorList = [];
    var categoryList = [];
    var colourList = [];

    //crawl illustrations
    $.each( data, function( key, val ) {
      var tags = '';
      var colours = '';
      filename = this.file;

      /*
    angular.forEach(this.tags, function(k, v) {
        console.log(k, v);
        selectorList.push(v);
        tags += " "+v;
      });
      */

      // create taglist

      $.each(this.tags, function(k,v) {
        selectorList.push(v);
        tags += " "+v;
      });
      
      // create colourlist
      $.each(this.color_space_tag, function(k,v) {
        colourList.push(v);
        colours += " "+v;
      });


      // add item to array - isotope content
      items.push( "<div id="+filename+" class='element-item"+tags+colours+"'><img src='"+prefix+filename+endfix+"' height='180px' width='180px' /><div class='transclass'><span class='dl'><i class='fa fa-arrow-down'></i></span><span class='dl'><a href='"+prefix+filename+endfix+"' download='"+filename+endfix+"'>360px</a></span><span class='dl'><a href='"+prefix+filename+endfix1080+"' download='"+filename+endfix+"'>1080px</a></span><span class='dl'><a href='"+prefix+filename+endfix1980+"' download='"+filename+endfix+"'>1980px</a></span><span class='dl'>svg</span><span class='dl'>.ai</span></div></div>" );
    });

  selectorList= count(selectorList);

  var filters = eliminateDuplicates($scope.project.tagPalette);
  var colourFilter = eliminateDuplicates($scope.project.selectPalette);

    $('.isotope').append(items);
    $('#filters').append(filters);
    $('#colours').append(colourFilter);
    isotope();
  }).
  error(function(data, status, headers, config) {
  console.log('http error');
  });

    function isotope(){
      // init Isotope
      var $container = $('.isotope').isotope({
        itemSelector: '.element-item',
        masonry: {
          columnWidth: 190
        }
        /*
        TO DO: find out how to apply visible class to filteredelements
        ,
        hiddenClass: '.element-item.selected',
        hiddenStyle: {
          opacity: 0.5,
          transform: 'scale(0.5)'
        },
        visibleStyle: {
          opacity: 1
        }*/
      });
      // filter functions
      var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function() {
          var number = $(this).find('.number').text();
          return parseInt( number, 10 ) > 50;
        },
        // show if name ends with -ium
        ium: function() {
          var name = $(this).find('.name').text();
          return name.match( /ium$/ );
        }
      };
      // bind filter button click
      $('#filters').on( 'click', 'div', function() {
        var filterValue = $( this ).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[ filterValue ] || filterValue;
        $container.isotope({ filter: filterValue });
      });
      $('#colours').on( 'click', 'div', function() {
        var filterValue = $( this ).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[ filterValue ] || filterValue;
        $container.isotope({ filter: filterValue });
      });
      // change is-checked class on buttons
      $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'div', function() {
          // to do: dynamification.
          $('#filters').find('.is-checked').removeClass('is-checked');
          $('#colours').find('.is-checked').removeClass('is-checked');
          //$buttonGroup.find('.is-checked').removeClass('is-checked');
          $( this ).addClass('is-checked');
          $('#package').empty().append("Download ZIP - " + $(this).text());
        });
      });


      $('.isotope').on( 'click', '.element-item', function() {
        var compid = '';
        var compid = this.id;

        // change size of item by toggling gigante class
        $( this ).toggleClass('selected');
        $( this ).find('.transclass').toggleClass('selected');
      //  $( this ).append('');
        $container.isotope('layout');

        $.each(illuraw, function(k,v) {
          if (v.file == compid)
            {
              //$('#embedshare').empty();
              //$('#embedshare').append('<h4>' +v.title+ '</h4>');
              //$('#embedshare').append('<h5>' +v.description+ '</h5>');

              $.each(v.tags, function(k,v) {
                console.log(v);
              });

              $.each(v.color_space_tag, function(k,v) {
                console.log(v);
              });

              console.log(v)}


            });

          });
          // dont expose click event on div overlay
          $(".transclass").click(function(e) {
            e.stopPropagation();
          });


        }
}
]);

LiiControllers.controller('ProjectCtrl', ['$scope', '$routeParams', '$location', 'user',
function($scope, $routeParams, $location, user) {

  }]);

})();
