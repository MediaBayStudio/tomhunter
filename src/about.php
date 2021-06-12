<?php 
/*
  Template Name: О компании
*/
  $tel = get_option('contacts_tel');
  $tel_dry = preg_replace('/\s/', '', $tel);
  $address = get_option('contacts_address');
  $email = get_option('contacts_email');
  $coords = get_option('contacts_coords');
  $zoom = get_option('contacts_zoom');
  $page = get_post(0)->post_name;
  $about_sect_fields = get_field('about_hero_sect_fields');

  $about_hero_sect_img = $about_sect_fields['img']['url'];

  get_header();

  the_breadcrumb([
    'container_start'     => '<div class="breadcrumbs container">',
    'container_end'       => '</div>',
    // 'links_before'        => '<ul class="breadcrumbs__list">',
    // 'links_after'         => '</ul>',
    // 'link_before'         => '<li class="breadcrumbs__list-item">',
    // 'link_after'          => '</li>',
    'link_class'          => 'breadcrumbs__link',
    'current_link_class'  => 'current',
    'after_links'         => ''
  ]);
  
?>

<section class="about-hero-sect container lazy" data-src="url(<?php echo $about_hero_sect_img; ?>)">
  <h1 class="about-hero-sect__title"><?php echo $about_sect_fields['title']; ?></h1>
  <?php
    print_paragraphs($about_sect_fields, 'about-hero-sect__descr');
  ?>
  <img src="#" data-src="<?php echo get_template_directory_uri() . '/img/logo-less.svg' ?>" alt="Логотип Tom Hunter" class="about-hero-sect__logo lazy">
</section>

<?php
  require 'layouts/_service.php';

  $trust_bg_color = '#F8F8F8';

  require 'layouts/_trust.php';
  require 'layouts/_contacts.php';
  get_footer('home');
?>