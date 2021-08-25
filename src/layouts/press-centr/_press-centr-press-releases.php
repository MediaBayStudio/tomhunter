<section class="press-centr__sect mass-media-sect">
  <h1 class="sect-title forward_slash">Мы в СМИ</h1>
  <ul class="news__list">
    <?php
      $news = get_posts([
        'category_name' => 'press-releases',
        'numberposts' => 6
      ]); ?>

      <?php foreach ( $news as $news_item ) :
        $post = get_post($news_item->ID);
        $post_date = (new DateTime($news_item->post_date))->format('d.m.y');
        $custom_term = wp_get_post_terms( $news_item->ID, 'mass_media_source' )[0];
        $icon = get_field( 'icon', $custom_term )['sizes']['large'];
        ?>

        <li class="news__list-item">
          <article class="single-card mass-media__single-card">
            <a href="<?php echo get_the_permalink($news_item->ID) ?>" class="single-card__img-wrap">
              <?php if ( $icon ) : ?>
                <img src="#" alt="#" data-src='<?php echo $icon; ?>' class="single-card__img lazy">
              <?php endif ?>
            </a>
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
  <button class="btn loadmore-btn" data-category-id="25">Показать ещё</button>
</section>