<section class="actual-news container">
  <h2 class="actual-news__title sect-title forward_slash">
    Актуальные новости
  </h2>

  <ul class="actual-news__list">
  <?php
global $post;
$articles = get_posts( [ 'posts_per_page' => 3, 'category'=>'news' ] );
foreach ( $articles as $post ){
  setup_postdata($post);
  ?>
     <li class="news-item">
      <a href="<?php the_permalink(); ?>" class="news-item__img-link">
         <img src="#" data-src="<?php the_post_thumbnail_url(); ?>" alt="#" class="news-item__img lazy" />
      </a>

      <h3 class="news-item__title">
        <a href=""><?php the_title(); ?></a>
      </h3>

      <p class="news-item__descr">
      <?php the_excerpt(); ?>
      </p>
      <time class="news-item__date"><?php the_date(); ?></time>
    </li>
  <?php
}
wp_reset_postdata();  ?>


    <!-- <li class="news-item">
      <a href="#" class="news-item__img-link">
        <img
          src="<?php echo $template_directory?>/img/actual-news-img-1.jpg"
          alt="#"
          class="news-item__img"
        />
      </a>

      <h3 class="news-item__title">
        <a href="">Мы получили ваше резюме</a>
      </h3>

      <p class="news-item__descr">
        В даркнете появился в продаже датасет с подробными данными о почти всех
        пользователях Линкедина. Взлома не было: продавец уверяет, что получил
        данные через API соцсети.
      </p>
      <span class="news-item__date">01.07.2021</span>
    </li>

    <li class="news-item">
      <a href="#" class="news-item__img-link">
        <img
          src="<?php echo $template_directory?>/img/actual-news-img-1.jpg"
          alt="#"
          class="news-item__img"
        />
      </a>

      <h3 class="news-item__title">
        <a href="">Мы получили ваше резюме</a>
      </h3>

      <p class="news-item__descr">
        В даркнете появился в продаже датасет с подробными данными о почти всех
        пользователях Линкедина. Взлома не было: продавец уверяет, что получил
        данные через API соцсети.
      </p>
      <span class="news-item__date">01.07.2021</span>
    </li>

    <li class="news-item">
      <a href="#" class="news-item__img-link">
        <img
          src="<?php echo $template_directory?>/img/actual-news-img-1.jpg"
          alt="#"
          class="news-item__img"
        />
      </a>

      <h3 class="news-item__title">
        <a href="">Мы получили ваше резюме</a>
      </h3>

      <p class="news-item__descr">
        В даркнете появился в продаже датасет с подробными данными о почти всех
        пользователях Линкедина. Взлома не было: продавец уверяет, что получил
        данные через API соцсети.
      </p>
      <span class="news-item__date">01.07.2021</span>
    </li> -->
  </ul>

  <a href="<?php echo home_url(); ?>/press-center" class="actual-news__link btn">Посмотреть все</a>
</section>
