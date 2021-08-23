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