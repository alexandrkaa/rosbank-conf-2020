'use strict';

// Шаги алгоритма ECMA-262, 5-е издание, 15.4.4.18
// Ссылка (en): http://es5.github.io/#x15.4.4.18
// Ссылка (ru): http://es5.javascript.ru/x15.4.html#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function (callback, thisArg) {

    var T, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Положим O равным результату вызова ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Положим lenValue равным результату вызова внутреннего метода Get объекта O с аргументом "length".
    // 3. Положим len равным ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. Если IsCallable(callback) равен false, выкинем исключение TypeError.
    // Смотрите: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    // 5. Если thisArg присутствует, положим T равным thisArg; иначе положим T равным undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Положим k равным 0
    k = 0;

    // 7. Пока k < len, будем повторять
    while (k < len) {

      var kValue;

      // a. Положим Pk равным ToString(k).
      //   Это неявное преобразование для левостороннего операнда в операторе in
      // b. Положим kPresent равным результату вызова внутреннего метода HasProperty объекта O с аргументом Pk.
      //   Этот шаг может быть объединён с шагом c
      // c. Если kPresent равен true, то
      if (k in O) {

        // i. Положим kValue равным результату вызова внутреннего метода Get объекта O с аргументом Pk.
        kValue = O[k];

        // ii. Вызовем внутренний метод Call функции callback с объектом T в качестве значения this и
        // списком аргументов, содержащим kValue, k и O.
        callback.call(T, kValue, k, O);
      }
      // d. Увеличим k на 1.
      k++;
    }
    // 8. Вернём undefined.
  };
}

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
// //=require node_modules/intersection-observer/intersection-observer.js

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


(function() {

  var DOWN_ARROW = 40;
  var UP_ARROW = 38;

  var options = {
      root: null,
      rootMargin: '0px',
      threshold: [0.5, 0.8]
  }

  var observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach( function(entry) {
      if (entry.isIntersecting) {
        if(entry.intersectionRatio >= 0.65) {
          window.current = entry.target.dataset.sectionid;
          $('.hero__scroll-dot').removeClass('hero__scroll-dot--active');
          $('.hero__scroll-dot[data-scrollto="'+window.current+'"]').addClass('hero__scroll-dot--active');
        }
      }
    })
  }, options);

  var arr = Array.from(document.querySelectorAll('section'));
  arr.forEach(function(i) {
      observer.observe(i)
  });

  $(document).on('keydown', function(evt) {
    try {
      if(evt.keyCode === DOWN_ARROW || evt.keyCode === UP_ARROW) {
        // console.log(evt.keyCode);
        if($('.hero__scroll-dot--active').data('scrollto') === undefined) {
          $('.screen--1').goTo();
        } else
        if(evt.keyCode === DOWN_ARROW) {
          // console.log(+$('.hero__scroll-dot--active').data('scrollto'));
          if(+$('.hero__scroll-dot--active').data('scrollto') < 12) {
            $('.screen--'+(+$('.hero__scroll-dot--active').data('scrollto') + 1)).goTo();
            // console.log((+$('.hero__scroll-dot--active').data('scrollto') + 1));
          }
        } else {
          if(!$('.hero__scroll-dot--active').data('scrollto') < 2) {
            $('.screen--'+(+$('.hero__scroll-dot--active').data('scrollto') -1)).goTo();
          }
        }
      }
    } catch(err_) {
      console.error(err_);
    }
  });
})();


var cardTransitionTime = 500;

// var $card = $('.js-card')
var switching = false

$('.card').click(function(evt) {
  evt.preventDefault();
  flipCard($(this));
})

function flipCard ($card) {
   if (switching) {
      return false
   }
   switching = true

   $card.toggleClass('is-switched')
   window.setTimeout(function () {
      $card.children().children().toggleClass('is-active')
      switching = false
   }, cardTransitionTime / 2)
}
