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