<?php 
  $tel = get_option('contacts_tel');
  $tel_dry = preg_replace('/\s/', '', $tel);
  $address = get_option('contacts_address');
  $email = get_option('contacts_email');
  $coords = get_option('contacts_coords');
  $zoom = get_option('contacts_zoom');
  $about_sect_fields = get_field('about_sect');
  get_header();
?>

<section class="hero container">
  <img src="<?php echo get_template_directory_uri() . '/img/404-hero-img.svg'; ?>" alt="404" class="hero__img">
  <h1 class="hero__title">Страница не найдена</h1>
  <p class="hero__descr">Похоже, вы потерялись. Такой страницы у нас нет.</p>
  <a href="/" class="hero__link btn">На главную страницу</a>
</section>

<?php
  get_footer('404');