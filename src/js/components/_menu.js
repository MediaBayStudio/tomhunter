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