<?php get_header() ?>

<?php
$categories = get_categories([
  'hide_empty' => false,
  'taxonomy' => 'category',
  'orderby' => 'meta_value_num',
  'meta_key' => 'index'
]);

$this_cat = get_category( get_query_var( 'cat' ), false );
$this_cat_name = $this_cat->slug;
$this_cat_ID = $this_cat->cat_ID;
$has_parent = $this_cat->category_parent;
?>



<section class="press-centr container">
  <header class="press-centr__header">
    <ul class="breadcrumbs-list">
      <li class="breadcrumbs-list__item"><a href="<?php echo home_url()?>">Главная</a></li>
      <li class="breadcrumbs-list__item<?php echo !$has_parent ? ' breadcrumbs-list__item--current' : '' ?>"><a href="<?php echo site_url() ?>/press-center">Пресс-центр</a></li>
        <?php if ( $has_parent ) : ?>
          <li class="breadcrumbs-list__item breadcrumbs-list__item--current"><a href="<?php echo get_term_link( $this_cat->term_id )?>"><?php echo $this_cat->name ?></a></li>
        <?php endif ?>
    </ul>

    <nav class="press-centr__nav">
      <ul class="press-centr__nav-list">
        <?php
          $curr_page = $this_cat->name;
          $active_class = ' press-centr__nav-link_active';
        ?>

        <li class="press-centr__nav-link<?php echo $curr_page == 'Новости' ? $active_class : '' ?>">
          <a href="<?php echo site_url() ?>/press-center/news">Новости</a>
        </li>
        <li class="press-centr__nav-link<?php echo $curr_page == 'Мы в СМИ' ? $active_class : '' ?>">
          <a href="<?php echo site_url() ?>/press-center/press-releases">Мы в СМИ</a>
        </li>
        <li class="press-centr__nav-link<?php echo $curr_page == 'Блог' ? $active_class : '' ?>">
          <a href="<?php echo site_url() ?>/press-center/blog">Блог</a>
        </li>

      </ul>
    </nav>

    <div class="search ">
      <input type="search" class="search__inp" placeholder="Поиск" title="Начните поиск по статьям">
      <!-- <div class="search__overlay"></div> -->
      <div class="search__icon"></div>
      <div class="search__result hide">
        <span class="search__start">Начните ввод...</span>
        <span class="search__noresult hide">Ничего не найдено</span>
        <div class="search__result-list"></div>
      </div>
    </div>
  </header>

  <?php
    if ( !$has_parent ) {
      require 'layouts/press-centr/_press-centr-common.php';
      require 'layouts/press-centr/_press-centr-media-contacts-sect.php';
    } else {
      switch ( $this_cat_name ) {
        case 'news':
          require 'layouts/press-centr/_press-centr-news.php';
          break;
        case 'press-releases':
          require 'layouts/press-centr/_press-centr-press-releases.php';
          require 'layouts/press-centr/_press-centr-media-contacts-sect.php';
          break;
        case 'blog':
          require 'layouts/press-centr/_press-centr-blog.php';
          break;
      };
    }; ?>
</section>

<?php
require 'layouts/_contact-us-new.php';
?>

<?php get_footer('home') ?>