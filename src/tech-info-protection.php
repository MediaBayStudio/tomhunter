<?php
  /**
   * Template Name: Тех. защита информации
   */
?>

<?php get_header(); ?>

<?php
require 'layouts/single_service/_single_service-hero.php';

$descr_sect_fields = get_field('descr_sect');
$descr_sect = [
  'title'       => $descr_sect_fields['sect_title'],
  'paragraphs'  => $descr_sect_fields['p_repeater'],
  'list_title'  => $descr_sect_fields['list_title'],
  'list_items'  => $descr_sect_fields['list_repeater'],
  'img_src'     => $descr_sect_fields['img']['url']
];
require 'layouts/_descr.php';
?>

<section class="descr-sect container">
  <h2 class="descr-sect__title sect-title forward_slash">
    Защита информации от утечки по техническим и информационным каналам
  </h2>
  <p class='descr-sect__descr'>
    Злоумышленник может получить интересующие его сведения, не имея прямого доступа к информационной системе, а лишь воспользоваться каналами утечки информации. К основным таким каналам относятся:<br>
    — 	побочное электромагнитное излучение и наводки (ПЭМИН)<br>
    — 	акустические и виброакустические каналы<br>
    — 	визуально-оптические каналы<br>
    — 	каналы коммутируемых линий связи<br>
    — 	каналы выделенных линий связи<br>
    — 	каналы локальной сети
  </p>
  <p class='descr-sect__descr'>
    В процессе оказания услуги решаются следующие задачи:<br>
    — 	поиск и выявление технических каналов утечки информации и средств негласного съёма информации<br>
    — 	внедрение средств защиты информации от утечек по техническим каналам<br>
    — 	подготовка рекомендаций по противодействию промышленному шпионаж
  </p>
</section>

<section class="descr-sect container">
  <h2 class="descr-sect__title sect-title forward_slash">
    Защита информации от утечки по техническим и информационным каналам
  </h2>
  <p class='descr-sect__descr'>
    Злоумышленник может получить интересующие его сведения, не имея прямого доступа к информационной системе, а лишь воспользоваться каналами утечки информации. К основным таким каналам относятся:<br>
    — 	побочное электромагнитное излучение и наводки (ПЭМИН)<br>
    — 	акустические и виброакустические каналы<br>
    — 	визуально-оптические каналы<br>
    — 	каналы коммутируемых линий связи<br>
    — 	каналы выделенных линий связи<br>
    — 	каналы локальной сети
  </p>
  <p class='descr-sect__descr'>
    В процессе оказания услуги решаются следующие задачи:<br>
    — 	поиск и выявление технических каналов утечки информации и средств негласного съёма информации<br>
    — 	внедрение средств защиты информации от утечек по техническим каналам<br>
    — 	подготовка рекомендаций по противодействию промышленному шпионаж
  </p>
</section>

<section class="descr-sect container">
  <h2 class="descr-sect__title sect-title forward_slash swap-title-on-mobile">
    Защита от несанкционированного доступа
  </h2>
  <p class='descr-sect__descr'>
    Потенциальным источником угрозы может являться как внешний, так и внутренний нарушитель. По этой причине необходимо сформировать набор правил, далее в соответствии с ними разграничить доступ к информации и установить средства защиты от несанкционированного доступа.
  </p>
  <p class='descr-sect__descr'>
    В ходе выполнения работ по данному направлению реализуются следующие действия:<br>
    — 	проводим первичные проверку системы на наличие уязвимостей<br>
    — 	разрабатываем модели разграничения прав доступа<br>
    — 	устанавливаем и настраиваем программные и программно-аппаратные средства защиты информации<br>
    — 	проводим анализ полученных результатов
  </p>
</section>

<?php
$complex_of_service_fields = get_field('complex_of_service');
$complex_of_service_points = $complex_of_service_fields['points'];
require 'layouts/_complex-of-service-sect.php';

