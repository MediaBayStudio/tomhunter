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
</section>

<?php
  require 'layouts/about/_certificates.php';

  $complex_of_service_fields = get_field('complex_of_service');
  $complex_of_service_points = $complex_of_service_fields['points'];

  if ( $complex_of_service_points ) {
    require 'layouts/_complex-of-service-sect.php';
  };

  require 'layouts/_index-facts.php';


  require 'layouts/_actual-news.php';
  require 'layouts/_contact-us-new.php';
  get_footer('home');
?>