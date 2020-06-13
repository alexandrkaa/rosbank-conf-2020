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

//=require node_modules/picturefill/dist/picturefill.min.js
//=require node_modules/jquery/dist/jquery.min.js
//=require node_modules/tingle.js/dist/tingle.min.js

(function($) {
    $.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'slow');
        return this; // for chaining...
    }
})(jQuery);

//=require node_modules/slick-carousel/slick/slick.min.js

$(document).ready(function() {
  $('.hero__scroll-dot').click(function(evt) {
    evt.preventDefault();
    $('.screen--'+$(this).data('scrollto')).goTo();
  });

  $('.hero__scroll-down').click(function(evt) {
    evt.preventDefault();
    $('.screen--1').goTo();
  });

  $(".slider-wrapper").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: false,
    // adaptiveHeight: true,
    centerPadding: "60px",
    fade: true,
    cssEase: "linear",
    autoplay: false,
    // autoplay: true,
    // autoplaySpeed: 1500,
    lazyLoad: 'ondemand',
  });
});

// //=require node_modules/quicklink/dist/quicklink.js
// quicklink();
