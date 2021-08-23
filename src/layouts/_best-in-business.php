<section id="best-in-business" class="best-in-business container">
  <h2 class="best-in-business__title sect-title forward_slash">
    <?php echo $best_in_business_fields['title'] ?>
  </h2>

  <ul class="best-in-business__list">
    <?php
      foreach ( $best_in_business_cards as $card) :
        $title = $card['title'];
        $icon_src = $card['icon']['url'];
        $descr = $card['descr'];?>

    <li class="best-in-business__list-item">
      <div class="header">
        <figure class="img-wrapper">
          <img src="#" data-src="<?php echo $icon_src?>" alt="#" class="lazy">
        </figure>
        <div class="title"><?php echo $title?></div>
      </div>
      <div class="descr"><?php echo $descr?></div>
    </li>
   <?php endforeach ?>
  </ul>
</section>