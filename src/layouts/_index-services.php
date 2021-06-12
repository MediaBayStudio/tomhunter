<section class="index-services-sect container" id="service">
  <h2 class="index-services-sect__title sect-title forward_slash">Услуги</h2> <?php
  $services = get_field( 'services' );
  if ( count( $services ) % 4 === 0 ) {
    $class = ' columns-4';
  } else {
    $class = ' columns-3';
  } ?>
  <div class="index-services-block<?php echo $class ?>"> <?php 
      foreach ( $services as $service ) :
        $fields = get_field( 'service_fields', $service );
        $link = $fields['link'];
        $title = $service->post_title;
        if ( !$link ) {
          $link = '#';
        }
        $descr = $fields['descr'] ?>
        <a href="<?php echo $link ?>" class='card index-service-card'>
          <strong class='index-service-card__title'><?php echo $title ?></strong>
          <p class='index-service-card__descr'><?php echo $descr ?></p>
        </a> <?php
      endforeach ?>
  </div>
</section>