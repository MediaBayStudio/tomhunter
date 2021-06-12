//=include _utils.js

document.addEventListener('DOMContentLoaded', function() {
  hdr = document.querySelector('.hdr');

  heroSect = document.querySelector('.hero-sect');
  heroSlides = heroSect && heroSect.querySelectorAll('.hero-sect__slide');

  servicesBlock = document.querySelector('.services-block');
  services = servicesBlock && servicesBlock.querySelectorAll('.card');

  trustBlock = document.querySelector('.trust-sect > .features-block');
  trustFeatures = trustBlock && trustBlock.children;

  body = document.body;
    let pageUtilsScript = document.querySelector('script.page-utils'),

    setVh = function() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', vh + 'px');
    };

  // vh units fix
  window.addEventListener('resize', setVh);
  setVh();

  let linkRegExp = /\#|tel|mailto/,
    checkLink = function(link) {
      return link && link.tagName === 'A' && link.href.search(linkRegExp) === -1 && !link.hasAttribute('target');
    };

  document.addEventListener('click', function() {
    let target = event.target,
      parentA = target.closest('a');

    if (checkLink(target) || checkLink(parentA)) {
      preloader.classList.remove('hide', 'hidden');
      preloader.classList.add('show');
      document.body.classList.add('wait');
    }
  });

  pageUtilsScript && document.head.removeChild(pageUtilsScript);

  //=include _ie.js
  //=include _menu.js
  //=include _popups.js
  //=include _fixhdr.js
  //=include _scrollToAnchors.js
  //=include _telmask.js
  //=include _pressCenter.js
  //=include _pressCenterSearch.js
  //=include _relatedSingles.js
  //=include _preloader.js

  lazy = new lazyload({
    clearSrc: true,
    clearMedia: true
  });

});


window.addEventListener('load', function() {


  // быстрая загрузка главных изображений
  let lazyload = document.querySelectorAll('.lazyload');

  for (let i = 0; i < lazyload.length; i++) {
    lazyload[i].src = lazyload[i].dataset.src;
  }


  // lazyload яндекс карт
  let mapBlock = document.querySelector('#map');
  if (mapBlock) {
    setTimeout(function() {
      let scriptSrc = "https://api-maps.yandex.ru/2.1/?apikey=82596a7c-b060-47f9-9fb6-829f012a9f04&lang=ru_RU&onload=ymapsOnload",
          tag = document.createElement("script");

      tag.setAttribute("async", "async");
      tag.setAttribute("src", scriptSrc);
      document.body.appendChild(tag);
    }, 3500);
  }
  
});


function ymapsOnload() {
    ymaps.ready(function () {
      let coords = {
        a: mapCoords.a,
        b: mapCoords.b
      },
        myMap = new ymaps.Map('map', {
        center: [coords.a, coords.b],
        zoom: mapZoom,
        controls: ['zoomControl']
      }, {
        searchControlProvider: 'yandex#search'
      }),
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'T.Hunter',
            balloonContent: mapAddress
        }, {
            iconLayout: 'default#image',
            iconImageHref: dir + '/img/geo-icon.svg',
            iconImageSize: [38, 46]
        });
  
      myMap.geoObjects.add(myPlacemark);
      if (navigator.userAgent.search(/Firefox/) === -1) {
        myMap.panes.get('ground').getElement().style.filter = 'url(#monochrome)';
      }
      else {
        myMap.panes.get('ground').getElement().style.filter = 'grayscale(100%)';
      }
    });
  }