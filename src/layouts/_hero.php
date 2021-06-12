<section class="hero-sect" id="hero">
  <img src="<?php echo get_template_directory_uri() . "/img/circle.svg"; ?>" alt="Мишень" class="hero__circle-big circle-big">
  <img src="<?php echo get_template_directory_uri() . "/img/circle.svg"; ?>" alt="Мишень" class="hero__circle-medium circle-medium">
  <img src="<?php echo get_template_directory_uri() . "/img/circle.svg"; ?>" alt="Мишень" class="hero__circle-small circle-small">
  <?php
  
    $slides = get_field('main_slider');

    for ($i = 0; $i < count($slides); $i++) {
      $slide = $slides[$i]['main_slider_slide'];
      $heading = ($i === 0) ? 'h1' : 'h2';

      $img = $slide['img'];
      $src = $img['url'];
      $alt = $img['alt'];
      $title = $slide['title'];
      $descr = $slide['descr'];
      $create_btn = $slide['btn']; // true or false
      $btn_text = $slide['btn_text'];
      $btn_href = $slide['btn_href'];

      $img_html = ($i === 0) ? "<img src='$src' alt='$alt' class='hero-sect__img'>" : "<img src='#' alt='$alt' class='hero-sect__img lazyload' data-src='$src'>";

      echo "
        <div class='hero-sect__slide container'>
            $img_html
            <$heading class='hero-sect__title'>$title</$heading>
            <p class='hero-sect__descr'>$descr</p>
          ";
      if ($create_btn) {
        echo "<a href='$btn_href' class='btn hero-sect__btn'>$btn_text</a>";
      }
      echo "</div>";
    }
  ?>
  <a href="#" class="hero-sect__arrow">
    <svg viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="darr">
      <path d="M2.30954 2.3656L11.746 11.802L21.1824 2.3656" class="darr__path"/>
    </svg>
  </a>
</section>