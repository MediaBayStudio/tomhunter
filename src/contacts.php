<?php
  /**
   * Template Name: Контакты
   */
?>

<?php get_header(); ?>

<section class="contacts-sect container">
  <ul class="breadcrumbs-list">
    <li class="breadcrumbs-list__item"><a href="<?php echo home_url()?>">Главная</a></li>
    <li class="breadcrumbs-list__item breadcrumbs-list__item--current">
      <a href="<?php echo site_url() ?>/contacts">Контакты</a>
    </li>
  </ul>

  <h2 class="contacts-sect__title sect-title forward_slash">Контакты</h2>

  <div class="contacts-sect__content">
    <ul class="contacts-sect__list">
      <li class="contacts-sect__list-item contacts-block">
        <span class="contacts-block__city">Санкт-Петербург</span>
        <a href="tel:+78126409248" class="contacts-block__contact contacts-block__contact_phone contacts-block__link">+7 (812) 640 92 48</a>
        <a href="mailto:contact@tomhunter.ru " class="contacts-block__contact contacts-block__contact_mail contacts-block__link">contact@tomhunter.ru</a>
        <a href="https://yandex.ru/maps/org/setl_center/1356616136/?ll=30.304530%2C59.849897&mode=search&sctx=ZAAAAAgAEAAaKAoSCRajxSdswkJAEZ1aiG5h6EtAEhIJAIBG1PQFcz8RAACIf2Q2Vz8oCjgAQJuSB0gBYj1yZWFycj1zY2hlbWVfTG9jYWwvR2VvL1JlYXJyYW5nZVJ1YnJpY0J5L1R5cGU9UGVuYWx0eU5vUmF0aW5nagJydXAAnQHNzEw9oAEAqAEAvQGp9%2B%2BNwgEBAOoBAPIBAPgBAIICMjE5NjI0Nywg0JvQtdC90LjQvdGB0LrQuNC5INC%2F0YAt0YIsIDE1MyDQu9C40YIuINCQigIA&sll=30.302950%2C59.849967&sspn=0.015195%2C0.004142&text=196247%2C%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D1%80-%D1%82%2C%20153%20%D0%BB%D0%B8%D1%82.%20%D0%90&z=18.07" target="_blank" class="contacts-block__contact contacts-block__contact_location contacts-block__link">
          196247, Ленинский пр-т, 153 лит. А,<br>
          БЦ «SetlCenter», офис 637</a>
      </li>

      <li class="contacts-sect__list-item contacts-block">
        <span class="contacts-block__city">Москва</span>
        <span class="contacts-block__contact contacts-block__contact_phone">
          <a href="tel:+78126409248" class="contacts-block__link">+7 (926) 815 86 60 </a>
          <a href="tel:+79811817777 " class="contacts-block__link">+7 (981) 181 77 77 </a>
        </span>
        <a href="mailto:contact@tomhunter.ru " class="contacts-block__contact contacts-block__contact_mail contacts-block__link">contact@tomhunter.ru</a>
        <a href="https://yandex.ru/maps/213/moscow/house/ulitsa_kosmonavta_volkova_12/Z04YcwZoSkUOQFtvfXRwdHlgbQ==/?ll=37.518926%2C55.815473&mode=search&sctx=ZAAAAAgAEAAaKAoSCRR5knTNUD5AEfTF3osv%2BE1AEhIJAAAAAICN7z8RgCcvE78n0T8oCjgAQAJIAWI9cmVhcnI9c2NoZW1lX0xvY2FsL0dlby9SZWFycmFuZ2VSdWJyaWNCeS9UeXBlPVBlbmFsdHlOb1JhdGluZ2oCcnVwAJ0BzcxMPaABAKgBAL0Bl8o9AsIBAQDqAQDyAQD4AQCCAk4xMjcyOTksINGD0LsuINCa0L7RgdC80L7QvdCw0LLRgtCwINCS0L7Qu9C60L7QstCwIDEyLOKAqNC%2F0L7QvNC10YnQtdC90LjQtSAyMDWKAgA%3D&sll=37.518309%2C55.815540&sspn=0.015195%2C0.004635&text=127299%2C%20%D1%83%D0%BB.%20%D0%9A%D0%BE%D1%81%D0%BC%D0%BE%D0%BD%D0%B0%D0%B2%D1%82%D0%B0%20%D0%92%D0%BE%D0%BB%D0%BA%D0%BE%D0%B2%D0%B0%2012%2C%E2%80%A8%D0%BF%D0%BE%D0%BC%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D0%B5%20205&z=18.73" target="_blank" class="contacts-block__contact contacts-block__contact_location contacts-block__link">
          127299, ул. Космонавта Волкова 12,<br>
          помещение 205
        </a>
      </li>
    </ul>

    <div class="contacts-sect__map"></div>
  </div>

</section>

<?php require 'layouts/_contact-us-new.php'; ?>

<?php get_footer('home'); ?>