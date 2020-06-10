var supportsWebP = (function () {
  'use strict';

  var canvas = typeof document === 'object' ? document.createElement('canvas') : {};
  canvas.width = canvas.height = 1;
  var index = canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false;

  return index;

}());

if (supportsWebP) {
  var noWebpAll = document.querySelectorAll('.nowebp');
  for(var i = 0; i < noWebpAll.length; i++) {
    var noWebp = noWebpAll[i];
    noWebp.classList.remove('nowebp');
    noWebp.classList.add('webp');
  }
}

var nojs = document.querySelector('.nojs');
nojs.classList.remove('nojs');
nojs.classList.add('js');

var main_nav = document.querySelector('.main-nav--nojs');
var main_nav_toggler = document.querySelector('.main-nav__toggler');
var map = document.querySelector('.map--nojs');

main_nav.classList.remove('main-nav--nojs');
main_nav.classList.add('main-nav--js');
main_nav.classList.remove('main-nav--opened');
main_nav.classList.add('main-nav--closed');
if(map) {
  map.classList.remove('map--nojs');
  map.classList.add('map--js');
}

main_nav_toggler.addEventListener('click', function() {
  if(main_nav.classList.contains('main-nav--opened')) {
    main_nav.classList.remove('main-nav--opened');
    main_nav.classList.add('main-nav--closed');
  } else {
    main_nav.classList.add('main-nav--opened');
    main_nav.classList.remove('main-nav--closed');
  }
});

//=require node_modules/picturefill/dist/picturefill.min.js
//=require node_modules/jquery/dist/jquery.min.js
//=require node_modules/tingle.js/dist/tingle.min.js

(function($) {
    $.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'fast');
        return this; // for chaining...
    }
})(jQuery);

// //=require node_modules/slick-carousel/slick/slick.min.js

$(document).ready(function() {
  var modal = new tingle.modal({
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
  });

  $('.concept__more-btn').click(function(evt) {
    evt.preventDefault();
    $(this).next('.concept__more').removeClass('visually-hidden');
    $(this).addClass('visually-hidden');
  });

  $('.concept__less-btn').click(function(evt) {
    evt.preventDefault();
    $(this).parent('.concept__more').addClass('visually-hidden');
    $('.concept__more-btn').removeClass('visually-hidden');
  })

  $('.scroll-to').click(function(evt) {
    evt.preventDefault();
    $($(this).data('scroll-to')).goTo();
  });

  if(window.location.hash) {
    $('.'+window.location.hash.substring(1)).goTo();
  }
  $('.people-list__name-lastname').click(function(evt) {
    evt.preventDefault();
    $(this).parent().parent().children('.people-list__person-description').toggleClass('people-list__person-description--visible');
  });
  $('.people-list__person-description-hide').click(function(evt) {
    evt.preventDefault();
    $(this).parent().removeClass('people-list__person-description--visible');
  });

  $('.structure__section-name-btn').click(function(evt) {
    evt.preventDefault();
    modal.setContent($(this).parent().siblings('.popup-text').html());
    modal.open();
  });
});

// //=require node_modules/quicklink/dist/quicklink.js
// quicklink();
