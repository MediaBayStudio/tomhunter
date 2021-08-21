<section class="service-sect container" id="service">
  <?php #$service_sect_title = ($page === 'index.php' || $page === 'services.php') ? 'Услуги нашей компании' : 'Другие услуги нашей компании';
    $service_sect_title = 'Другие услуги' ?>
  <h2 class="service-sect__title sect-title forward_slash"><?php echo $service_sect_title; ?></h2>
  <div class="services-block">
    <?php
      $args = [
        'numberposts' => -1,
        'post_type'   => 'services',
        'include' => '2074, 2072, 2440, 2439, 2438, 2441',// ID постов не пентестов
      ];

      switch ($post->ID) {
        case 183:
        case 203:
        case 219:
        case 2328:
        case 2367:
         $args['include'] = '64, 63, 11, 2443, 2442';
         break;
      };

      $posts = get_posts( $args );
      $postLink = get_the_permalink( $post->ID );

      foreach ($posts as $post) {
        $fields = get_field('service_fields');
        $link = $fields['link'];

        if ( $postLink == $link) {
          continue;
        }

        $img = $fields['img'];

        $src = $img['url'];
        $alt = $img['alt'];
        $title = $post->post_title;
        $descr = $fields['descr'];
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
</section>