<section class="contacts-sect container">
  <div class="contacts-sect__form">
    <?php echo do_shortcode('[contact-form-7 id="90" title="Форма Пригласить специалиста" html_class="form"]'); ?>
  </div>
  <div class="contacts-block contacts-sect__email">
    <span class="contacts-block__title forward_slash">E-mail</span>
    <a href="mailto:<?php echo $email; ?>" class="contacts-block__subtitle"><?php echo $email; ?></a>
  </div>
  <div class="contacts-block contacts-sect__tel">
    <span class="contacts-block__title forward_slash">Телефон</span>
    <a href="tel:<?php echo $tel_dry; ?>" class="contacts-block__subtitle"><?php echo $tel; ?></a>
  </div>
  <div class="contacts-block contacts-sect__address">
    <span class="contacts-block__title forward_slash">Адрес</span>
    <span class="contacts-block__subtitle"><?php echo $address; ?></span>
  </div>
  <div class="contacts-sect__map" id="map"></div>
  <svg class="contacts-sect__logo">
    <use xlink:href="<?php echo get_template_directory_uri() . "/img/sprite.svg#logo-less"; ?>"></use>
  </svg>
</section>

<svg style="display:none">
  <filter id="monochrome" color-interpolation-filters="sRGB" x="0" y="0" height="100%" width="100%">
    <feColorMatrix type="matrix" values="0 1.0 0 0 0 0 1.0 0 0 0 0 0.6 1 0 0 0 0 0 1 0"/>
  </filter>
</svg>