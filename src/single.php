<?php 
  $tel = get_option( 'contacts_tel' );
  $tel_dry = preg_replace( '/\s/', '', $tel );
  $address = get_option( 'contacts_address' );
  $email = get_option( 'contacts_email' );
  $coords = get_option( 'contacts_coords' );
  $zoom = get_option( 'contacts_zoom' );
  $page = get_post(0)->post_name;
  $about_sect_fields = get_field( 'about_sect' );

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
  the_post();

  function get_img( $id, $size_id ) {
    return wp_get_attachment_image_url( get_post_thumbnail_id( $id ), $size_id );
  }

  $post_id = get_the_ID();

  $post_img_320 = get_img( $post_id, 'post_card_768' ) . " 1x, " . get_img( $post_id, 'post_card_768_x2' ) . " 2x, " . get_img($post_id, 'post_card_768_x3' ) . " 3x";

  $post_img_768 = get_img( $post_id, 'post_768' ) . " 1x, " . get_img( $post_id, 'post_768_x2' ) . " 2x, " . get_img( $post_id, 'post_1440_x2' ) . " 3x";

  $post_img_1440 = get_img( $post_id, 'post_768_x2' ) . " 1x, " . get_img( $post_id, 'post_1440_x2' ) . " 2x";

?>

<article class="single-sect container">
  <h1 class="single-sect__title"><?php the_title(); ?></h1> <?php
  if ( has_excerpt( get_the_ID() ) ) : ?>
    <p class="single-sect__descr"><?php the_excerpt(); ?></p> <?php
  endif ?>
  <img src="#" alt="#" class="single-sect__img lazy"
  data-src="image-set(<?php echo $post_img_320; ?>)"
  data-media="(min-width: 767.98px) {image-set(<?php echo $post_img_768; ?>)}
              (min-width: 1319.98px) {image-set(<?php echo $post_img_1440; ?>)}">
  <div class="single-sect__content"> <?php
  the_content() ?>
    <div class="single-sect__sign">
      <span class="single-date"><?php the_date(); ?></span>
      <span class="single-category"> <?php
        $terms = get_the_terms( $post_id, 'category' );
        $categories = [];
        $is_publication = false;

        foreach ( $terms as $term ) {
          array_push( $categories, $term->name );
          // если не публикация, то не показываем комментарии
          if ( $term->slug === 'publications' ) {
            $is_publication = true;
          }
        }

        echo implode( ', ', $categories ) ?>
      </span>
    </div>
  </div>
  <div class="single-sect__subscribe">
    <span>Читайте все свежие новости первыми. Подписывайтесь на нас в Telegram</span>
    <a href="https://t.me/tomhunter" rel="noopener noreferrer nofollow" target="_blank" class="single-sect__subscribe-link btn">Подписаться
      <svg class="single-sect__subscribe-img" color="#fff">
        <use xlink:href="<?php echo get_template_directory_uri() . "/img/sprite.svg#icon-telegram" ?>"></use>
      </svg>
    </a>
  </div>
  <div class="single-sect__author"> <?php
    $author_name = get_the_author();
    $author_id = get_the_author_meta( 'ID' );
    $author_avatar = get_avatar_data( $author_id )['url'];
    $author_urls = preg_split( '/\,%20|\,\s|\,/', get_the_author_meta( 'user_url' ) );
    $author_descr = explode( ';', get_the_author_meta( 'user_description' ) );
    $author_position = array_shift( $author_descr ) ?>
    <img src="<?php echo $author_avatar ?>" alt="<?php echo $author_name ?>" title="<?php echo $author_name ?>" class="single-sect__author-img">
    <span class="single-sect__author-title"><?php echo $author_name ?></span>
    <span class="single-sect__author-position"><?php echo $author_position ?></span>
    <div class="single-sect__author-text"> <?php
      foreach ( $author_descr as $descr ) :
        $descr = trim( $descr ) ?>
        <p class="single-sect__author-descr"><?php echo $descr ?></p> <?php
      endforeach ?>
    </div>
    <div class="single-sect__author-links"> <?php
      foreach ( $author_urls as $href ) :

        if ( strpos( $href, 'habr' ) !== false ) {
          $link_icon = 'habr';
        } else if ( strpos( $href, 'telegram' ) !== false || strpos( $href, 't.me' ) !== false ) {
          $link_icon = 'telegram';
        } else if ( strpos( $href, 'mail' ) !== false ) {
          $link_icon = 'mail';
        } else {
          $link_icon = 'default';
        } ?>

        <a href="<?php echo $href ?>" rel="noopener noreferrer nofollow" target="_blank" class="single-sect__author-link">
          <svg class="single-sect__author-svg" color="#fff">
            <use xlink:href="<?php echo get_template_directory_uri() . "/img/sprite.svg#icon-{$link_icon}" ?>"></use>
          </svg>
        </a> <?php
      endforeach ?>
    </div>
  </div> <?php

  if ( $is_publication ) {
    if ( comments_open() || get_comments_number() ) {
      comments_template();
    }
  } ?>

