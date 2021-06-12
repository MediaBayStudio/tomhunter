<?php $ndex_about_fields = get_field( 'index-about' ) ?>
<section class="index-about-sect container sect_purple">
  <div class="index-about-sect__text">
    <h2 class="index-about-sect__title sect-title forward_slash"><?php echo $ndex_about_fields['title']; ?></h2>
    <p class="index-about-sect__descr"><?php echo $ndex_about_fields['descr'] ?></p>
  </div>
  <img src="#" data-src="<?php echo $ndex_about_fields['img']['url'] ?>" alt="#" class="index-about-sect__img lazy">
</section>