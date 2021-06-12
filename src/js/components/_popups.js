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