<footer class="ftr container">
  <div class="copyright-block"><span class="copyright-date"><?php echo date('Y'); ?></span><span class="forward_slash">T. Hunter<br> — Атакующая безопасность</span></div>
  <div class="dev-block"><span>Разработка и внедрение — </span><a href="https://media-bay.ru/" rel="noopener noreferrer nofollow" target="_blank" class="dev-link">media bay</a>
  </div>
  <a href="/policy.pdf" class="privacy-policy-link">Политика конфиденциальности</a>
</footer>

<!-- <svg class="dev-logo">
        <use xlink:href="<?php #echo get_template_directory_uri() . "/img/sprite.svg#media-bay-logo"; ?>"></use>
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