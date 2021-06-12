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