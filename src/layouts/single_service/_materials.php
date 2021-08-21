<?php
  $files = get_field('materials');
?>
<section id="materials" class="materials container">
  <h2 class="materials__title sect-title forward_slash">Материалы</h2>

  <ul class="materials__list">
    <?php foreach ( $files as $file ) : ?>
      <li class="materials__file">
        <button class="materials__file-open-btn" data-popup-content="<?php echo $file['text'] ?>">
          <?php echo $file['file_name'] ?>
        </button>
      </li>
    <?php endforeach ?>
  </ul>
</section>