<section class="service-sect container" id="service">
  <?php #$service_sect_title = ($page === 'index.php' || $page === 'services.php') ? 'Услуги нашей компании' : 'Другие услуги нашей компании';
    $service_sect_title = 'Другие услуги' ?>
  <h2 class="service-sect__title sect-title forward_slash"><?php echo $service_sect_title; ?></h2>
  <div class="services-block">
    <?php
      $posts = get_posts([
        'numberposts' => -1,
        'post_type'   => 'services'
      ]);

      foreach ($posts as $post) {
        $fields = get_field('service_fields');
        $link = $fields['link'];

        // if ($link === '/' . $page) {
        //   continue;
        // }

        $img = $fields['img'];

        $src = $img['url'];
        $alt = $img['alt'];
        $title = $post->post_title;
        $descr = $fields['descr'];
        if ( !$img ) {
          continue;
        }
        #<div href='$link' class='service-card card card_one-col'>
        #<span class='service-card__link btn-ol'>Подробнее</span>
        echo
        "
          <div class='service-card card card_one-col'>
            <strong class='service-card__title'>$title</strong>
            <p class='service-card__descr'>$descr</p>
            <a href='$link' class='service-card__link btn-ol' title='Перейти на страницу услуги'>Подробнее</a>
          </div>
        ";
      }
    ?>
  </div>
  <!-- <img src='#' alt='$alt' title='$alt' data-src='$src' class='service-card__img lazy'> -->
</section>