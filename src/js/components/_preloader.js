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