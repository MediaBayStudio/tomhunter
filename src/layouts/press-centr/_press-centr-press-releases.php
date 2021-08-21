<section class="press-centr__sect mass-media-sect">
  <h2 class="sect-title forward_slash">Мы в СМИ</h2>
  <ul class="last-news__list news__list">
    <?php
      $news = get_posts([
        'category_name' => 'press-releases',
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

        $icon = get_field('icon', wp_get_post_tags($news_item->ID)[0]);
        var_dump($icon);
        ?>

        <li class="press-centr__list-item">
          <article class="single-card mass-media__single-card">
            <a href="<?php echo $news_item->guid ?>" class="single-card__img-wrap">
            <img
              src="#"
              alt="#"
              data-src='<?php echo "image-set($img[post_card_320] 1x, $img[post_card_320_x2] 2x, $img[post_card_320_x2] 3x)"; ?>'
              data-media='
                <?php echo "(min-width: 767.98px) {
                              image-set($img[post_card_768] 1x,
                                        $img[post_card_768_x2] 2x,
                                        $img[post_card_768_x3] 3x)}
                            (min-width: 1319.98px) {
                              image-set($img[post_card_1440] 1x,
                                        $img[post_card_1440_x2] 2x)}" ?>'
              class="single-card__img lazy">
            </a>
            <span class="single-card__category">Мы в СМИ</span>
            <a href="<?php echo $news_item->guid ?>" class="single-card__title-wrap">
              <strong class="single-card__title"><?php echo $news_item->post_title ?></strong>
            </a>
            <p class="single-card__descr"><?php echo $news_item->post_excerpt ?></p>
            <div class="single-card__bottom">
              <a href="<?php echo $news_item->guid ?>" class="single-card__link link_red">
                Перейти на страницу
              </a>
              <span class="single-card__date"><?php echo $post_date ?></span>
            </div>
          </article>
        </li>

      <?php endforeach ?>
  </ul>
  <button class="btn" data-category-id="25">Показать ещё</button>
</section>