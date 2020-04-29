/**
 * Navigation
 */
$( '.site-mobile-menu-button' ).click( function() {
  if ( ! $( '.site-navigation.mobile-menu' ).hasClass( 'active' ) ) {
    $( '.site-navigation.mobile-menu' ).addClass( 'active' );
    $( 'body' ).css( 'overflow-y', 'hidden' );
  } else { 
    $( '.site-navigation.mobile-menu' ).removeClass( 'active'); 
    $( 'body' ).css( 'overflow-y', 'auto' );
  }
});

$( '.site-navigation.mobile-menu .site-menu' ).on( 'click', function() {
  $( '.site-navigation.mobile-menu' ).removeClass( 'active' );
  $( 'body' ).css( 'overflow-y', 'auto' );
});

/**
 * Site background
 */

var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

setInterval(updateGradient,10);

/** Letter Effects **/
( function( $ ) {

    // Example usage: jQuery( '.selector' ).spanLetters();
 
    $.fn.spanLetters = function() {

        // Loop through each element on which this function has been called
        this.each( function() {   
          
            // Make an array with each letter of the string as a value
            var words = $( this ).text().split( '' );
 
            // Loop through the letters and wrap each one in a span
            for ( i = 0; i in words; i++ ) {
                words[i] = '<span class="sl' + (i + 1) + ' span-letter">' + words[i] + '</span>'
            };
 
            // Join our array of span-wrapped letters back into a string
            var text = words.join( '' );
 
            // Replace the original string with the new string
            $( this ).html( text );
        })
    }
  
  
}( jQuery ));

// document.getElementById('title').onmouseenter = function() {
//   jQuery('.change').spanLetters();
// }

// document.getElementById('title').onmouseleave = function() {
//   jQuery('.change').resetLetters();
// }

/**
 * Tickets Page (Benefits)
 */
$( '.benefit-title' ).click( function() {
  if ( $(this).hasClass( 'active' ) ) {
    var elem = $(this);
    $(this).next().slideToggle( 'fast', function() {
      elem.removeClass('active');
    });
  } else {
    $(this).addClass('active');
    $(this).next().slideToggle();
  }
});

/* Back to Top Button */
$( document ).ready( function() {
  var offset = 100;
  var speed = 250;
  var duration = 500;

  /* Initial page load */
  // buttonAndBanner( )

  if ( $(window).scrollTop() < offset ) {
    $( '.topbutton' ).fadeOut( duration );
    if ( $( 'body' ).attr('id') == 'home' ) {
      $( '.site-banner' ).addClass( 'top' );
    }
  } else {
    $( '.topbutton' ).fadeIn( duration );
    $( '.site-banner' ).removeClass( 'top' );
  }

  $( window ).scroll( function() {
    if ( $(window).scrollTop() > 70 ) {
      $( '.site-banner' ).css( 'position', 'fixed' );
    } else {
      $( '.site-banner' ).css( 'position', 'static' );
      console.log( $(window).scrollTop() );
    }
    
    if ( $(this).scrollTop() < offset ) {
      $( '.topbutton' ).fadeOut( duration );
      if ( $( 'body' ).attr('id') == 'home' ) {
        $( '.site-banner' ).addClass( 'top' );
      }
    } else {
      $( '.topbutton' ).fadeIn( duration );
      $( '.site-banner' ).removeClass( 'top' );
    }
  });
  $( '.topbutton' ).on( 'click', function() {
    $( 'html, body' ).animate({ scrollTop: 0 }, speed );
    return false;
  });

  /* Index page - top bar */
  // if( $( 'body' ).id( 'home' ) ) {
  //   $(window)
  // }
});

/**
 * Date Countdown timer
 * @link https://codepen.io/chrisjdesigner/pen/dMbmoE
 */
var winHeight = $(document).height();
var winWidth = $(document).width();
var thisYear = new Date();
var thisChristmas = thisYear.getFullYear() + "/04/25 10:45:00";
var christmas = new Date( thisChristmas ),
    days, hours, mins, secs;

$('.this-year').text( thisYear.getFullYear() );

//var setPieChart = function(name) {
  //var num = name,
//      fixedNumber = num,
//      result = fixedNum + ' ' + total;
//  pie.style.strokeDasharray = 25;
//}

function showToday() {
  var date = thisYear.getDate();
  // var date = 2;
  $('.day-list li:nth-child(' + date + ')').addClass('today');
  
  $('#container #inner').css({"margin-left": -(date-1) * winWidth + "px"});
  
  var fgifts = $( '.day-list li' );
  $.each( fgifts, function( i, obj ) {
    if( i+1 <= date ) $(this).removeClass('disabled'); 
    if( i+1 == date ) $(this).addClass( 'today' );
    if( i+1 > date ) { $(this).addClass('disabled');
                      $(this).unbind('click');
    }
  });
  
  $('#posts .post').css({"display":"none"});
  $('#posts .post:nth-child(' + date + ')').css({"display":"block"});
}

