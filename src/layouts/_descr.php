<section class="descr-sect container" id="descr" style="background-image: url(<?php echo $descr_sect['img_src']; ?>)">
  <h2 class="descr-sect__title sect-title forward_slash"><?php echo $descr_sect['title']; ?></h2>
  <?php
    foreach ($descr_sect['paragraphs'] as $paragraph) {
      echo "<p class='descr-sect__descr'>$paragraph[p]</p>";
    }
    if ($descr_sect['list_title']) {
      echo "<ul class='descr-sect__list'>
            <li class='descr-sect__list-title'>$descr_sect[list_title]</li>";
      foreach ($descr_sect['list_items'] as $list_item) {
        echo "<li class='descr-sect__list-item'>$list_item[li]</li>";
      }
      echo "</ul>";
    }
   ?>
</section>