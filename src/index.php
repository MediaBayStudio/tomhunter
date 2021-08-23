<?php
/*
  Template Name: Главная
*/

  $tel = get_option('contacts_tel');
  $tel_dry = preg_replace('/\s/', '', $tel);
  $address = get_option('contacts_address');
  $email = get_option('contacts_email');
  $coords = get_option('contacts_coords');
  $zoom = get_option('contacts_zoom');
  $about_sect_fields = get_field('about_sect');
  $page = get_page_template_slug();
  get_header();
  require 'layouts/_hero-new.php';
  // require 'layouts/_service.php';
  require 'layouts/_index-services.php';
  require 'layouts/_index-about.php';
  require 'layouts/_cybersecurity-sect.php';
  require 'layouts/_index-facts.php';
  require 'layouts/_actual-news.php';
  require 'layouts/_index-clients.php' ?>

<!-- <section class="statistics-sect container sect_purple">
  <h2 class="statistics-sect__title sect-title forward_slash">Статистика защищенности компаний в россии</h2>
  <p class="statistics-sect__descr">Критические уязвимости в сети компании могут стать причиной полной компрометации её информационной системы. Находить все слабые места и оценивать применяемые средства защиты — наша основная специализация.</p>
  <div class="statistics-sect__slider">
    <img src="#" alt="#"
         data-src="<?php #echo $template_directory . '/img/statistics-slide-1.svg'; ?>"
         data-media="(min-width: 767.98px) {<?php #echo $template_directory . '/img/statistics-slide-1.768.svg'; ?>}
                     (min-width: 992.98px) {<?php #echo $template_directory . '/img/statistics-slide-1.992.svg'; ?>}" class="statistics-sect__slide lazy">
    <img src="#" alt="#"
         data-src="<?php #echo $template_directory . '/img/statistics-slide-2.svg'; ?>"
         data-media="(min-width: 767.98px) {<?php #echo $template_directory . '/img/statistics-slide-2.768.svg'; ?>}
                     (min-width: 992.98px) {<?php #echo $template_directory . '/img/statistics-slide-2.992.svg'; ?>}" class="statistics-sect__slide lazy">
  </div>
</section> -->

<?php

  #require 'layouts/_trust.php';
  #require 'layouts/_invite.php';
?>

<!-- <section class="about-sect container sect_purple">
  <img src="<?php #echo $template_directory . "/img/circle.svg"; ?>" alt="Мишень" class="about__circle-medium circle-medium">
  <img src="<?php #echo $template_directory . "/img/circle.svg"; ?>" alt="Мишень" class="about__circle-small circle-small">
  <h2 class="about-sect__title sect-title forward_slash">О нашей компании</h2>
  <?php

    #print_paragraphs($about_sect_fields, 'about-sect__descr');
    #$features = $about_sect_fields['features_repeater'];
  ?>
  <div class="features-block">
    <strong class="features-block__title underline">Наши преимущества:</strong>
    <ul class="features-list">
      <?php
        #foreach ($features as $feature) {
          // echo "<li class='features-list__item forward_slash'>
          //         <em class='features-list__text'>$feature[feature]</em>
          //       </li>";
        }
       ?>
    </ul>
  </div>
  <svg class="about-sect__logo">
    <use xlink:href="<?php #echo $template_directory . "/img/sprite.svg#logo"; ?>"></use>
  </svg>
</section>

<section class="stages-sect container">
  <h2 class="stages-sect__title sect-title forward_slash">Порядок <span class="txt_red">проведения работ</span></h2>
  <div class="stages-block">
    <div class="card card_one-col stage-card">
      <img src="#" data-src="<?php #echo $template_directory . '/img/index-stage-1.svg' ?>" alt="Знакомство с клиентом" class="card__img lazy">
      <strong class="card__title stage-card__title">Знакомство с клиентом</strong>
    </div>
    <div class="card card_one-col stage-card">
      <img src="#" data-src="<?php #echo $template_directory . '/img/index-stage-2.svg' ?>" alt="Определение фронта работ" class="card__img lazy">
      <strong class="card__title stage-card__title">Определение фронта работ</strong>
    </div>
    <div class="card card_one-col stage-card">
      <img src="#" data-src="<?php #echo $template_directory . '/img/index-stage-3.svg' ?>" alt="Заключение договора" class="card__img lazy">
      <strong class="card__title stage-card__title">Заключение договора</strong>
    </div>
    <div class="card card_one-col stage-card">
      <img src="#" data-src="<?php #echo $template_directory . '/img/index-stage-4.svg' ?>" alt="Выявление уязвимостей" class="card__img lazy">
      <strong class="card__title stage-card__title">Выявление уязвимостей</strong>
    </div>
    <div class="card card_one-col stage-card">
      <img src="#" data-src="<?php #echo $template_directory . '/img/index-stage-5.svg' ?>" alt="Отчеты и рекомендации" class="card__img lazy">
      <strong class="card__title stage-card__title">Отчеты и рекомендации</strong>
    </div>
    <div class="card card_one-col stage-card">
      <img src="#" data-src="<?php #echo $template_directory . '/img/index-stage-6.svg' ?>" alt="Дополнительное консультирование" class="card__img lazy">
      <strong class="card__title stage-card__title">Дополнительное консультирование</strong>
    </div>
  </div>
</section> -->

<?php
  require 'layouts/_contact-us-new.php';
  get_footer('home');
 ?>