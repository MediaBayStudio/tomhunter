;
(function() {

  let dot = '<button type="button"><svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" class="dot"><circle cx="13" cy="13" r="4" class="dot__inside"/><circle cx="13" cy="13" r="12" class="dot__outline"/></svg></button>',

    risksBlock = document.querySelector('.risks-block'),

    blockThreeChildren = document.querySelector('.stages-block_three-children'),
    blockThreeChildrenChilds = document.querySelectorAll('.stages-block_three-children .card'),

    blockTwoChildren = document.querySelector('.stages-block_two-children'),
    blockTwoChildrenChilds = document.querySelectorAll('.stages-block_two-children .card'),

    blockFourChildren = document.querySelector('.stages-block_four-children'),
    blockFourChildrenChilds = document.querySelectorAll('.stages-block_four-children .card'),

    relatedSinglesBlock = document.querySelector('.related-singles'),

    indexServiceBlock = document.querySelector('.index-services-block'),
    indexServices = document.querySelectorAll('.index-service-card'),

    indexNewsBlock = document.querySelector('.index-news-sect__list'),
    indexNews = document.querySelectorAll('.index-news-sect__li'),

    buildIndexServiceSlider = function() {
      if (indexServiceBlock && indexServices.length > 2) {
        if (matchMedia('(max-width: 767.98px)').matches) {
          $(indexServiceBlock).slick({
            accessibility: false,
            // slidesToShow: 1,
            // slidesToScroll: 1,
            infinite: false,
            arrows: false,
            dots: true,
            dotsClass: 'index-news-sect__dots dots',
            // slide: '.single-card',
            // centerMode: true,
            // centerPadding: '0px',
            // variableWidth: true,
            customPaging: function() {
              return dot;
            }
          });
        } else {
          // $(indexServiceBlock).slick('unslick');
        }
      }
    },

    buildIndexNewsSlider = function() {
      if (indexNewsBlock && indexNews.length > 2) {
        if (matchMedia('(max-width: 767.98px)').matches) {
          $(indexNewsBlock).slick({
            accessibility: false,
            infinite: false,
            arrows: false,
            dots: true,
            dotsClass: 'index-services-block__dots dots',
            // slide: '.single-card',
            // centerMode: true,
            // centerPadding: '0px',
            // variableWidth: true,
            customPaging: function() {
              return dot;
            }
          });
        } else {
          // $(indexServiceBlock).slick('unslick');
        }
      }
    },

    buildStagesBlockSlider = function(selector, media, childs, numberChilds, responsiveArray) {
      if (matchMedia(media).matches && childs.length < numberChilds) {
        // nothing or unslick
        if ($(selector).hasClass('slick-slider')) {
          $(selector).slick('unslick');
        }
      } else {
        if ($(selector).hasClass('slick-slider')) {
          return;
        }
        // build slick
        $(selector).slick({
          accessibility: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
          dots: true,
          dotsClass: 'stages-block__dots dots',
          customPaging: function() {
            return dot;
          },
          variableWidth: true,
          centerMode: true,
          centerPadding: '0',
          mobileFirst: true,
          responsive: responsiveArray
        });
      }
    };

  if (indexServiceBlock) {
    window.addEventListener('resize', buildIndexServiceSlider);
    buildIndexServiceSlider();
  }

  if (indexNewsBlock) {
    window.addEventListener('resize', buildIndexNewsSlider);
    buildIndexNewsSlider();
  }



  /* RELATES SLIDER START */
  buildRelatedSinglesSlider = function() {
    if (relatedSinglesBlock && relatedSinglesBlock.children.length > 2 && matchMedia('(max-width: 767.98px)').matches) {
      console.log('msg');
      $('.related-singles').slick({
        accessibility: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,
        dots: true,
        dotsClass: 'related__dots dots',
        slide: '.single-card',
        centerMode: true,
        centerPadding: '0px',
        variableWidth: true,
        customPaging: function() {
          return dot;
        }
      });
    }
  }

  window.addEventListener('resize', function() {
    if (matchMedia('(min-width: 767.98px)').matches) {
      if ($('.related-singles').hasClass('slick-slider')) {
        $('.related-singles').slick('unslick');
      }
    }
  });
  /* RELATES SLIDER END */



  /* HERO SLIDER START */
  if (heroSlides && heroSlides.length > 1) {
    let heroSect = $('.hero-sect');

    heroSect.on('init', function() {
      heroSect.addClass('delayed');
    });

    heroSect.slick({
      accessibility: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      arrows: false,
      dots: true,
      slide: '.hero-sect__slide',
      dotsClass: 'hero-sect__dots dots',
      customPaging: function() {
        return dot;
      },
      swipeToSlide: true,
      fade: true,
      draggable: false,
      speed: 0,
      mobileFirst: true
    });



    heroSect.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      heroSect.toggleClass('toright', currentSlide < nextSlide)
        .toggleClass('toleft', currentSlide > nextSlide)
        .css('pointer-events', 'none');
    });

    heroSect.on('animationend', function() {
      let animName = event.animationName;

      if (animName === 'translateToLeft') {
        heroSect.removeClass('toright');
      } else if (animName === 'translateToRight') {
        heroSect.removeClass('toleft');
      }

      heroSect.css('pointer-events', 'auto');

    });


  }
  /* HERO SLIDER END */



  /* SERVICE BLOCK SLIDER START */
  let buildServicesSlider = function() {
    if (matchMedia('(min-width: 1319.98px)').matches && services.length < 4) {
      if ($('.services-block').hasClass('slick-slider')) {
        $('.services-block').slick('unslick');
      }
    } else {
      if ($('.services-block').hasClass('slick-slider')) {
        return;
      }
      if (services.length > 1) {
        $('.services-block').slick({
          accessibility: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
          dots: true,
          initialSlide: 0,
          dotsClass: 'services-block__dots dots',
          customPaging: function() {
            return dot;
          },
          mobileFirst: true,
          variableWidth: true,
          centerMode: true,
          centerPadding: '0',
          responsive: [{
            breakpoint: 575.98,
            settings: {
              slidesToShow: 2,
              centerMode: false
            }
          }, {
            breakpoint: 991.98,
            settings: {
              slidesToShow: 3,
              centerMode: false
            }
          }, {
            breakpoint: 1319.98,
            settings: {
              slidesToShow: 4,
              centerMode: false
            }
          }]
        });
      }
    }
  };
  /* SERVICE BLOCK SLIDER END */

  if (servicesBlock) {
    window.addEventListener('resize', buildServicesSlider);
    buildServicesSlider();
  }



  /* INDEX PAGE STAGES SLIDER START */
  // if is index page - build "stages slider" anyway
  if (page === 'index.php') {
    $('.stages-block').slick({
      accessibility: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      arrows: false,
      dots: true,
      dotsClass: 'stages-block__dots dots',
      customPaging: function() {
        return dot;
      },
      variableWidth: true,
      centerMode: true,
      centerPadding: '0',
      mobileFirst: true,
      responsive: [{
        breakpoint: 575.98,
        settings: {
          slidesToShow: 2,
          centerMode: false
        }
      }, {
        breakpoint: 767.98,
        settings: 'unslick'
      }]
    });
  }
  /* INDEX PAGE STAGES SLIDER END */



  /* TRUST BLOCK SLIDER START */
  if (trustFeatures && trustFeatures.length > 1) {
    $('.trust-sect > .features-block').slick({
      accessibility: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      arrows: false,
      dots: true,
      dotsClass: 'features-block__dots dots',
      customPaging: function() {
        return dot;
      },
      mobileFirst: true,
      variableWidth: true,
      centerMode: true,
      centerPadding: '0',
      responsive: [{
        breakpoint: 575.98,
        settings: {
          slidesToShow: 2,
          centerMode: false
        }
      }, {
        breakpoint: 991.98,
        settings: {
          slidesToShow: 3,
          centerMode: false
        }
      }, {
        breakpoint: 1319.98,
        settings: {
          slidesToShow: 4,
          centerMode: false
        }
      }]
    });
  }
  /* TRUST BLOCK SLIDER END */

  if (matchMedia('(min-width: 1319.98px)').matches) {
    if (trustFeatures && trustFeatures.length < 5) {
      $('.trust-sect > .features-block').slick('unslick');
    }
  }


  /* STAGES BLOCK TWO CHILDREN SLIDER START */
  let buildTwoChildrenSlider = function() {
    buildStagesBlockSlider(
      '.stages-block_two-children',
      '(min-width: 991.98px)',
      blockTwoChildrenChilds,
      3,
      [{
        breakpoint: 991.98,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          touchThreshold: 8
        }
      }]
    );
  };
  /* STAGES BLOCK TWO CHILDREN SLIDER START */

  if (blockTwoChildren) {
    window.addEventListener('resize', buildTwoChildrenSlider);
    buildTwoChildrenSlider();
  }


  /* STAGES BLOCK THREE CHILDREN SLIDER START */
  let buildThreeChildrenSlider = function() {
    buildStagesBlockSlider(
      '.stages-block_three-children',
      '(min-width: 1319.98px)',
      blockThreeChildrenChilds,
      4,
      [{
        breakpoint: 767.98,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          touchThreshold: 8
        }
      }, {
        breakpoint: 1319.98,
        settings: {
          slidesToShow: 3,
          centerMode: false,
          touchThreshold: 10
        }
      }]
    );
  };
  /* STAGES BLOCK THREE CHILDREN SLIDER END */

  if (blockThreeChildren) {
    window.addEventListener('resize', buildThreeChildrenSlider);
    buildThreeChildrenSlider();
  }



  /* STAGES BLOCK FOUR CHILDREN SLIDER START */
  let buildFourChildrenSlider = function() {
    buildStagesBlockSlider(
      '.stages-block_four-children',
      '(min-width: 1319.98px)',
      blockFourChildrenChilds,
      5,
      [{
        breakpoint: 767.98,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          touchThreshold: 8
        }
      }, {
        breakpoint: 991.98,
        settings: {
          slidesToShow: 3,
          centerMode: false,
          touchThreshold: 8
        }
      }, {
        breakpoint: 1319.98,
        settings: {
          slidesToShow: 4,
          centerMode: false,
          touchThreshold: 10
        }
      }]
    );
  };
  /* STAGES BLOCK FOUR CHILDREN SLIDER END */

  if (blockFourChildren) {
    window.addEventListener('resize', buildFourChildrenSlider);
    buildFourChildrenSlider();
  }


  $('.statistics-sect__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    dots: true,
    dotsClass: 'statistics-sect__dots dots',
    customPaging: function() {
      return dot;
    },
    variableWidth: true,
    centerMode: true,
    centerPadding: '0'
  });

  /* RISKS SLIDER START */
  if (risksBlock) {
    $('.risks-block').slick({
      accessibility: false,
      slidesToScroll: 1,
      slidesToShow: 1,
      infinite: false,
      arrows: false,
      dots: true,
      slide: '.risks-block .text-block',
      dotsClass: 'risks-block__dots dots',
      customPaging: function() {
        return dot;
      },
      mobileFirst: true,
      responsive: [{
        breakpoint: 575.98,
        settings: 'unslick'
      }]
    });
  }
  /* RISKS SLIDER END */

  $('.slick-list.draggable').on('mousedown', function() {
    $(this).addClass('grabbing');
  });

  $('.slick-list.draggable').on('beforeChange', function() {
    $(this).removeClass('grabbing');
  });

  $(document).on('mouseup', function() {
    $('.slick-list.draggable').removeClass('grabbing');
  });

})();