$( '.disabled' ).click( function(e) {
  e.preventDefault();
  alert( 'Cheatin\' huh?' );
});

$(function() {
  // Calculate time to Christmas
  showToday();
  timeToXmas();
  // Transition from 0
  numberTrans( '#days .number', days, 1000, 'easeOutQuad' );
  numberTrans( '#hours .number', hours, 1000, 'easeOutQuad' );
  numberTrans( '#minutes .number', mins, 1000, 'easeOutQuad' );
  numberTrans( '#seconds .number', secs, 1000, 'easeOutQuad' );
  // Begin countdown
  setTimeout( countdownTimer, 1001 );
});

// function to calc Time to Christmas
function timeToXmas() {
  var today = new Date(); 
  // diff between dates
  var diff = (today - christmas)/1000;
  var diff = Math.abs(Math.floor(diff));
  
  // Day to target
  days = Math.floor(diff/(24*60*60));
  secs = diff - days * 24*60*60;
  // Hours
  hours = Math.floor(secs/(60*60));
  secs = secs - hours * 60*60;
  // Minutes
  mins = Math.floor(secs/60);
  secs = secs - mins * 60;
}

// function to display the countdown Timer
function countdownTimer() {
  timeToXmas();
  // display in front-end clock
  // Seems like multiplying by 360(degrees) gives an inaccurate measure - 315 is the proper number to be an even division of the pie graph clock
  $( '#days .number' ).text(days);
  var dayResult = 315*(days/25) + ' ' + 360;
  $( '#days .pie' ).css( { "stroke-dasharray": dayResult } );
  $( '#hours .number' ).text(hours);
  var hrResult = 315*(hours/24) + ' ' + 360;
  $( '#hours .pie' ).css( { "stroke-dasharray": hrResult } );
  $( '#minutes .number' ).text(mins);
  var minResult = 315*(mins/60) + ' ' + 360;
  $( '#minutes .pie' ).css( { "stroke-dasharray": minResult } );
  $( '#seconds .number' ).text(secs);
  var secResult = 315*(secs/60) + ' ' + 360;
  $( '#seconds .pie' ).css( { "stroke-dasharray": secResult } );
  // repeat every second
  setTimeout(countdownTimer, 1000);
}

// Transition numbers
function numberTrans( id, endpt, transDur, transEase ) {
  $({numberCount: $(id).text()}).animate({numberCount: endpt}, {
    duration: transDur,
    easing: transEase,
    step: function() {
      $(id).text(Math.floor(this.numberCount));
    },
    complete: function() {
      $(id).text(this.numberCount);
    }
  });
};

/**
 * Schedule Tabs Handler
 */
var TABS = document.getElementsByClassName( 'schedule-tab' );

for ( var i = 0; i < TABS.length; i++ ) {
  TABS[i].addEventListener( 'click', setActiveTable );
}

function setActiveTable(e) {

  switch ( e.target.id ) {
    case 'zoom-tab':
      this.className = 'schedule-tab active';
      document.getElementById( 'featured-tab' ).className = 'schedule-tab';
      document.getElementById( 'recorded-tab' ).className = 'schedule-tab';
      deactivateTables();
      shrinkFixed( true );
      document.getElementById( 'fixed-sessions' ).className = 'schedule-table';
      document.getElementById( 'zoom-sessions' ).className = 'schedule-table active';
      break;
    case 'recorded-tab':
      this.className = 'schedule-tab active';
      document.getElementById( 'featured-tab' ).className = 'schedule-tab';
      document.getElementById( 'zoom-tab' ).className = 'schedule-tab';
      deactivateTables();
      document.getElementById( 'fixed-sessions' ).className = 'schedule-table hide';
      document.getElementById( 'pre-recorded-sessions' ).className = 'schedule-table active';
      break;
    default:
      document.getElementById( 'featured-tab' ).className = 'schedule-tab active';
      document.getElementById( 'zoom-tab' ).className = 'schedule-tab';
      document.getElementById( 'recorded-tab' ).className = 'schedule-tab';
      deactivateTables();
      shrinkFixed( false );
      document.getElementById( 'fixed-sessions' ).className = 'schedule-table';
      document.getElementById( 'youtube-live-sessions' ).className = 'schedule-table active';
  }
}

function deactivateTables() {
  var SCHEDULES = document.getElementsByClassName( 'schedule-table' );

  for ( var i = 0; i < SCHEDULES.length; i++ ) {
    SCHEDULES[i].className = 'schedule-table';
  }
}

function shrinkFixed( shrink ) {
  var FIXED = document.getElementById( 'fixed-sessions' ).children;

  if ( shrink ) {
    for ( var i = 0; i < FIXED.length; i++ ) {
      FIXED[i].className = FIXED[i].className + ' shrunk';
    }
  }
  else {
    for ( var i = 0; i < FIXED.length; i++ ) {
      FIXED[i].className = 'schedule-row';
    }
  }
}