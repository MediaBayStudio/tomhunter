<?php
  $main_title = $complex_of_service_fields['title'];
?>

<section id="complex-of-service" class="complex-of-service container">
  <h2 class="complex-of-service__title sect-title forward_slash"><?php echo $main_title ?></h2>

  <ul class="complex-of-service__list">
    <?php
      foreach ( $complex_of_service_points as $point) :
        $point_title = $point['title'];
        $title_underline = $point['title_underline'] ? ' title-underline' : '';
        $point_icon = $point['icon'];
        $point_descr = $point['descr']; ?>

      <li class="complex-of-service__item complex-of-service-item">
        <?php if ( $point_icon ) : ?>
        <img src="#" data-src="<?php echo $point_icon ?>" alt="icon" class="complex-of-service-item__img lazy">
        <?php endif ?>

        <h3 class="complex-of-service-item__title<?php echo $title_underline ?>"><?php echo $point_title ?></h3>

        <?php if ( $point_descr ) : ?>
        <p class="complex-of-service-item__text"><?php echo $point_descr ?></p>
        <?php endif ?>
    </li>

      <?php endforeach ?>
  </ul>
</section>