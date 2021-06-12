<?php 
$clients_sect_visible = get_field( 'clients_sect_visible' );
if ( $clients_sect_visible ) :
  $clients = get_field( 'clients_sect' ) ?>
  <section class="index-clients-sect container">
    <h2 class="index-clients-sect__title sect-title forward_slash">Клиенты</h2>
    <div class="index-clients-sect__list"> <?php
      foreach ( $clients as $client ) : ?>
        <img src="#" alt="#" data-src="<?php echo $client['img']['url'] ?>" class="index-clients-sect__li-img lazy"> <?php
      endforeach ?>
    </div>
  </section> <?php
endif ?>