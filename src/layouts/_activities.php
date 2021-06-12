<section class="activities-sect container">
  <h2 class="activities-sect__title sect-title forward_slash"><?php echo $activities_sect_fields['title'] ?></h2>
  <div class="activities-sect__activities"> <?php
    foreach ( $activities_sect_fields['items'] as $item ) : ?>
      <div class="activity">
        <img src="#" alt="<?php echo $item['title'] ?>" data-src="<?php echo $item['img']['url'] ?>" class="activity__img lazy">
        <div class="activity__text">
          <span class="activity__title"><?php echo $item['title'] ?></span>
          <p class="activity__descr"><?php echo $item['descr'] ?></p>
        </div>
      </div> <?php
    endforeach ?>
  </div>
</section>