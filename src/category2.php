<?php 
$page = get_post(0)->post_name;

get_header();

$categories = get_categories( [
  'hide_empty' => false,
  'taxonomy' => 'category',
  'orderby' => 'meta_value_num',
  'meta_key' => 'index'
] );

// usort( $categories, function( $a, $b ) {
//   $a = get_field( 'index', $a );
//   $b = get_field( 'index', $b );
//   if ( $a == $b ) {
//     return 0;
//   }
//   return ( $a < $b ) ? -1 : 1;
// } );

$this_cat = get_category( get_query_var( 'cat' ), false );
$this_cat_name = $this_cat->slug;
$this_cat_ID = $this_cat->cat_ID;

echo "<script class='postcat'> const POSTCAT = '$this_cat_ID';</script>" ?>

<div class="page-things container"> <?php
  the_breadcrumb( [
    'container_start'     => '<div class="breadcrumbs">',
    'container_end'       => '</div>',
    'links_before'        => '<div class="breadcrumbs__list">',
    'links_after'         => '</div>',
    'link_class'          => 'breadcrumbs__link',
    'current_link_class'  => 'current',
    'after_links'         => '
      <div class="search disabled">
        <input type="search" class="search__inp" placeholder="Поиск" title="Начните поиск по статьям">
        <div class="search__overlay"></div>
        <div class="search__icon"></div>
        <div class="search__result hide">
          <span class="search__start">Начните ввод...</span>
          <span class="search__noresult hide">Ничего не найдено</span>
          <div class="search__result-list"></div>
        </div>
      </div>'
  ] ) ?>
  <div class="sort-block disabled"> <?php
    $buttons = [];
    foreach ( $categories as $category ) {
      $index = get_field( 'index', $category );
      if ( $index == -1 ) {
        continue;
      }
      $cat_id = $category->term_id;
      $cat_slug = $category->slug;
      $cat_link = get_term_link( $cat_id );
      $cat_title = $category->parent ? $category->name : 'Все материалы';
      $current_class = $cat_id == $this_cat_ID ? ' current' : '';
      $cat = "<a href='$cat_link' data-term='$cat_slug' class='sort-block__btn{$current_class}'>$cat_title</a>";
      array_push( $buttons, $cat );
    }

    foreach ( $buttons as $btn ) {
      echo $btn;
    } ?>    
  </div>
</div>
<section class="media-center-sect container">
  <div class="loader-bg active hide">
    <div class="loader"></div>
  </div>
  <?php $posts = true_load_posts( $this_cat ); ?>
  <div class="media-center-block" data-length="<?php echo $posts['length']; ?>" data-banners-count="<?php echo wp_count_posts( 'banners' )->publish; ?>"> <?php
    if ( $posts['posts'] ) : for ($i = 0; $i < count($posts['posts']); $i++) : $post = $posts['posts'][$i];
      if ( is_numeric( $post ) || is_null( $post ) ) {
        continue;
      }
      $img = $post['images'];

        if ($i === 0) : ?>

 <?php
      endif ?>
    <article class="single-card">
      <a href="<?php echo $post['link']; ?>" class="single-card__img-wrap">
        <img src="#" alt="#"
          data-src='<?php echo "image-set($img[post_card_320] 1x, $img[post_card_320_x2] 2x, $img[post_card_320_x2] 3x)"; ?>'
          data-media='<?php echo
    "(min-width: 767.98px) {image-set($img[post_card_768] 1x, $img[post_card_768_x2] 2x, $img[post_card_768_x3] 3x)}
    (min-width: 1319.98px) {image-set($img[post_card_1440] 1x, $img[post_card_1440_x2] 2x)}" ?>' class="single-card__img lazy">
      </a>
      <span class="single-card__category"><?php echo implode( ', ', $post['category'] ) ?></span>
      <a href="<?php echo $post['link']; ?>" class="single-card__title-wrap"><strong class="single-card__title"><?php echo $post['title']; ?></strong></a>
      <p class="single-card__descr"><?php echo $post['preview_descr']; ?></p>
      <div class="single-card__bottom">
        <a href="<?php echo $post['link']; ?>" class="single-card__link link_red">Читать...</a>
        <span class="single-card__date"><?php echo $post['date']; ?></span>
      </div>
    </article>

  <?php if ($i === 3) :
      if ( $posts['banner'] ) :
        $banner = $posts['banner'][0];
        $img_320 = $banner['images']['img_320'];
        $img_768 = $banner['images']['img_768'];
        $link = $banner['link'];
        ?>
        <a href='<?php echo "$link[url]"; ?>' class="service-block" title='Перейти на страницу <?php echo "$banner[title]"; ?>'>
          <img src="#" alt='<?php echo "$img_320[alt]"; ?>' class="service-block__img lazy"
          data-src='<?php echo "$img_320[src]"; ?>'
          data-media='(min-width: 1319.98px) {<?php echo "$img_768[src]"; ?>}'>
          <strong class="service-block__title"><?php echo $banner['title']; ?></strong>
          <p class="service-block__descr"><?php echo $banner['descr']; ?></p>
          <span class="service-block__link"><?php echo $banner['link']['title']; ?></span>
        </a>

    <?php endif; ?>
  <?php endif; ?>

  <?php endfor; else : echo "<p>Возникла какая-то ошибка, попробуйте обновить страницу</p>"; endif;

  ?>

  </div>

  <button class="load-more-btn hide"><span>Показать еще</span></button>
</section>


<?php 
  get_footer('404');
 ?>