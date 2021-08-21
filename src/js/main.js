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
  
    callbackPopup = new SimplePopup({
      popup: '.materials-popup',
      openBtn: '.materials__file-open-btn',
      closeBtn: '.materials-popup__close',
      overlay: '.overlay',
      popupAnimation: 'fadeOut .5s',
      overlayAnimation: 'fadeOut .5s',
      scrollThreshold: '1000'
    });
  
    materialsBtnsOnClick(setMaterialsPopupText)
  
    /**
     * Получаем у элемента дата атрибут(data-popup-content) и вставляем в попап как html
     * @param {HTMLElement} materialBtn
     */
    function setMaterialsPopupText(materialBtn) {
      const materialPopupDescr = document.querySelector('.materials-popup__descr');
      let html = materialBtn.dataset.popupContent;
  
      materialPopupDescr.innerHTML = html;
    }
  
    /**
     * Выполняем переданную функцию, которой в аргумент передается сама кнопка
     * @param {Function} fn
     */
    function materialsBtnsOnClick(fn) {
      const materialsBtns = document.querySelectorAll('.materials__file-open-btn');
  
      materialsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          fn(btn)
        })
      })
    }
  
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
    searchInp = document.querySelector('.search__inp');
  
    const loadmoreBtn = document.querySelector('.loadmore-btn');
  
    if (!loadmoreBtn) return;
  
    const cardList = document.querySelector('.news__list')
  
    const baseURL = window.location.origin + '/t.hunter';
    const wpRestApiURL = baseURL + '/wp-json/wp/v2';
  
    getPostsOnClick(loadmoreBtn, cardList)
  
    async function getPostsByCatId(id, offset, numberOfPosts) {
      const arguments = `/posts?categories=${id}&_embed&offset=${offset}&per_page=${numberOfPosts}`;
      const request = wpRestApiURL + arguments;
      const response = await fetch(request);
      const json = await response.json();
  
      return json
    }
  
    function getPostsOnClick(btn, parentElem) {
      let offset = 6
      let per_page = 6
  
      btn.addEventListener('click', () => {
        const id = btn.dataset.categoryId;
  
        getPostsByCatId(id, offset, per_page)
          .then(posts => {
            posts.forEach(post => {
              const link = post.link
              const images = post['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']
              const title = post.title.rendered
              const descr = post.excerpt.rendered
              const category = post['_embedded']['wp:term'][0][0]['name']
              const date = (new Date(post.date)).toLocaleDateString('ru', {day: 'numeric', month: 'numeric' ,year: '2-digit'})
  
              const cardHTML = createNewsArticlePreview(link, images, category, title, descr, date)
  
              parentElem.insertAdjacentHTML('beforeend', cardHTML)
            })
  
            offset += per_page
            setTimeout(() => lazy.refresh())
          })
          .catch(err => console.log(err))
      })
    }
  
    function createNewsArticlePreview(link, images, category, title, descr, date ) {
      const articleHtml = `
        <li class="press-centr__list-item news__list-item">
          <article class="single-card">
            <a href="${link}" class="single-card__img-wrap">
            <img src="#" alt="#"
              data-src="image-set(${images.medium.source_url} 1x, ${images.post_card_768_x2.source_url} 2x, ${images.post_card_768_x3.source_url} 3x)"
              data-media="(min-width: 767.98px) {image-set(${images.post_card_768.source_url} 1x, ${images.post_card_768_x2.source_url} 2x, ${images.post_card_768_x3.source_url} 3x)} (min-width: 1319.98px) {image-set(${images.post_768_x2.source_url} 1x, ${images.post_1440_x2.source_url} 2x)}"
              class="single-card__img lazy">
            </a>
            <span class="single-card__category">${category}</span>
            <a href="${link}" class="single-card__title-wrap">
              <strong class="single-card__title">${title}</strong>
            </a>
            <p class="single-card__descr">${descr}</p>
            <div class="single-card__bottom">
              <a href="${link}" class="single-card__link link_red">
                Читать...
              </a>
              <span class="single-card__date">${date}</span>
            </div>
          </article>
        </li>
      `;
  
      return articleHtml
    }
  
    function createMassmediaArticlePreveiew(imgSrc, title, descr, date) {
  
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
                        console.log(postTitle);
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