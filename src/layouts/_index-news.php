<?php 
$posts = get_posts( [
  'numberposts' => 3
] ) ?>
<section class="index-news-sect container">
  <h2 class="index-news-sect__title sect-title forward_slash">Новости</h2>
  <div class="index-news-sect__list"> <?php
    foreach ( $posts as $post ) :
      $post_id = $post->ID;
      $thumb_id = get_post_thumbnail_id( $post_id );
      $img_768_320 = wp_get_attachment_image_url( $thumb_id, 'post_card_768' );
      $img_768x2_320x2_1440 = wp_get_attachment_image_url( $thumb_id, 'post_card_768_x2' );
      $img_768x3_320x3_1440x2 = wp_get_attachment_image_url( $thumb_id, 'post_card_768_x3' );
      $img = [
        'post_card_320'     =>  $img_768_320,
        'post_card_320_x2'  =>  $img_768x2_320x2_1440,
        'post_card_320_x3'  =>  $img_768x3_320x3_1440x2,

        'post_card_768'     =>  $img_768_320,
        'post_card_768_x2'  =>  $img_768x2_320x2_1440,
        'post_card_768_x3'  =>  $img_768x3_320x3_1440x2,

        'post_card_1440'    =>  $img_768x2_320x2_1440,
        'post_card_1440_x2' =>  $img_768x3_320x3_1440x2
      ];
      $excerpt = kama_excerpt( [
        'maxchar'   =>  get_field( 'post_excerpt_length', $post_id ),
        'text'      =>  get_the_excerpt( $post_id ),
        'autop'     =>  false,
        'ignore_more' => true
      ] ) ?>
      <a href="<?php the_permalink( $post_id ) ?>" class="index-news-sect__li">
        <img src="#" alt="#" data-src='<?php echo "image-set($img[post_card_320] 1x, $img[post_card_320_x2] 2x, $img[post_card_320_x2] 3x)"; ?>'
          data-media='<?php echo
    "(min-width: 767.98px) {image-set($img[post_card_768] 1x, $img[post_card_768_x2] 2x, $img[post_card_768_x3] 3x)}
    (min-width: 1319.98px) {image-set($img[post_card_1440] 1x, $img[post_card_1440_x2] 2x)}" ?>' class="index-news-sect__li-img lazy">
        <span class="index-news-sect__li-title"><?php echo $post->post_title ?></span>
        <p class="index-news-sect__li-descr"><?php echo $excerpt ?></p>
        <span class="index-news-sect__li-date"><?php echo get_the_date( 'd.m.Y', $post_id ) ?></span>
      </a> <?php
    endforeach;
    wp_reset_postdata() ?>
  </div>
  <a href="<?php echo site_url() ?>/press-center/news" class="btn-ol index-news-sect__link">Все новости</a>
</section>