<section class="actual-news container">
  <h2 class="actual-news__title sect-title forward_slash">Новости</h2>

  <ul class="actual-news__list">
  <?php
    global $post;
    $articles = get_posts( [ 'posts_per_page' => 3, 'category'=>'news' ] );
    foreach ( $articles as $post ){
      setup_postdata($post);
      $link = get_the_permalink();
  ?>
     <li class="news-item">
      <a href="<?php echo $link ?>" class="news-item__img-link">
         <img src="#" data-src="<?php the_post_thumbnail_url(); ?>" alt="#" class="news-item__img lazy" />
      </a>

      <a href="<?php echo $link ?>">
        <h3 class="news-item__title"><?php the_title(); ?></h3>
      </a>


      <p class="news-item__descr">
      <?php the_excerpt(); ?>
      </p>
      <time class="news-item__date"><?php the_date(); ?></time>
    </li>
  <?php
  }
  wp_reset_postdata();  ?>
  </ul>

  <a href="<?php echo home_url(); ?>/press-center" class="actual-news__link btn">Посмотреть все</a>
</section>
