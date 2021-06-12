<aside class="menu">
  <a href="/" class="logo">
    <svg class="logo__img">
      <use xlink:href="<?php echo get_template_directory_uri() . "/img/sprite.svg#logo"; ?>"></use>
    </svg>
  </a>
 <?php 
    wp_nav_menu([
      'theme_location'  => 'mobile_menu',
      'container'       => null,
      'menu_class'      => 'menu__nav overline', 
      'items_wrap'      => '<nav class="%2$s">%3$s</nav>',
      'walker' => new My_Walker_Nav_Menu
    ]);
  ?>
  <a href="tel:<?php echo $tel_dry; ?>" class="menu__tel"><?php echo $tel; ?></a>
  <button type="button" class="menu__request-call-btn btn-ol">Обратный звонок</button>
</aside>