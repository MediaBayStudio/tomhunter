<?php 
  $tel = get_option('contacts_tel');
  $tel_dry = preg_replace('/\s/', '', $tel);
  $address = get_option('contacts_address');
  $email = get_option('contacts_email');
 ?>
<footer class="ftr-big container">
  <?php 
    wp_nav_menu([
      'theme_location'  => 'footer_menu',
      'container'       => null,
      'menu_class'      => 'ftr-big__nav', 
      'items_wrap'      => '<nav class="%2$s">%3$s</nav>',
      'walker' => new My_Walker_Nav_Menu
    ]);
  ?>

  <a href="/" class="logo ftr-big__logo" title="На главную">
    <svg class="logo__img">
      <use xlink:href="<?php echo get_template_directory_uri() . "/img/sprite.svg#logo"; ?>"></use>
    </svg> 
  </a>

  <a href="mailto:<?php echo $email; ?>" class="ftr-big__email"><?php echo $email; ?></a>

  <a href="tel:<?php echo $tel_dry; ?>" class="ftr-big__tel"><?php echo $tel; ?></a>

  <div class="ftr-big__address">
    <span class="ftr-big__address-title">Контакты</span>
    <span class="ftr-big__address-text"><?php echo $address; ?></span>
  </div>

  <a href="/policy.pdf" class="privacy-policy-link ftr-big__pp">Политика конфиденциальности</a>

  <div class="copyright-block ftr-big__copy"><span class="copyright-date"><?php echo date('Y'); ?></span><span class="forward_slash">T. Hunter<br> — Атакующая безопасность</span></div>

  <div class="dev-block ftr-big__dev-block">
    <span>Разработка и внедрение — </span> <a href="https://media-bay.ru/" rel="noopener noreferrer nofollow" target="_blank" class="dev-link"> media bay</a>
  </div>
</footer>

<?php 
  require 'layouts/_overlay.php';
  require 'layouts/_thankspopup.php';
  require 'layouts/_callbackpopup.php';
  wp_footer();
?>
</body>
</html>