// intersectionObserver polyfill
(function(){'use strict';function a(a){this.time=a.time,this.target=a.target,this.rootBounds=a.rootBounds,this.boundingClientRect=a.boundingClientRect,this.intersectionRect=a.intersectionRect||i(),this.isIntersecting=!!a.intersectionRect;var b=this.boundingClientRect,c=b.width*b.height,d=this.intersectionRect,e=d.width*d.height;this.intersectionRatio=c?+(e/c).toFixed(4):this.isIntersecting?1:0}function b(a,b){var c=b||{};if("function"!=typeof a)throw new Error("callback must be a function");if(c.root&&1!=c.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=d(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=a,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(c.rootMargin),this.thresholds=this._initThresholds(c.threshold),this.root=c.root||null,this.rootMargin=this._rootMarginValues.map(function(a){return a.value+a.unit}).join(" ")}function c(){return window.performance&&performance.now&&performance.now()}function d(a,b){var c=null;return function(){c||(c=setTimeout(function(){a(),c=null},b))}}function e(a,b,c,d){"function"==typeof a.addEventListener?a.addEventListener(b,c,d||!1):"function"==typeof a.attachEvent&&a.attachEvent("on"+b,c)}function f(a,b,c,d){"function"==typeof a.removeEventListener?a.removeEventListener(b,c,d||!1):"function"==typeof a.detatchEvent&&a.detatchEvent("on"+b,c)}function g(a,b){var c=Math.max(a.top,b.top),d=Math.min(a.bottom,b.bottom),e=Math.max(a.left,b.left),f=Math.min(a.right,b.right),g=f-e,h=d-c;return 0<=g&&0<=h&&{top:c,bottom:d,left:e,right:f,width:g,height:h}}function h(a){var b;try{b=a.getBoundingClientRect()}catch(a){}return b?(b.width&&b.height||(b={top:b.top,right:b.right,bottom:b.bottom,left:b.left,width:b.right-b.left,height:b.bottom-b.top}),b):i()}function i(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function j(a,b){for(var c=b;c;){if(c==a)return!0;c=k(c)}return!1}function k(a){var b=a.parentNode;return b&&11==b.nodeType&&b.host?b.host:b&&b.assignedSlot?b.assignedSlot.parentNode:b}if("object"==typeof window){if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)return void("isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}}));var l=window.document,m=[];b.prototype.THROTTLE_TIMEOUT=100,b.prototype.POLL_INTERVAL=null,b.prototype.USE_MUTATION_OBSERVER=!0,b.prototype.observe=function(a){var b=this._observationTargets.some(function(b){return b.element==a});if(!b){if(!(a&&1==a.nodeType))throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:a,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},b.prototype.unobserve=function(a){this._observationTargets=this._observationTargets.filter(function(b){return b.element!=a}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},b.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},b.prototype.takeRecords=function(){var a=this._queuedEntries.slice();return this._queuedEntries=[],a},b.prototype._initThresholds=function(a){var b=a||[0];return Array.isArray(b)||(b=[b]),b.sort().filter(function(b,c,d){if("number"!=typeof b||isNaN(b)||0>b||1<b)throw new Error("threshold must be a number between 0 and 1 inclusively");return b!==d[c-1]})},b.prototype._parseRootMargin=function(a){var b=(a||"0px").split(/\s+/).map(function(a){var b=/^(-?\d*\.?\d+)(px|%)$/.exec(a);if(!b)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(b[1]),unit:b[2]}});return b[1]=b[1]||b[0],b[2]=b[2]||b[0],b[3]=b[3]||b[1],b},b.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(e(window,"resize",this._checkForIntersections,!0),e(l,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in window&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(l,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},b.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,f(window,"resize",this._checkForIntersections,!0),f(l,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},b.prototype._checkForIntersections=function(){var b=this._rootIsInDom(),d=b?this._getRootRect():i();this._observationTargets.forEach(function(e){var f=e.element,g=h(f),i=this._rootContainsTarget(f),j=e.entry,k=b&&i&&this._computeTargetAndRootIntersection(f,d),l=e.entry=new a({time:c(),target:f,boundingClientRect:g,rootBounds:d,intersectionRect:k});j?b&&i?this._hasCrossedThreshold(j,l)&&this._queuedEntries.push(l):j&&j.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},b.prototype._computeTargetAndRootIntersection=function(a,b){if("none"!=window.getComputedStyle(a).display){for(var c=h(a),d=c,e=k(a),f=!1;!f;){var i=null,j=1==e.nodeType?window.getComputedStyle(e):{};if("none"==j.display)return;if(e==this.root||e==l?(f=!0,i=b):e!=l.body&&e!=l.documentElement&&"visible"!=j.overflow&&(i=h(e)),i&&(d=g(i,d),!d))break;e=k(e)}return d}},b.prototype._getRootRect=function(){var a;if(this.root)a=h(this.root);else{var b=l.documentElement,c=l.body;a={top:0,left:0,right:b.clientWidth||c.clientWidth,width:b.clientWidth||c.clientWidth,bottom:b.clientHeight||c.clientHeight,height:b.clientHeight||c.clientHeight}}return this._expandRectByRootMargin(a)},b.prototype._expandRectByRootMargin=function(a){var b=this._rootMarginValues.map(function(b,c){return"px"==b.unit?b.value:b.value*(c%2?a.width:a.height)/100}),c={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3]};return c.width=c.right-c.left,c.height=c.bottom-c.top,c},b.prototype._hasCrossedThreshold=function(a,b){var c=a&&a.isIntersecting?a.intersectionRatio||0:-1,d=b.isIntersecting?b.intersectionRatio||0:-1;if(c!==d)for(var e,f=0;f<this.thresholds.length;f++)if(e=this.thresholds[f],e==c||e==d||e<c!=e<d)return!0},b.prototype._rootIsInDom=function(){return!this.root||j(l,this.root)},b.prototype._rootContainsTarget=function(a){return j(this.root||l,a)},b.prototype._registerInstance=function(){0>m.indexOf(this)&&m.push(this)},b.prototype._unregisterInstance=function(){var a=m.indexOf(this);-1!=a&&m.splice(a,1)},window.IntersectionObserver=b,window.IntersectionObserverEntry=a}})();
// customEvents polyfill
(function(){function a(a,b){b=b||{bubbles:!1,cancelable:!1,detail:null};var c=document.createEvent("CustomEvent");return c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c}return"function"!=typeof window.CustomEvent&&void(a.prototype=window.Event.prototype,window.CustomEvent=a)})();
//closest polyfill
(function(ELEMENT) {
  ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
  ELEMENT.closest = ELEMENT.closest || function closest(selector) {
      if (!this) return null;
      if (this.matches(selector)) return this;
      if (!this.parentElement) {return null}
      else return this.parentElement.closest(selector)
    };
}(Element.prototype))

let hdr,
  menu,
  thanksPopup,
  callbackPopup,
  heroSect,
  heroSlides,
  servicesBlock,
  services,
  trustBlock,
  trustFeatures,
  body,
  lazy,
  searchInp,
  posts = {},
  buildRelatedSinglesSlider,
  preloader,
  spread = function(elements) {
    let arr = [];

    for (let i = 0, len = elements.length; i < len; i++) {
      arr.push(elements[i]);
    }

    return arr;
  },
  overlayClick = function(popup) {
    popup.addEventListener('click', function() {
      if (event.target === this) {
        this.close();
      }
    });
  };

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

  ;(function() {

    let IE = navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.indexOf("Trident/") > -1;

  

    if (IE) {

      // подключение svg plyfill

      let scr = document.createElement('script');

      scr.setAttribute('src', dir + '/js/svg4everybody.min.js');

      body.appendChild(scr);

      scr.addEventListener('load', function() {

        svg4everybody();

      });

    }

  })();
  ;(function() {
    // menu = new SimpleMenu({
    //   menu: 'aside',
    //   openBtn: {
    //     selector: '.burger',
    //     class: 'active'
    //   },
    //   closeBtn: {
    //     selector: '.burger',
    //     class: 'active'
    //   },
    //   overlay: '.menu-overlay',
    //   toRight: true,
    //   desktop: true
    // });
    menu = new MobileMenu('.menu', {
      openButton: '.burger',
      closeButtons: '.burger',
      overlay: '.menu-overlay',
      toRight: true
    });
  
    // console.log([menu]);
  })();
  ;(function() {
    callbackPopup = new SimplePopup({
      popup: '.callback-popup',
      openBtn: '.hdr__callback-btn, .menu__request-call-btn',
      closeBtn: '.callback-popup__close',
      overlay: '.overlay',
      popupAnimation: 'fadeOut .5s',
      overlayAnimation: 'fadeOut .5s'
    });
  
    //временное решение
    let zoom = document.querySelector('.img_zoom'),
      zoomImg = zoom && zoom.querySelector('.risks-sect__img');
  
    if (matchMedia('(min-width: 575.98px)').matches && zoom) {
      zoom.classList.remove('img_zoom');
    }
  
    let zoomPopup = new SimplePopup({
      popup: '.zoom-popup',
      openBtn: '.img_zoom',
      closeBtn: '.zoom-popup__close',
      overlay: '.overlay',
      popupAnimation: 'fadeOut .5s',
      overlayAnimation: 'fadeOut .5s'
    }),
    zoomPopupContent = zoomPopup.style && zoomPopup.querySelector('.zoom-popup__content'),
    zoomPopupImg;
  
    zoomPopup.style && zoomPopup.addEventListener('beforeopen', function() {
      if (!zoomPopupImg) {
        zoomPopupImg = document.createElement('img');
        zoomPopupImg.setAttribute('src', zoomImg.src);
        zoomPopupImg.setAttribute('alt', '#');
        zoomPopupImg.classList.add('zoom-popup__img');
        zoomPopupContent.appendChild(zoomPopupImg);
      }
    });
  
    
  
    callbackPopup.style && overlayClick(callbackPopup);
    zoomPopup.style && overlayClick(zoomPopup);
    
  })();
  ;(function() {
    let hdrClone = hdr.cloneNode(true),
      hdrParent = hdr.parentElement,
      fixThreshold = hdr.getBoundingClientRect().bottom + pageYOffset;
      
    hdrClone.style.opacity = 0;
    hdrClone.style.pointerEvents = 'none';
  
    window.addEventListener('scroll', fixHdr);
    fixHdr();
    
    function fixHdr() {
      if (pageYOffset > fixThreshold) {
        if (menu.style && menu.classList.contains('active')) {
          return;
        }
        hdrParent.appendChild(hdrParent.replaceChild(hdrClone, hdr));
        hdr.classList.add('fixed');
        window.removeEventListener('scroll', fixHdr);
        window.addEventListener('scroll', unfixHdr);
      }
    }
  
    function unfixHdr() {
      if (pageYOffset <= fixThreshold) {
        hdrParent.replaceChild(hdr, hdrClone);
        hdr.classList.remove('fixed');
        window.removeEventListener('scroll', unfixHdr);
        window.addEventListener('scroll', fixHdr);
      }
    }
  })();
  ;(function() {
    let linkNav = document.querySelectorAll('a:not(.disabled)[href^="#"]'),
      heroSect = document.querySelector('.hero-sect'),
      nextSect = heroSect && heroSect.nextElementSibling,
      downArrow = heroSect && heroSect.querySelector('.hero-sect__arrow'),
      V = .25;
  
    if (downArrow) {
      downArrow.href = `#${nextSect.id}`;
    }
  
    for (let i = 0; i < linkNav.length; i++) {
      linkNav[i].addEventListener('click', function() {
  
        event.preventDefault();
  
        let wndwY = window.pageYOffset,
          hash = this.href.replace(/[^#]*(.*)/, '$1'),
          target = document.querySelector(hash),
          targetTop = target.getBoundingClientRect().top - +(getComputedStyle(target).paddingTop).slice(0, -2),
          start = null;
  
        requestAnimationFrame(step);
  
        function step(time) {
          if (start === null) {
            start = time;
          }
          let progress = time - start,
            r = (targetTop < 0 ? Math.max(wndwY - progress/V, wndwY + targetTop) : Math.min(wndwY + progress/V, wndwY + targetTop));
  
          window.scrollTo(0, r);
  
  
          if (r != wndwY + targetTop) {
            requestAnimationFrame(step);
          } else {
            location.hash = hash;
          }
        }
      });
    }
  
  })();
  ;(function() {
  	function setCursorPosition(pos, elem) {
  		elem.focus();
  		if (elem.setSelectionRange) {
  			elem.setSelectionRange(pos, pos);
  		} else if (elem.createTextRange) {
  			let range = elem.createTextRange();
  			range.collapse(true);
  			range.moveEnd("character", pos);
  			range.moveStart("character", pos);
  			range.select()
  		}
  	}
  
  		function mask(event) {
  		let matrix = "+7(___)___-__-__",
  		i = 0,
  		def = matrix.replace(/\D/g, ""),
  		val = this.value.replace(/\D/g, "");
  		if (def.length >= val.length) val = def;
  		this.value = matrix.replace(/./g, function(a) {
  		return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
  		});
  		if (event.type == "blur") {
  		if (this.value.length == 2) this.value = ""
  		} else setCursorPosition(this.value.length, this)
  		};
  		let input = document.querySelectorAll("[name=user-tel]");
  		for (let i = 0; i < input.length; i++) {
  			input[i].addEventListener("input", mask, false);
  			input[i].addEventListener("focus", mask, false);
  			input[i].addEventListener("blur", mask, false);
  		}
  })();
  ;(function() {
    let mediaCenterBlock = document.querySelector('.media-center-block');
  
    if (mediaCenterBlock) {
      document.body.removeChild(document.querySelector('.postcat'));
      searchInp = document.querySelector('.search__inp');
  
      let 
      // loadMoreBtn = document.querySelector('.load-more-btn'),
        sortBlock = document.querySelector('.sort-block'),
        // pageLoader = document.querySelector('.media-center-sect > .loader-bg'),
        currentCategoryName = POSTCAT,
        currentPageNumber = 1,
        url = siteurl + '/wp-admin/admin-ajax.php',
        banners,
        bannersOnPage = [],
        bannersCoeff = 0,
        bannersTotalCount = mediaCenterBlock.getAttribute('data-banners-count'),
        postsOnPage = [],
        postsPerPage = 0,
        postsTotalLength = mediaCenterBlock.getAttribute('data-length'),
        inProgress = false,
        setPostsPerPage = function() {
          if (matchMedia('(min-width: 1319.98px)').matches) {
            postsPerPage = 7;
          } else if (matchMedia('(min-width: 767.98px)').matches) {
            postsPerPage = 5;
          } else {
            postsPerPage = 4;
          }
        },
        showStartPosts = function() {
          let mediaCenterChilds = spread(mediaCenterBlock.children);
          // если десктоп, то в каждой семерке берем первые 4, вставляем в обертку и туда же баннер
          // чередуем баннер
          if (postsPerPage === 7) {
            let banner = mediaCenterBlock.querySelector('.media-center-block > a:first-of-type');        
  
            if (banner) {
              let cardsWrapper = document.createElement('div'),
                cardsWrapperLeft = document.createElement('div');
  
              cardsWrapper.classList.add('cards-wrapper');
              cardsWrapperLeft.classList.add('cards-wrapper__left');
  
              for (let i = 0; i < 4; i++) {
                mediaCenterChilds[i] && cardsWrapperLeft.insertAdjacentElement('beforeend', mediaCenterChilds[i]);
              }
  
              cardsWrapper.insertAdjacentElement('beforeend', cardsWrapperLeft);
              banner && cardsWrapper.insertAdjacentElement('beforeend', banner);
  
              // mediaCenterBlock.children[0].insertAdjacentElement('beforebegin', cardsWrapper);
              mediaCenterBlock.insertAdjacentElement('afterbegin', cardsWrapper);
            }
          } else if (postsPerPage === 5) {
            for (let i = mediaCenterBlock.children.length - 1; i > 5; i--) {
              mediaCenterBlock.removeChild(mediaCenterBlock.children[mediaCenterBlock.children.length - 1]);
            }
          } else if (postsPerPage === 4) {
            for (let i = mediaCenterBlock.children.length - 1; i > 4; i--) {
              mediaCenterBlock.removeChild(mediaCenterBlock.children[mediaCenterBlock.children.length - 1]);
            }
          }
  
          for (let i = 0; i < mediaCenterChilds.length; i++) {
            if (mediaCenterChilds[i].classList.contains('service-block')) {
              continue;
            }
            postsOnPage.push(mediaCenterChilds[i]);
          }
          mediaCenterBlock.removeAttribute('data-length');
          searchInp.parentElement.classList.remove('disabled');
          sortBlock.classList.remove('disabled');
        },
        getPosts = function(postOffset, postsPerPage, bannerOffset, callback) {
          // console.log(`postOffset: ${postOffset}`);
          // console.log(`postsPerPage: ${postsPerPage}`);
          // console.log('bannerOffset', bannerOffset);
          inProgress = true;
          let xhr = new XMLHttpRequest(),
            data = 'action=loadmore&termId=' + currentCategoryName + '&postOffset=' + postOffset + '&postsPerPage=' + postsPerPage + '&bannerOffset=' + bannerOffset;
  
          xhr.open('POST', url + '/wp-admin/admin-ajax.php');
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.send(data);
          // console.log(data);
          xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
              let response = JSON.parse(xhr.response);
              callback && callback(response);
            }
          });
        },
        printPosts = function(posts) {
          let cardsWrapper,
            cardsWrapperLeft;
  
          if (postsPerPage === 7 && posts.count > 3) {
            cardsWrapper = document.createElement('div');
            cardsWrapperLeft = document.createElement('div');
  
            cardsWrapper.classList.add('cards-wrapper');
            cardsWrapperLeft.classList.add('cards-wrapper__left');
          }
  
          for (let i = 0; i < posts.count; i++) {
            let {category, title, preview_descr, link, date, images} = posts[i],
              html =
                `<article class="single-card">
                  <a href="${link}" class="single-card__img-wrap">
                    <img src="#" alt="#"
                      data-src="image-set(${images.post_card_320} 1x, ${images.post_card_320_x2} 2x, ${images.post_card_320_x2} 3x)"
                      data-media="(min-width: 767.98px) {image-set(${images.post_card_768} 1x, ${images.post_card_768_x2} 2x, ${images.post_card_768_x3} 3x)}
                                  (min-width: 1319.98px) {image-set(${images.post_card_1440} 1x, ${images.post_card_1440_x2} 2x)}" class="single-card__img lazy">
                  </a>
                  <span class="single-card__category">${category.join(', ')}</span>
                  <a href="${link}" class="single-card__title-wrap"><strong class="single-card__title">${title}</strong></a>
                  <p class="single-card__descr">${preview_descr}</p>
                  <div class="single-card__bottom">
                    <a href="${link}" class="single-card__link link_red">Читать...</a>
                    <span class="single-card__date">${date}</span>
                  </div>
                </article>`;
  
            if (cardsWrapper) {
              if (i < 4) {
                cardsWrapperLeft.insertAdjacentHTML('beforeend', html);
              } else {
                // cardsWrapper.insertAdjacentHTML('beforeend', html);
                setTimeout(function() {
                  mediaCenterBlock.insertAdjacentHTML('beforeend', html);
                }, 10);
              }
            } else {
              mediaCenterBlock.insertAdjacentHTML('beforeend', html);
            }
            inProgress = false;
            mediaCenterBlock.classList.remove('loading');
  
            // console.log(posts[i]);
          }
  
          if (postsPerPage === 7 && posts.count > 3) {
            cardsWrapper.insertAdjacentElement('beforeend', cardsWrapperLeft);
            mediaCenterBlock.insertAdjacentElement('beforeend', cardsWrapper);
          }
  
          // console.log(posts);
          // console.log(cardsWrapper);
        },
        printBanner = function(banner, posts) {
  
          if (posts.count < 4 && postsPerPage !== 7) {
            return;
          }
  
          // console.log(banner);
          // console.log(posts);
  
          let lastCardsWrapper;
  
          if (posts.count > 3) {
            
            if (postsPerPage === 7) {
              lastCardsWrapper = mediaCenterBlock.querySelector('.cards-wrapper:last-of-type');
            }
  
            let {title, descr, link, images} = banner[0],
              img320 = images.img_320,
              img768 = images.img_768,
              html = 
              `<a href="${link.url}" class="service-block" title="Перейти на страницу ${title}">
                <img src="#" alt="${img320.alt}" class="service-block__img lazy"
                data-src="${img320.src}"
                data-media="(min-width: 1319.98px) {${img768.src}}">
                <strong class="service-block__title">${title}</strong>
                <p class="service-block__descr">${descr}</p>
                <span class="service-block__link">${link.title}</span>
              </a>`;
  
            if (postsPerPage === 7) {
              lastCardsWrapper.insertAdjacentHTML('beforeend', html);
            } else {
              mediaCenterBlock.insertAdjacentHTML('beforeend', html);
            }
          }
          
        };
  
  
    // console.log('bannersTotalCount', bannersTotalCount);
      setPostsPerPage();
      showStartPosts();
      window.addEventListener('scroll', function() {
        let doc = document.documentElement;
        if ((doc.scrollHeight - doc.clientHeight <= window.pageYOffset + 500) && !inProgress) {
            let singles = mediaCenterBlock.querySelectorAll('.single-card'),
              bannersLength = mediaCenterBlock.querySelectorAll('.service-block').length;
              
          if (singles.length < postsTotalLength) {
            mediaCenterBlock.classList.add('loading');
            // console.log('bannersLength', bannersLength);
  
            if (bannersCoeff < bannersTotalCount - 1) {
              // console.log('Прибавляем 1');
              bannersCoeff++;
            } else {
              bannersCoeff = 0;
              // console.log('Сбрасываем счетчик');
            }
  
            // if (bannersLength === bannersTotalCount) {
            //   bannersLength = 0;
            // }
  
            // if (bannersLength === 5) {
            //   bannersCoeff = 5;
            // }
            // if (bannersLength < 5) {
            //   bannersCoeff++;
            // }
  
            // getPosts(singles.length, postsPerPage, bannersLength - bannersCoeff, function(response) {
            getPosts(singles.length, postsPerPage, bannersCoeff, function(response) {
              printPosts(response.posts);
              printBanner(response.banner, response.posts);
              setTimeout(function() {
                lazy.refresh();
              }, 25);
            });
          }
        }
      });
      // setBtnVisibility();
  
      // loadMoreBtn.addEventListener('click', function() {
      //   loadMoreBtn.classList.add('disabled');
      //   loadMoreBtn.classList.add('active');
  
  
      //   let singles = mediaCenterBlock.querySelectorAll('.single-card'),
      //     bannersLength = mediaCenterBlock.querySelectorAll('.service-block').length;
  
      //   if (bannersLength === 5) {
      //     bannersCoeff = 5;
      //   }
      //   if (bannersLength < 5) {
      //     bannersCoeff++;
      //   }
  
      //   getPosts(singles.length, postsPerPage, bannersLength - bannersCoeff, function(response) {
      //     printPosts(response.posts);
      //     printBanner(response.banner, response.posts);
      //     setTimeout(function() {
      //       setBtnVisibility();
      //       lazy.refresh();
      //     }, 25);
      //   });
      // });
          
    }
  
  })();
  ;(function() {
  
    if (searchInp) {
  
       let searchResult = document.querySelector('.search__result'),
        searchResultList = searchResult.querySelector('.search__result-list'),
        searchStartText = searchResult.querySelector('.search__start'),
        searchNoResultsText = searchResult.querySelector('.search__noresult'),
        posts,
        insertMark = function(string, pos, length) {
          return string.slice(0, pos) + '<span class="mark">' + string.slice(pos, pos + length) + '</span>' + string.slice(pos + length);
        },
        closeResultsWIndow = function() {
          this.value = '';
          searchResultList.innerHTML = '';
  
          searchResult.classList.add('hide');
          showNoResults();
        },
        openResultsWindow = function() {
          searchResult.classList.remove('hide');
        },
        removeEvent = function() {
          searchInp.removeEventListener('blur', closeResultsWIndow);
        },
        addEvent = function() {
          searchInp.addEventListener('blur', closeResultsWIndow);
        },
        showNoResults = function() {
          searchNoResultsText.classList.remove('hide');
          searchStartText.classList.add('hide');
        };
        forbidInput = function() {
          this.value = '';
        };
  
  
      searchInp.addEventListener('focus', function() {
        searchInp.classList.add('focused');
        searchInp.value = '';
  
        if (!posts) {
          searchInp.classList.add('searching');
          searchInp.addEventListener('input', forbidInput);
  
          let xhr = new XMLHttpRequest();
          xhr.open('POST', `${dir}/search.php`);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.send(`search=${searchInp.value}`);
  
          xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
              searchInp.classList.remove('searching');
              searchInp.removeEventListener('input', forbidInput);
              if (xhr.response) {
                posts = JSON.parse(xhr.response);
  
                openResultsWindow();
                searchInp.addEventListener('blur', closeResultsWIndow);
                searchResult.addEventListener('mousedown', removeEvent);
                searchResult.addEventListener('mouseup', addEvent);
                searchResult.addEventListener('touchstart', removeEvent);
                searchResult.addEventListener('touchend', addEvent);
                searchInp.addEventListener('focus', openResultsWindow);
                searchInp.addEventListener('input', function() {
                  let html = '';
  
                  for (let key in posts) {
                    let post = posts[key],
                      searchRegExp = new RegExp(searchInp.value, 'gi'),
                      startPos = post.title.search(searchRegExp);
  
                    if (startPos !== -1) {
                      let postLink = post.link,
                        postTitle = insertMark(post.title, startPos, searchInp.value.length);
                        searchStartText.classList.add('hide');
  
                      html += `<a href="${postLink}" class="search__result-link" title="Перейти на страницу статьи">${postTitle}</a>`;
                    }
  
                    if (searchInp.value === '') {
                      html = '';
                    }
                  }
  
                  searchResultList.innerHTML = '';
                  searchResultList.insertAdjacentHTML('beforeend', html);
  
                  if (searchInp.value !== '' && searchResultList.innerHTML === '') {
                    showNoResults();
                  } else {
                    searchNoResultsText.classList.add('hide');
                  }
  
                  if (searchInp.value === '' && searchResultList.innerHTML === '') {
                    searchStartText.classList.remove('hide');
                  }
  
                });
  
              } else {
                // записей нет
              }
            }
          });
        }
      });
  
      searchInp.addEventListener('blur', function() {
          searchInp.classList.remove('focused', 'searching');
          searchInp.removeEventListener('input', forbidInput);
      });
     
    }
  
  })();
  // ;(function() {
  //   let relatedSinglesBlock = document.querySelector('.related-singles');
  
  //     if (relatedSinglesBlock) {
  //       let currentPostTitle = document.querySelector('.single-sect__title').innerText,
  //         url = siteurl + '/wp-admin/admin-ajax.php',
  //         xhr = new XMLHttpRequest(),
  //         showedPosts = [];
  
  //     xhr.open('POST', url);
  //     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  //     xhr.send('action=loadmore');
  
  //     xhr.addEventListener('readystatechange', function() {
  //       if (xhr.readyState === 4 && xhr.status === 200) {
  
  //         let response = JSON.parse(xhr.response);
  
  //         posts.all = response['posts'];
  //         banners = response['banners'];
  
          
  //         // filter posts
  //         for (let i = 0; i < posts.all.length; i++) {
  //           let post = posts.all[i];
  //           if (post.title !== currentPostTitle) {
  //             showedPosts.push(post);
  //           }
  
            
  
  //           if (showedPosts.length === 3) {
  //             break;
  //           }
  
  //         }
  
  //         for (let key in showedPosts) {
  //           let {category, title, preview_descr, link, date, images} = showedPosts[key],
  //               categoryNames = []
  
  //           for (let j = 0; j < category.length; j++) {
  //             categoryNames.push(category[j].name);
  //           }
  
  //           let categoryText = categoryNames.join(', '),
  //             html =
  //             `<article class="single-card">
  //               <img src="#" alt="#"
  //                 data-src="image-set(${images.post_card_320} 1x, ${images.post_card_320_x2} 2x, ${images.post_card_320_x2} 3x)"
  //                 data-media="(min-width: 767.98px) {image-set(${images.post_card_768} 1x, ${images.post_card_768_x2} 2x, ${images.post_card_768_x3} 3x)}
  //                             (min-width: 1319.98px) {image-set(${images.post_card_1440} 1x, ${images.post_card_1440_x2} 2x)}" class="single-card__img lazy">
  //               <span class="single-card__category">${categoryText}</span>
  //               <a href="${link}"><strong class="single-card__title">${title}</strong></a>
  //               <p class="single-card__descr">${preview_descr}</p>
  //               <div class="single-card__bottom">
  //                 <a href="${link}" class="single-card__link link_red">Читать...</a>
  //                 <span class="single-card__date">${date}</span>
  //               </div>
  //             </article>`;
  
  //           relatedSinglesBlock.insertAdjacentHTML('beforeend', html);
  //         }
  
  //         lazy.refresh();
  //         buildRelatedSinglesSlider();
  //       }
  //     });
  //     }
  // })();
  ;(function() {
    preloader = document.querySelector('.preloader');
  
    window.addEventListener('load', function() {
      preloader.classList.add('hidden');
      document.body.classList.remove('wait', 'no-scroll');
  
      preloader.addEventListener('animationend', function() {
        if (event.animationName === 'hidePreloader') {
          preloader.classList.add('hide');
        }
      });
    });
  
  })();

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