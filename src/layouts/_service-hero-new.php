<section class="service-hero container">
  <ul class="breadcrumbs-list">
    <li class="breadcrumbs-list__item">
    <a href="<?php echo home_url()?>">Услуги</a>
    </li>
    <li class="breadcrumbs-list__item"><a href="<?php echo home_url()?>/pentest">Пентест</a></li>
    <?php if ($post->ID !== 129) : ?>
      <li class="breadcrumbs-list__item breadcrumbs-list__item--current">
        <a href="<?php echo get_permalink($post->ID) ?>"><?php echo $post->post_title ?></a>
      </li>
    <?php endif ?>
  </ul>

  <h1 class="service-hero__title">Тестирование на&nbsp;проникновение</h1>
  <p class="service-hero__descr">Проводим тестирование на&nbsp;проникновение, устанавливаем существующие уязвимые места в&nbsp;информационных системах, приложениях и&nbsp;сервисах. Составим подробный план по&nbsp;устранению уязвимостей</p>
  <a href="#contact-us-new" class="service-hero__btn hero-sect__link btn">Получить консультацию</a>

  <img src="#" data-src="<?php echo get_template_directory_uri(); ?>/img/cover-service-hero-img.png" alt="#" class="service-hero__bg-img lazy">

  <div class="service-hero-inner">
    <ul class="service-hero__list">
      <?php
            $pages = get_posts([
              'numberposts' => -1,
              'meta_key'    => '_wp_page_template',
              'meta_value'  => 'service.php',
              'post_type'   => 'page',
            ]);

            foreach( $pages as $page ) :
              switch ($page->ID) :
                case 183:
                case 203:
                case 219:
                case 2328:
                case 2367:
                  $current = $post->post_title === $page->post_title ? ' active' : '' ?>

                  <li class='service-hero__list-item<?php echo $current?>'>
                    <a href="<?php the_permalink( $page ) ?>"><?php echo $page->post_title ?></a>
                  </li><?php
                  break;
                endswitch;
              endforeach?>
    </ul>
  </div>

</section>