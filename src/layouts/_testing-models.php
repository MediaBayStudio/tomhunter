<section class="testing-models container">
  <h2 class="testing-models__title sect-title forward_slash">Модели тестирования</h2>

  <ul class="testing-models__list">
    <li class="testing-models__card card-new">
      <h3 class="card-new__title">BlackBox</h3>

      <img src="#" data-src="<?php echo get_template_directory_uri()?>/img/testing-models-icons/icon-1.svg" alt="#" class="card-new__img lazy">

      <p class="card-new__text">
        BlackBox — «чёрный ящик». Специалисты располагают только общедоступной информацией о цели исследования, сети и параметрах. Данный вариант максимально приближён к реальной ситуации.
        <br><br>
        В качестве исходных данных для тестирования исполнителю сообщается только имя компании или её сайт, а всю остальную информацию, такую как используемые компанией IP-адреса, сайты, точки выхода офисов и филиалов компании в сеть Интернет, исполнителю придётся выяснять самому.
      </p>
    </li>

    <li class="testing-models__card card-new">
      <h3 class="card-new__title">WhiteBox</h3>

      <img src="#" data-src="<?php echo get_template_directory_uri()?>/img/testing-models-icons/icon-2.svg" alt="#" class="card-new__img lazy">

      <p class="card-new__text">
        WhiteBox – полная противоположность BlackBox. В данном случае специалистам предоставляется максимум необходимой для него информации вплоть до административного доступа на любые сервера. Этот способ позволяет получить наиболее полное исследование уязвимости объекта.
        <br><br>
        При WhiteBox исполнителю не придётся тратить время на сбор информации, составление карты сети и другие действия перед началом тестирования, а также сократит время самого тестирования, так как часть проверок просто не придётся делать. Минус данного метода состоит в том, что это менее приближено к ситуации реальной атаки злоумышленника.
      </p>
    </li>

    <li class="testing-models__card card-new">
      <h3 class="card-new__title">GrayBox</h3>

      <img src="#" data-src="<?php echo get_template_directory_uri()?>/img/testing-models-icons/icon-3.svg" alt="#" class="card-new__img lazy">

      <p class="card-new__text">
        GrayBox – это средний вариант между WhiteBox и BlackBox, когда исполнитель действует по варианту BlackBox и периодически запрашивает информацию о тестируемой системе для того, чтобы сократить время исследования или более эффективно приложить свои усилия.
        <br><br>
        Такой вариант самый популярный, так как позволяет провести тестирование без трат лишнего времени на сбор информации и больше времени уделить поиску уязвимостей. При этом данный вариант остаётся достаточно близким к реальной ситуации действия злоумышленника.
      </p>
    </li>
  </ul>
</section>