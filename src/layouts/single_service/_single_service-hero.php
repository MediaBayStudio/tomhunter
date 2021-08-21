<section class="service-hero container">
  <ul class="breadcrumbs-list">
    <li class="breadcrumbs-list__item">Услуги</li>
    <li class="breadcrumbs-list__item">Пентест</li>
    <li class="breadcrumbs-list__item breadcrumbs-list__item--current">Пентест внешнего периметра</li>
  </ul>

  <?php
  $header_fields = get_field('single_service_header');
  $title = $header_fields['title'];
  $descr = $header_fields['descr'];
  $imgURL = $header_fields['img']['url'];
  $links = $header_fields['links'];
  ?>

  <h1 class="service-hero__title"><?php echo $title ?></h1>
  <p class="service-hero__descr"><?php echo $descr ?></p>
  <a href="#callback" class="service-hero__btn hero-sect__link btn">Получить консультацию</a>

  <img src="#" data-src="<?php echo $imgURL ?>" alt="#" class="service-hero__bg-img
  service-hero-single__bg-img lazy">

  <div class="service-hero-inner">
    <ul class="service-hero__list">
      <?php foreach ( $links as $link ) : ?>
      <li class='service-hero__list-item<?php echo $current ?>'>
        <a href="<?php echo $link['link'] ?>"><?php echo $link['name'] ?></a>
      </li>
      <?php endforeach ?>
    </ul>
  </div>

</section>