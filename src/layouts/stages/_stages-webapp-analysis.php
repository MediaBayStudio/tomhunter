<?php
  $iconUri = get_template_directory_uri() . '/img/stages-sect-icons/' . $post->post_name . '/';
?>

<section class="webapp-analysis-stages container">
  <h2 class="webapp-analysis-stages__title sect-title forward_slash">Как мы работаем</h2>
  <ul class="webapp-analysis-stages__list">
    <li class="webapp-analysis-stages__card card-new">
      <h3 class="card-new__title">Пассивный сбор информации</h3>

      <img src="#" data-src="<?php echo $iconUri?>icon1.svg" alt="#" class="card-new__img lazy">

      <p class="card-new__text">
        — с помощью различных методик (Reverse DNS, IP Reverse) составляем карту всех web-приложений клиентов
        <br><br>
        — из открытых источников собираем логины для проверки авторизаций
        <br><br>
        — ищем репозитории для анализа исходного кода
        <br><br>
        — формируем реестр найденных адресов web-приложений
      </p>
    </li>

    <li class="webapp-analysis-stages__card card-new">
      <h3 class="card-new__title">Активный сбор информации</h3>

      <p class="card-new__text">
        — с помощью сканеров собираем открытые директории, файлы конфигурации, поддомены компании (DNS Recon)
        <br><br>
        — составляем список применяемых технологий, определяем CMS
        <br><br>
        — проводим сканирование на предмет наличия web-приложений на нестандартных портах
      </p>

      <img src="#" data-src="<?php echo $iconUri?>icon2.svg" alt="#" class="card-new__img lazy">
    </li>

    <li class="webapp-analysis-stages__card card-new">
      <h3 class="card-new__title">Поиск<br>уязвимостей</h3>

      <p class="card-new__text">
        — запускаем сканирование веб-приложений специализированным ПО
        <br><br>
        — проводим ручной поиск и проверку найденных уязвимостей с использованием известных методик (OWASP, PTES)
        <br><br>
        — составляем реестр всех найденных уязвимостей
      </p>

      <img src="#" data-src="<?php echo $iconUri?>icon3.svg" alt="#" class="card-new__img lazy">
    </li>
  </ul>
</section>