</article> <?php
  $post_ID = get_the_ID();
  $category = get_the_category();
  $cat_list = $category[0]->cat_ID;

  $related_posts = get_posts( [
    'category' => $cat_list,
    'posts_per_page' => 3,
    'orderby' => 'rand',
    'exclude' => $post_ID
  ] );

  if ( $related_posts ) : ?>
    <div class="related-singles container"> <?php
    foreach( $related_posts as $post ) : setup_postdata($post);
      $img_320    = wp_get_attachment_image_url( get_post_thumbnail_id(), 'post_card_768' );

      $img_768_x2 = wp_get_attachment_image_url( get_post_thumbnail_id(), 'post_card_768_x2' );

      $img_768_x3 = wp_get_attachment_image_url( get_post_thumbnail_id(), 'post_card_768_x3' );

        // $excerpt       = get_the_excerpt();
        // $preview_descr = set_max_charlength( $excerpt, get_field( 'post_excerpt_length' ) );
      $excerpt = kama_excerpt( [
        'maxchar'   =>  get_field( 'post_excerpt_length', $id ),
        'autop'     =>  false,
        'ignore_more' => true
      ] );
      $preview_descr = $excerpt;
      $title         = get_the_title();
      $date          = get_the_date( 'd.m.Y' );
      $link          = get_the_permalink();
      $categories    = [];


      $terms = get_the_terms( $post, 'category' );

      foreach ( $terms as $term ) {
        array_push($categories, $term->name);
      } ?>
      <article class="single-card">
        <a href="<?php echo $link; ?>" class="single-card__img-wrap">
          <img src="#" alt="<?php echo $title; ?>"
            data-src='<?php echo "image-set($img_320 1x, $img_768_x2 2x, $img_768_x3 3x)" ?>'
            data-media="(min-width: 767.98px) {<?php echo "image-set($img_320 1x, $img_768_x2 2x, $img_768_x3 3x)" ?>}
                        (min-width: 1319.98px) {<?php echo "image-set($img_768_x2 1x, $img_768_x3 2x)" ?>}" class="single-card__img lazy">
        </a>
        <span class="single-card__category"><?php echo implode( ', ', $categories ); ?></span>
        <a href="<?php echo $link; ?>" class="single-card__title-wrap">
          <strong class="single-card__title"><?php echo $title; ?></strong>
        </a>
        <p class="single-card__descr"><?php echo $preview_descr; ?></p>
        <div class="single-card__bottom">
          <a href="<?php echo $link; ?>" class="single-card__link link_red">Читать...</a>
          <span class="single-card__date"><?php echo $date; ?></span>
        </div>
      </article> <?php
    endforeach; wp_reset_query() ?>
    </div> <?php
  endif;
  get_footer('404');