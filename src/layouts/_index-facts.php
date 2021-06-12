<?php 
$section = get_field( 'facts_sect' ) ?>
<section class="facts-sect container">
  <h2 class="facts-sect__title sect-title forward_slash"><?php echo $section['title'] ?></h2>
  <ul class="facts-sect__list"> <?php
    foreach ( $section['list'] as $li ) : ?>
      <li class="facts-sect__li">
        <img src="#" alt="#" data-src="<?php echo $li['img']['url'] ?>" class="facts-sect__li-img lazy">
        <span class="facts-sect__li-title"><?php echo $li['title'] ?></span>
        <p class="facts-sect__li-descr"><?php echo $li['descr'] ?></p>
      </li> <?php
    endforeach ?>
  </ul>
</section>