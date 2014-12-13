// vars
var illuraw = '';
var tagPalette = ["food", "landscape", "space", "sport", "office", "gift"];
var selectPalette = ["green", "red", "blue", "black", "petrol", "orange", "yellow"];

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


// jquery ready
$( function() {
  //access api - here our json file
  $.getJSON( "api.json", function( data ) {
    illuraw = data;
    var items = [];
    var prefix = 'png/'
    var endfix = '_360.png';
    var selectorList = [];
    var categoryList = [];
    var colourList = [];

    //crawl illustrations
    $.each( data, function( key, val ) {
      var tags = '';
      var colours = '';
      filename = this.file;

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
      items.push( "<div id="+filename+" class='element-item"+tags+colours+"'><img src='"+prefix+filename+endfix+"' height='180px' width='180px' /><div class='transclass'><i class='fa fa-arrow-down'></i><span class='dl'>DL</span><span class='dl'>360px</span><span class='dl'>1080px</span><span class='dl'>1980px</span><span class='dl'>svg</span><span class='dl'>.ai</span></div></div>" );
    });

    selectorList= count(selectorList);

    var filters = eliminateDuplicates(tagPalette);
    var colourFilter = eliminateDuplicates(selectPalette);

    $('.isotope').append(items);
    $('#filters').append(filters);
    $('#colours').append(colourFilter);
    isotope();
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
      });
    });


    $('.isotope').on( 'click', 'div', function() {
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
            $('#embedshare').empty();
            $('#embedshare').append('<h4>' +v.title+ '</h4>');
            $('#embedshare').append('<h5>' +v.description+ '</h5>');

            $.each(v.tags, function(k,v) {
              console.log(v);
            });

            $.each(v.color_space_tag, function(k,v) {
              console.log(v);
            });

            console.log(v)}


          });

        });


      }
    });
