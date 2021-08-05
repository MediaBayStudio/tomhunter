<?php
  global
    $template_directory ?>

<footer class="ftr container">
  <div class="ftr__top">
    <img src="<?php echo $template_directory . "/img/footer-logo.svg"; ?>" alt="logo" class="ftr__logo">

    <div class="ftr__contacts">
      <h3 class="ftr__sub-title">Контакты</h3>

      <ul class="ftr__contacts-list">
        <li class="ftr__contacts-list-item ftr-icon icon_tel">
          <span>Москва</span>
          <a href="tel:+79268158660">+7 (926) 815-86-60</a>
        </li>

        <li class="ftr__contacts-list-item ftr-icon icon_tel">
          <span>Санкт-Петербург</span>
          <a href="tel:+78126409248">+7 (812) 640-92-48</a>
        </li>

        <li class="ftr__contacts-list-item ftr-icon icon_mail">
          <a href="tel:+79268158660">contact@tomhunter.ru</a>
        </li>
      </ul>

      <ul class="ftr__socials">
        <li class="ftr__socials-item icon_inst">
          <a href="" target="_blank"></a>
        </li>
        <li class="ftr__socials-item icon_linkedin">
          <a href="" target="_blank"></a>
        </li>
        <li class="ftr__socials-item icon_h">
          <a href="" target="_blank"></a>
        </li>
        <li class="ftr__socials-item icon_fb">
          <a href="" target="_blank"></a>
        </li>
        <li class="ftr__socials-item icon_tg">
          <a href="" target="_blank"></a>
        </li>
      </ul>
    </div>
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

<!-- <svg class="dev-logo">
        <use xlink:href="<?php #echo get_template_directory_uri() . "/img/sprite.svg#media-bay-logo";
                          ?>"></use>
      </svg> -->

<?php
require 'layouts/_overlay.php';
require 'layouts/_thankspopup.php';
require 'layouts/_callbackpopup.php';
require 'layouts/_zoompopup.php';
wp_footer();
?>
</body>

</html>