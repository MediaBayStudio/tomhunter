<section class="risks-sect container">
  <h2 class="risks-sect__title sect-title forward_slash"><?php echo $risks_sect['title']; ?></h2>
  <?php

    foreach ($risks_sect['paragraphs'] as $paragraph) {
      echo "<p class='risks-sect__descr'>$paragraph[p]</p>";
    }

    if ($risks_sect['pdf']) {

      $pdf = $risks_sect['pdf'];
      $pdf_name = $pdf['title'];
      $pdf_size = round(($pdf['filesize'] / 1024 / 1024), 2);

      echo
        "<a href='$pdf[url]' rel='noopener noreferrer nofollow' target='_blank' class='pdf-link'>
          <img src='" . get_template_directory_uri() . "/img/pdf.svg' alt='$pdf_name' class='pdf-link__img'>
          <span class='pdf-link__title'>$pdf_name</span>
          <span class='pdf-link__size'>$pdf_size Мб</span>
        </a>";
    }

    $img_class = ($risks_sect['zoom']) ? ' img_zoom' : '';

    if ($risks_sect['img_320']) {

   ?>
      <figure class="risks-sect__img-wrap<?php echo $img_class; ?>">
        <img src="#" alt="#" class="risks-sect__img lazy"
          data-src="<?php echo $risks_sect[img_320] ?>"
          <?php

            if ($risks_sect['img_768']) {
              $risk_img_media .= '(min-width: 767.98px) {'.$risks_sect['img_768'].'}';
            }
            if ($risks_sect['img_1440']) {
              $risk_img_media .= '(min-width: 991.98px) {'.$risks_sect['img_1440'].'}';
            }

            if ($risk_img_media) {
              echo "data-media='$risk_img_media'";
            }

          ?>
        >
      </figure>

  <?php

    } //endif

    if ($risks_sect['blocks']) {

      echo "<div class='risks-sect__risks-block risks-block'>";

      foreach ($risks_sect['blocks'] as $block) {
        $units_class = ($block['small_units']) ? " class='units_small units'" : " class='units'";
        $units = ($block['units']) ? " <span" . $units_class . ">" . $block['units'] . "</span>" : "";
        $before = ($block['numbers_before']) ? "<span>" . $block['numbers_before'] . " </span>" : "";

        echo
        "<div class='text-block'>
          <strong class='text-block__number'>
          $before
          <span class='text-block__value' data-counter-number='$block[numbers]' data-counter-speed='1500'>$block[numbers]</span>$units</strong>
          <p class='text-block__descr'>$block[descr]</p>
        </div>";
      }

      echo "<span class='risks-block__sign'>$risks_sect[sign]</span></div>";
    }

  ?>
</section>