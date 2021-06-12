<?php 
$section = get_field( 'cybersecurity_sect' ) ?>
<section class="cybersecurity-sect container">
  <h2 class="cybersecurity-sect__title sect-title forward_slash"><?php echo $section['title'] ?></h2>
  <p class="cybersecurity-sect__descr"><?php echo $section['descr'] ?></p>
  <ul class="cybersecurity-sect__list"> <?php
    foreach ( $section['list'] as $li ) : ?>
      <li class="cybersecurity-sect__li">
        <span class="cybersecurity-sect__li-title"><?php echo $li['title'] ?></span>
        <p class="cybersecurity-sect__li-descr"><?php echo $li['descr'] ?></p>
      </li> <?php
    endforeach ?>
  </ul>
</section>