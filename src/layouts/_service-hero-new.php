<section class="service-hero container">
  <ul class="breadcrumbs-list">
    <li class="breadcrumbs-list__item">Услуги</li>
    <li class="breadcrumbs-list__item">Пентест</li>
    <li class="breadcrumbs-list__item breadcrumbs-list__item--current">Пентест внешнего периметра</li>
  </ul>

  <h1 class="service-hero__title">Тестирование на&nbsp;проникновение</h1>
  <p class="service-hero__descr">Проводим тестирование на&nbsp;проникновение, устанавливаем существующие уязвимые места в&nbsp;информационных системах, приложениях и&nbsp;сервисах. Составим подробный план по&nbsp;устранению уязвимостей</p>
  <a href="#callback" class="service-hero__btn hero-sect__link btn">Получить консультацию</a>

  <div class="service-hero-inner">
    <ul class="service-hero__list">
      <?php
            // параметры по умолчанию
            $pages = get_posts([
              'numberposts' => -1,
              'meta_key'    => '_wp_page_template',
              'meta_value'  => 'service.php',
              'post_type'   => 'page',
            ]);

            // var_dump($posts[0]->post_title);

            foreach( $pages as $page ) :
              $current = $post->post_title === $page->post_title ? ' active' : '' ?>


              <li class='service-hero__list-item<?php echo $current?>'>
                <a href="<?php the_permalink( $page ) ?>"><?php echo $page->post_title ?></a>
              </li><?php
              endforeach?>
    </ul>
  </div>

</section>