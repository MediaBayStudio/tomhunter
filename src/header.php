<?php
  global
    $template_directory ?>
<!DOCTYPE html>
<html lang="ru-RU">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge"> <?php
  # Fonts preload
  $fonts = [
    'Lato-Bold.woff',
    'Lato-SemiBold.woff',
    'Lato-Regular.woff',
    'Lato-Light.woff',
    'SegoeUI-SemiBold.woff'
  ];
  foreach ( $fonts as $font ) : ?>

  <link rel="preload" href="<?php echo $template_directory . '/fonts/' . $font ?>" as="font" type="font/woff" crossorigin="anonymous" /> <?php
  endforeach ?>
  <link rel="apple-touch-icon" sizes="180x180" href="<?php echo $template_directory . "/apple-touch-icon.png" ?>">
  <link rel="icon" type="image/png" sizes="32x32" href="<?php echo $template_directory . "/favicon-32x32.png "?>">
  <link rel="icon" type="image/png" sizes="16x16" href="<?php echo $template_directory . "/favicon-16x16.png" ?>">
  <link rel="manifest" href="<?php echo $template_directory . "/site.webmanifest" ?>">
  <link rel="mask-icon" href="<?php echo $template_directory . "/safari-pinned-tab.svg" ?>" color="#5bbad5 ">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="theme-color" content="#ffffff"> <?php
    $page = get_page_template_slug();
    $address = get_option('contacts_address');
    $email = get_option('contacts_email');
    $coords = get_option('contacts_coords');
    $zoom = get_option('contacts_zoom');
    $tel = get_option('contacts_tel');
    $tel_dry = preg_replace('/\s/', '', $tel) ?>
  <script class="page-utils">
    const dir = "<?php echo $template_directory; ?>",
      siteurl = "<?php echo site_url() ?>",
      page = "<?php echo $page; ?>",
      mapCoords = {
        a: '<?php echo $coords; ?>'.replace(/\,.*/, ''),
        b: '<?php echo $coords; ?>'.replace(/.*\s|\,/, '')
      },
      mapZoom = <?php echo $zoom; ?>,
      mapAddress = '<?php echo $address; ?>'
  </script> <?php
  wp_head() ?>
</head>
<body class="wait no-scroll">
  <noscript>
    <!-- <noindex> -->Для полноценного использования сайта включите JavaScript в настройках вашего браузера.<!-- </noindex> -->
  </noscript>
  <!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(61547254, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/61547254" style="position:absolute; left:-9999px;" alt="#" /></div></noscript>
<!-- /Yandex.Metrika counter -->
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-144208216-3"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-144208216-3');
</script>
  <div class="preloader" style="display:flex;align-items:center;justify-content:center;position:fixed;top:0;left:0;width:100vw;height:100%;background:#2B1345;z-index:9999;">
    <div class="page-loaded-wrap" style="display:flex;flex-direction:column;align-items:center;">
      <svg class="logo__img" color="#fff">
        <use xlink:href="<?php echo $template_directory . "/img/sprite.svg#logo"; ?>"></use>
      </svg>
    </div>
  </div>
  <header class="hdr container flex">
    <a href="/" class="logo" title="На главную">
      <svg class="logo__img">
        <use xlink:href="<?php echo $template_directory . "/img/sprite.svg#logo"; ?>"></use>
      </svg>
    </a> <?php
    wp_nav_menu([
      'theme_location'  => 'header_menu',
      'container'       => null,
      'menu_class'      => 'nav',
      'items_wrap'      => '<nav class="%2$s">%3$s</nav>',
      'walker'          => new My_Walker_Nav_Menu
    ]) ?>
    <a href="tel:<?php echo $tel_dry; ?>" class="hdr__tel"><?php echo $tel; ?></a>
    <button type="button" class="hdr__callback-btn">Обратный звонок</button>
    <button type="button" class="burger">
      <svg class="burger__svg" viewBox="0 0 32 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1" height="1" class="burger__line top" x="6.40039" rx="1.28571"/>
        <rect width="1" height="1" class="burger__line middle" y="7.71429" rx="1.28571"/>
        <rect width="1" height="1" class="burger__line bottom" x="6.40039" y="15.4286" rx="1.28571"/>
      </svg>
    </button> <?php
    require 'layouts/_mobilemenu.php' ?>
  </header>