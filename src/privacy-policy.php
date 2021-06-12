<?php

  /*
    Template Name: Политика конфиденциальности
  */

  get_header();

?>

<div class="policy">
  <object data="<?php echo get_template_directory_uri() . '/policy.pdf' ?>" type="application/pdf" id="policy__pdf">
    <span class="container">Невозможно загрузить встраеваемый объект. <br> Вы можете посмотреть политику конфиденциальности, перейдя по <a href="<?php echo get_template_directory_uri() . '/policy.pdf' ?>">ссылке</a>.</span>
  </object>
</div>

<?php

  get_footer();