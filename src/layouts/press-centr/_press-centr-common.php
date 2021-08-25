<section class="press-centr__sect">
  <h2 class="sect-title forward_slash">Последние новости</h2>
  <ul class="press-centr__list news__list">
    <?php
      $news = get_posts([
        'category_name' => 'news',
        'numberposts' => 3
      ]); ?>

      <?php foreach ( $news as $news_item ) :
        $post = get_post($news_item->ID);
        $post_date = (new DateTime($news_item->post_date))->format('d.m.y');
        $img_768_320 = wp_get_attachment_image_url( get_post_thumbnail_id( $id ), 'post_card_768' );
        $img_768x2_320x2_1440 = wp_get_attachment_image_url( get_post_thumbnail_id( $id ), 'post_card_768_x2' );
        $img_768x3_320x3_1440x2 = wp_get_attachment_image_url( get_post_thumbnail_id( $id ), 'post_card_768_x3' );

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
        ?>

        <li class="press-centr__list-item news__list-item">
          <article class="single-card">
            <a href="<?php echo get_the_permalink($news_item->ID) ?>" class="single-card__img-wrap">
            <img
              src="#"
              alt="#"
              data-src='<?php echo "image-set($img[post_card_320] 1x, $img[post_card_320_x2] 2x, $img[post_card_320_x2] 3x)"; ?>'
              data-media='
                <?php echo "(min-width: 767.98px) {image-set($img[post_card_768] 1x, $img[post_card_768_x2] 2x, $img[post_card_768_x3] 3x)}
                            (min-width: 1319.98px) {image-set($img[post_card_1440] 1x, $img[post_card_1440_x2] 2x)}" ?>'
              class="single-card__img lazy">
            </a>
            <span class="single-card__category">Новости</span>
            <a href="<?php echo get_the_permalink($news_item->ID) ?>" class="single-card__title-wrap">
              <strong class="single-card__title"><?php echo $news_item->post_title ?></strong>
            </a>
            <p class="single-card__descr"><?php echo $news_item->post_excerpt ?></p>
            <div class="single-card__bottom">
              <a href="<?php echo get_the_permalink($news_item->ID) ?>" class="single-card__link link_red">
                Читать...
              </a>
              <span class="single-card__date"><?php echo $post_date ?></span>
            </div>
          </article>
        </li>

      <?php endforeach ?>
  </ul>
  <a href="<?php echo get_term_link( $this_cat->term_id ) ?>/news" class="btn">Все новости</a>
</section>

<section class="press-centr__sect">
  <h2 class="sect-title forward_slash">Мы в СМИ</h2>
  <ul class="press-centr__list news__list">
    <?php
      $news = get_posts([
        'category_name' => 'press-releases',
        'numberposts' => 3
      ]); ?>

      <?php foreach ( $news as $news_item ) :
        $post = get_post($news_item->ID);
        $post_date = (new DateTime($news_item->post_date))->format('d.m.y');
        $custom_term = wp_get_post_terms( $news_item->ID, 'mass_media_source' )[0];
        $icon = get_field( 'icon', $custom_term )['sizes']['large'];
        ?>

        <li class="press-centr__list-item news__list-item">
          <article class="single-card mass-media__single-card">
            <a href="<?php echo get_the_permalink($news_item->ID) ?>" class="single-card__img-wrap">
              <?php if ( $icon ) : ?>
                <img src="#" alt="#" data-src='<?php echo $icon; ?>' class="single-card__img lazy">
              <?php endif ?>
            </a>
            <span class="single-card__category">Блог</span>
            <a href="<?php echo get_the_permalink($news_item->ID) ?>" class="single-card__title-wrap">
              <strong class="single-card__title"><?php echo $news_item->post_title ?></strong>
            </a>
            <p class="single-card__descr"><?php echo $news_item->post_excerpt ?></p>
            <div class="single-card__bottom">
              <a href="<?php echo get_the_permalink($news_item->ID) ?>" class="single-card__link link_red">
                Перейти на страницу
              </a>
              <span class="single-card__date"><?php echo $post_date ?></span>
            </div>
          </article>
        </li>

      <?php endforeach ?>
  </ul>
  <a href="<?php echo get_term_link( $this_cat->term_id ) ?>/press-releases" class="btn">Все публикации</a>
</section>

<section class="press-centr__sect">
  <h2 class="sect-title forward_slash">Блог</h2>
  <ul class="press-centr__list news__list">
    <?php
      $news = get_posts([
        'category_name' => 'blog',
        'numberposts' => 3
      ]); ?>

      <?php foreach ( $news as $news_item ) :
        $post = get_post($news_item->ID);
        $post_date = (new DateTime($news_item->post_date))->format('d.m.y');
        $img_768_320 = wp_get_attachment_image_url( get_post_thumbnail_id( $id ), 'post_card_768' );
        $img_768x2_320x2_1440 = wp_get_attachment_image_url( get_post_thumbnail_id( $id ), 'post_card_768_x2' );
        $img_768x3_320x3_1440x2 = wp_get_attachment_image_url( get_post_thumbnail_id( $id ), 'post_card_768_x3' );

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
        ?>

        <li class="press-centr__list-item news__list-item">
          <article class="single-card">
            <a href="<?php echo get_the_permalink($news_item->ID) ?>" class="single-card__img-wrap">
            <img
              src="#"
              alt="#"
              data-src='<?php echo "image-set($img[post_card_320] 1x, $img[post_card_320_x2] 2x, $img[post_card_320_x2] 3x)"; ?>'
              data-media='
                <?php echo "(min-width: 767.98px) {image-set($img[post_card_768] 1x, $img[post_card_768_x2] 2x, $img[post_card_768_x3] 3x)}
                            (min-width: 1319.98px) {image-set($img[post_card_1440] 1x, $img[post_card_1440_x2] 2x)}" ?>'
              class="single-card__img lazy">
            </a>
            <span class="single-card__category">Блог</span>
            <a href="<?php echo get_the_permalink($news_item->ID) ?>" class="single-card__title-wrap">
              <strong class="single-card__title"><?php echo $news_item->post_title ?></strong>
            </a>
            <p class="single-card__descr"><?php echo $news_item->post_excerpt ?></p>
            <div class="single-card__bottom">
              <a href="<?php echo get_the_permalink($news_item->ID) ?>" class="single-card__link link_red">
                Читать...
              </a>
              <span class="single-card__date"><?php echo $post_date ?></span>
            </div>
          </article>
        </li>

      <?php endforeach ?>
  </ul>
  <a href="<?php echo get_term_link( $this_cat->term_id ) ?>/blog" class="btn">Все публикации</a>
</section>