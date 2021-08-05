<section class="stages-sect container">
  <h2 class="stages-sect__title sect-title forward_slash">Как мы работаем</h2>
  <div class="stages-block<?php echo $prefix; ?>">
    <?php
      foreach ($stages_cards as $card) {
        $title = $card['title'];
        $img_src = $card['img']['url'];
        $img_alt = strip_tags($title);
        $descr = $card['descr'];
        $grid = $card['grid'];
        $decor = $card['decor'];

        if ($grid == 'в одну колонку') {
          $class = ' card_one-col';
        } else if ($grid == 'в две колонки') {
          $class = ' card_two-col';
        } else {
          $class = '';
        }

        if ($decor) {
          if ($card['view'] === 'arrow') {
            $class .= ' card_arrow';
          } else {
            $class .= ' card_sign';
            $attr = ' data-sign="' . $card['sign'] . '"';
          }
        }

        $descr_tag = ($descr) ? "<p class='card__descr stage-card__descr'>$descr</p>" : '';

        echo
          "<div class='card$class stage-card'$attr>
            <img src='#' data-src='$img_src' alt='$img_alt' class='card__img lazy'>
            <strong class='card__title stage-card__title'>$title</strong>
            $descr_tag
          </div>";
      }
     ?>
  </div>
</section>