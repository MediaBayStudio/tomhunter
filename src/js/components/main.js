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
  //=include _pressCentr-loadNewPosts.js
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
    let myMap;
    const addresses = {
      spb: {
        coords: [59.849962, 30.302950],
        addres: '196247, Ленинский пр-т, 153 лит. А,\nБЦ «SetlCenter», офис 637'
      },
      msc: {
        coords: [55.815539, 37.518309],
        addres: '127299, ул. Космонавта Волкова 12,\nпомещение 205'
      }
    };

    const btns = document.querySelectorAll('[data-loc-name]');

    btns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const location = btn.dataset.locName;
        clearBtnsActiveClass(btns, 'active');
        btn.classList.add('active');

        myMap.setCenter(addresses[location]['coords'])

        let myPlacemarkMsc = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'T.Hunter',
          balloonContent: addresses.msc.addres
        }, {
          iconLayout: 'default#image',
          iconImageHref: dir + '/img/geo-icon.svg',
          iconImageSize: [38, 46]
        });

        myMap.geoObjects.add(myPlacemarkMsc);
      });
    })

    ymaps.ready(loadMap);

    function loadMap() {
      myMap = new ymaps.Map('map', {
          center: [addresses.spb.coords[0], addresses.spb.coords[1]],
          zoom: mapZoom,
          controls: ['zoomControl']
        }, {
          searchControlProvider: 'yandex#search'
        });

      let myPlacemarkSpb = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'T.Hunter',
          balloonContent: addresses.spb.addres
        }, {
          iconLayout: 'default#image',
          iconImageHref: dir + '/img/geo-icon.svg',
          iconImageSize: [38, 46]
        });

      myMap.geoObjects.add(myPlacemarkSpb);

      if (navigator.userAgent.search(/Firefox/) === -1) {
        myMap.panes.get('ground').getElement().style.filter = 'url(#monochrome)';
      }
      else {
        myMap.panes.get('ground').getElement().style.filter = 'grayscale(100%)';
      }
    };

    function clearBtnsActiveClass(btns, className) {
      btns.forEach(function(btn) {
        btn.classList.remove(className)
      })
    }
  };
});

// setTimeout(function() {
//   // let scriptSrc = "https://api-maps.yandex.ru/2.1/?apikey=82596a7c-b060-47f9-9fb6-829f012a9f04&lang=ru_RU&onload=ymapsOnload",
//   let scriptSrc = "https://api-maps.yandex.ru/2.1/?apikey=82596a7c-b060-47f9-9fb6-829f012a9f04&lang=ru_RU",
//       tag = document.createElement("script");

//   tag.setAttribute("async", "async");
//   tag.setAttribute("src", scriptSrc);
//   document.body.appendChild(tag);
// }, 0);


function ymapsOnload(lon, lat) {
    ymaps.ready(function () {
      let coords = {
        a: lon,
        b: lat
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

consultQuestions()

function consultQuestions() {
  const questionsList = document.querySelector('.questions__list');

  if (!questionsList) return;

  questionsList.addEventListener('click', e => {
    let target = e.target;
    let question = target.closest('.questions__item');
    let questionTitle = target.closest('.questions__item-title');
    let answer = question.querySelector('.questions__item-answer');

    if (questionTitle) {
      if (!question.classList.contains('questions__item_open')) {
        question.classList.add('questions__item_open');
        answer.style.height = answer.scrollHeight + 'px';
      } else {
        question.classList.remove('questions__item_open');
        answer.style.height = 0;
      }
    }
  });
}

swapTitleTextOnMobile()

/**
 * Смена текста в заголовке секции "Защита от несанкционированного доступа" на странице "Техническая защита информации"
 * на мобильном
 */


function swapTitleTextOnMobile() {
  if (!window.location.href.includes('tech-info-protection')) return;

  const title = document.querySelector('.swap-title-on-mobile');

  const textForSwap = 'Защита от несанкционированного доступа';
  const newText = 'Защита от незаконного доступа';
  const windowWidth = document.documentElement.clientWidth

  if (title.textContent.includes(textForSwap) && windowWidth < 768) {
    title.textContent = newText
  }
}