$work_result_fields = get_field('work_result');
$work_res = [
  'title' => $work_result_fields['sect_title'],
  'descr' => $work_result_fields['descr']
];
require 'layouts/_work-result.php';
?>

<section id="engineering-descr" class="descr-sect container">
  <h2 class="descr-sect__title sect-title forward_slash">
    Инженерно-техническая защита объектов
  </h2>
  <p class='descr-sect__descr'>
    T.Hunter реализует защиту объектов с помощью технических систем безопасности и средств физической защиты. В состав технических системы безопасности объекта входит: система контроля и управления доступом, система охранной сигнализации, система видеонаблюдения и т.д.
  </p>
  <p class='descr-sect__descr'>
    Задачи, решаемые в области технических систем безопасности:<br>
    — 	комплексный аудит безопасности объектов, предоставление рекомендаций по устранению и минимизации выявленных рисков<br>
    — 	проектирование технических систем безопасности<br>
    — 	оказание комплексных услуг по созданию технических систем безопасности объектов<br>
    — 	техническое сопровождение систем безопасности объектов
  </p>
</section>

<?php $iconsURI = get_template_directory_uri() . '/img/tech-info-protect-icons/'; ?>

<section class="tech-info-protection-stages container">
  <h2 class="tech-info-protection-stages__title sect-title forward_slash">этапы работ</h2>
  <ul class="tech-info-protection-stages__list">
    <li class="tech-info-protection-stages__card card-new">
      <h3 class="card-new__title">Обследование объекта</h3>

      <img src="#" data-src="<?php echo $iconsURI ?>stage-icon1.svg" alt="icon" class="card-new__img lazy">
    </li>

    <li class="tech-info-protection-stages__card card-new">
      <h3 class="card-new__title">Аудит и анализ защищённости</h3>

      <img src="#" data-src="<?php echo $iconsURI ?>stage-icon2.svg" alt="icon" class="card-new__img lazy">
    </li>

    <li class="tech-info-protection-stages__card card-new">
      <h3 class="card-new__title">Проектирование</h3>

      <img src="#" data-src="<?php echo $iconsURI ?>stage-icon3.svg" alt="icon" class="card-new__img lazy">
    </li>

    <li class="tech-info-protection-stages__card card-new">
      <h3 class="card-new__title">Внедрение решения</h3>

      <img src="#" data-src="<?php echo $iconsURI ?>stage-icon4.svg" alt="icon" class="card-new__img lazy">
    </li>

    <li class="tech-info-protection-stages__card card-new">
      <h3 class="card-new__title">Сопровождение и поддержка</h3>

      <img src="#" data-src="<?php echo $iconsURI ?>stage-icon5.svg" alt="icon" class="card-new__img lazy">
    </li>
  </ul>
</section>

<section class="work-result container">
  <h2 class="work-result__title sect-title forward_slash">Результат работ</h2>
    <p class="work-result__descr">
      — сокращение рисков, связанных со случайным или непреднамеренным распространением конфиденциальной информации<br>
      — 	эффективная система защиты объектов и устойчивость функционирования ИТ&#8209;инфраструктуры<br>
      — 	обеспечение режима правового и юридически защищённого использования информационных активов<br>
      — 	чёткое понимание типов хранимых и обрабатываемых данных, вопросов их размещения и разграничения доступа к информации, защиту документов при их использовании <br>
      — 	разработанная основа для построения системы автоматизации процессов управления ИБ
    </p>
    <img src="#" data-src="<?php echo get_template_directory_uri() ?>/img/customer-gets-img.svg" alt="#" class="work-result__img lazy"/>
</section>

<?php
$best_in_business_fields = get_field('best_in_business');
$best_in_business_cards = $best_in_business_fields['cards'];
require 'layouts/_best-in-business.php';

require 'layouts/single_service/_materials.php';
require 'layouts/_service.php';
require 'layouts/_actual-news.php';
require 'layouts/_contact-us-new.php';
?>

<?php get_footer('home'); ?>