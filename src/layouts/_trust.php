<?php $style = ($trust_bg_color) ? ' style="background-color:' . $trust_bg_color . '"' : '' ?>
<section class="trust-sect container"<?php echo $style; ?>>
  <h2 class="trust-sect__title sect-title forward_slash"><span class="txt_red">T.Hunter</span> доверяют</h2>
  <div class="features-block">
    <div class="feature-card card">
      <img src="#" data-src="<?php echo get_template_directory_uri() . "/img/trust-icon-1.svg"; ?>" alt="Глубокий анализ" class="feature-card__img lazy">
      <strong class="feature-card__title">Глубокий анализ</strong>
      <p class="feature-card__descr">Комплексный подход позволяет тестировать безопасность предприятия на всех участках.</p>
    </div>
    <div class="feature-card card">
      <img src="#" data-src="<?php echo get_template_directory_uri() . "/img/trust-icon-2.svg"; ?>" alt="Подробные отчеты" class="feature-card__img lazy">
      <strong class="feature-card__title">Подробные отчеты</strong>
      <p class="feature-card__descr">В детальный отчет о проверке безопасности входит описание каждой обнаруженной проблемы.</p>
    </div>
    <div class="feature-card card">
      <img src="#" data-src="<?php echo get_template_directory_uri() . "/img/trust-icon-3.svg"; ?>" alt="Конфиденциальность данных" class="feature-card__img lazy">
      <strong class="feature-card__title">Конфиденциальность данных</strong>
      <p class="feature-card__descr">Вся информация по результатам проверки сохраняется в строгой конфиденциальности.</p>
    </div>
    <div class="feature-card card">
      <img src="#" data-src="<?php echo get_template_directory_uri() . "/img/trust-icon-4.svg"; ?>" alt="Обучающая программа" class="feature-card__img lazy">
      <strong class="feature-card__title">Обучающая программа</strong>
      <p class="feature-card__descr">Мы разрабатываем собственные упражнения по типу уязвимостей, характерных для ресурсов клиентов.</p>
    </div>
  </div>
</section>