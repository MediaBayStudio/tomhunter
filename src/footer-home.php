<?php
  global
    $template_directory ?>

<footer class="ftr container">
    <a class="ftr__logo-link" href="<?php echo home_url(); ?>">
      <img src="#" data-src="<?php echo $template_directory . "/img/footer-logo.svg"; ?>" alt="logo" class="ftr__logo lazy">
    </a>

    <?php
    wp_nav_menu([
      'theme_location'  => 'footer_home-menu',
      'container'       => null,
      'menu_class'      => 'ftr-home__nav',
      'items_wrap'      => '<nav class="%2$s">%3$s</nav>',
      'walker' => new My_Walker_Nav_Menu
    ]);
  ?>

    <div class="ftr__contacts">
      <h3 class="ftr__sub-title"><a href="<?php echo site_url() ?>/contacts">Контакты</a></h3>

      <ul class="ftr__contacts-list">
        <li class="ftr__contacts-list-item phone">
          <span>Москва</span>
          <a href="tel:+79268158660">+7 (926) 815-86-60</a>
        </li>

        <li class="ftr__contacts-list-item phone">
          <span>Санкт-Петербург</span>
          <a href="tel:+78126409248">+7 (812) 640-92-48 </a>
        </li>

        <li class="ftr__contacts-list-item mail">
          <a href="tel:+79268158660">contact@tomhunter.ru</a>
        </li>
      </ul>

      <ul class="ftr__socials">
        <li class="ftr__socials-item ftr__socials-item_instagram">
          <a href="" target="_blank"></a>
        </li>
        <li class="ftr__socials-item ftr__socials-item_linkedin">
          <a href="" target="_blank"></a>
        </li>
        <li class="ftr__socials-item ftr__socials-item_habr">
          <a href="" target="_blank"></a>
        </li>
        <li class="ftr__socials-item ftr__socials-item_facebook">
          <a href="" target="_blank"></a>
        </li>
        <li class="ftr__socials-item ftr__socials-item_telegram">
          <a href="" target="_blank"></a>
        </li>
      </ul>
    </div>

  <div class="ftr__bottom">
    <div class="copyright-block">
      <span class="copyright-date"><?php echo date('Y'); ?></span>
      <span class="forward_slash">T. Hunter<br> — Атакующая безопасность</span>
    </div>
    <div class="dev-block">
      <span>Разработка и внедрение — </span>
      <a href="https://media-bay.ru/" rel="noopener noreferrer nofollow" target="_blank" class="dev-link">media bay</a>
    </div>
    <a href="/policy.pdf" class="privacy-policy-link">Политика конфиденциальности</a>
  </div>
</footer>

<?php
require 'layouts/_overlay.php';
require 'layouts/_thankspopup.php';
require 'layouts/_callbackpopup.php';
require 'layouts/_zoompopup.php';
require 'layouts/_materials-popup.php';
wp_footer();
?>
</body>

</html>