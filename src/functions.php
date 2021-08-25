<?php
$template_directory = get_template_directory_uri();

// Enable the option show in rest
add_filter( 'acf/rest_api/field_settings/show_in_rest', '__return_true' );

// Enable the option edit in rest
add_filter( 'acf/rest_api/field_settings/edit_in_rest', '__return_true' );

// Вставка кнопки в редактор статьи
add_action( 'admin_print_footer_scripts', function() {
  if ( ! wp_script_is( 'quicktags' ) )
    return;
  ?>

  <script>
  QTags.addButton( 'eg_dropcap', 'Буквица', '<span class="dropcap">', '</span>', 'h', 'Первая буква будет заглавной', 1 );
  </script>

  <?php
} );

remove_filter( 'the_excerpt', 'wpautop' );
// Отключаем разные стандартные скрипты и стили wp
  function disable_wp_scripts() {
// Отключаем wp-emoji
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
// Отключаем скрипты wp-embed
    remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
    remove_action( 'wp_head', 'wp_oembed_add_host_js' );
// Отключаем гутенберг
    if ( 'disable_gutenberg' ) {
      add_filter( 'use_block_editor_for_post_type', '__return_false', 100 );

      remove_action( 'wp_enqueue_scripts', 'wp_common_block_scripts_and_styles' );

      add_action( 'admin_init', function() {
        remove_action( 'admin_notices', ['WP_Privacy_Policy_Content', 'notice'] );
        add_action( 'edit_form_after_title', ['WP_Privacy_Policy_Content', 'notice'] );
      } );
    }

// отключаем стандартные метки
    register_taxonomy( 'post_tag', ['public' => false] );
  }
add_action( 'init', 'disable_wp_scripts') ;

// Удаление лишних пунктов в шапке админ-бара
  function remove_admin_bar_links() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu( 'new-content' );
    $wp_admin_bar->remove_menu( 'new-link' );
    // $wp_admin_bar->remove_menu( 'comments' );
    $wp_admin_bar->remove_menu( 'archive' );
  }

add_action( 'admin_menu', 'remove_admin_menu' );
add_action( 'wp_before_admin_bar_render', 'remove_admin_bar_links' );

// Запрет обновления плагинов
add_filter( 'site_transient_update_plugins', function( $value ) {
  unset(
    $value->response['contact-form-7/wp-contact-form-7.php'],
    $value->response['contact-form-7-honeypot/honeypot.php'],
    $value->response['advanced-custom-fields-pro/acf.php'],
    $value->response['admin-menu-editor/menu-editor.php'],
    $value->response['all-in-one-seo-pack-pro/all_in_one_seo_pack.php'],
    $value->response['wp-user-avatar/wp-user-avatar.php']
  );

  return $value;
} );


// Убираем постоянные ссылки под заголовком у нужных записей (#edit_slug_box)
function my_hide_edit_permalink( $return, $post_id, $new_title, $new_slug, $post ) {

  if ( $post->post_type == 'services' ) {
    // return '<div style="display:none">' . $return . '<div>';
    return '';
  }

  return $return;
}

add_filter( 'get_sample_permalink_html', 'my_hide_edit_permalink', 100, 5 );


      /* Contact Form 7 */
// Отключаем весь css-файл CF7
  add_filter( 'wpcf7_load_css', '__return_false' );

// Отключаем генерацию некоторых лишнех тегов
  add_filter( 'wpcf7_autop_or_not', '__return_false' );


      /* Подключение скриптов */
// Хук и вызов функции
  add_action( 'wp_enqueue_scripts', 'scripts' );

// Функция возвращения массива ID скриптов и их пути
  function create_scripts_array( $scripts = '' ) {
    $array = [
      'slick-script'            => '/js/slick.min.js',
      'lazyload-script'         => '/js/lazy.min.js',
      'validate-script'         => '/js/jquery.validate.min.js',
      'jquery-settings-script'  => '/js/jquery-settings/jquery-settings.js',
      'mobileMenu-script'       => '/js/MobileMenu.min.js',
      'simplePopup-script'      => '/js/SimplePopup.min.js',
      'main-script'             => '/js/main.js',
      'pixel-perfect-script'    => '/js/jquery.pixlayout.0.9.8.js'
    ];

    if ( $scripts ) {
      for ( $i=0; $i < count( $scripts ); $i++ ) {
        $array += $scripts;
      }
    }

    return $array;
  }

// Функция работы со скриптами
function scripts () {
  $scripts = create_scripts_array();
// Подключение своих стилей
  wp_enqueue_style( 'style', get_stylesheet_uri());
  wp_enqueue_style( 'main-style', get_template_directory_uri() . '/css/style.css', [], null );
  wp_enqueue_style( '420px-style', get_template_directory_uri() . '/css/style.420.css', [], null, '(min-width: 419.98px)' );
  wp_enqueue_style( '576px-style', get_template_directory_uri() . '/css/style.576.css', [], null, '(min-width: 575.98px)' );
  wp_enqueue_style( '767px-style', get_template_directory_uri() . '/css/style.768.css', [], null, '(min-width: 767.98px)' );
  wp_enqueue_style( '992px-style', get_template_directory_uri() . '/css/style.992.css', [], null, '(min-width: 991.98px)' );
  wp_enqueue_style( '1320px-style', get_template_directory_uri() . '/css/style.1320.css', [], null, '(min-width: 1319.98px)' );
  wp_enqueue_style( 'hover-style', get_template_directory_uri() . '/css/hover.css', [], null, '(hover), (min-width: 1024.98px)' );

  if ( is_page_template( 'service.php') || is_page_template( 'services.php' ) || is_page_template( 'audit.php' ) || is_page_template( 'consulting.php' ) || is_page_template( 'personal-data.php' ) || is_page_template( 'CII-security.php' ) || is_page_template( 'tech-info-protection.php' )   ) {
    wp_enqueue_style( 'service-style', get_template_directory_uri() . '/css/service.css', [], null );
  } else if ( is_single() ) {
    wp_register_script( 'hljs', '//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/highlight.min.js');
    wp_enqueue_script( 'hljs' );
    wp_enqueue_style( 'hljs', '//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/default.min.css' );
    wp_enqueue_style( 'single-style', get_template_directory_uri() . '/css/single.css', [], null );
  } else if ( is_category() ) {
    wp_enqueue_style( 'press-center-style', get_template_directory_uri() . '/css/press-center.css', [], null );
  }

  if ( is_404() ) {
    wp_enqueue_style( '404-style', get_template_directory_uri() . '/css/404.css', [], null );
  }

 // Подключение нужных стилей по страницам

  function get_pages_names() {
    $names = [];
    $pages = get_posts( ['post_type' => 'page', 'numberposts' => -1] );

    foreach ( $pages as $page ) {
      array_push( $names, $page->post_name );
    }

    return $names;
  }

  $pages = get_pages_names();

  $current_page = get_post(0)->post_name;

  foreach ( $pages as $page ) {
    if ( $page === $current_page && $page !== 'services' && $page !== 'consulting' && $page !== 'politika-konfidenczialnosti' ) {
      wp_enqueue_style( $page . '-style', get_template_directory_uri() . '/css/' . $page . '.css', [], null );
    }
  }

// Подключение своих скриптов
  foreach ( $scripts as $id => $dir ) {
    wp_enqueue_script( $id, get_template_directory_uri() . $dir, [], null );
  }


// Подключение скрипта для определенной страницы
  // if (is_page_template('page') {
  //   wp_enqueue_script('id', get_template_directory_uri() . 'dir', [], null);
  // }

// Отключение стандартных jquery, jquery-migrate
  wp_deregister_script( 'jquery-core' );
  wp_deregister_script( 'jquery' );

// Подключение jquery через cdn
  wp_register_script( 'jquery-core', 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', false, null, true );
  wp_register_script( 'jquery', false, array( 'jquery-core' ), null, true );
  wp_enqueue_script( 'jquery' );

// Фукнция установки атрибута defer для всех скриптов из списка
  // Для добавления атрибута скриптам, которых нет в массиве, которые, например
  // добавляются на отдельных страницах, нужно передать их в аргументе
  // create_scripts_array(['another-script' => ''])


// Фильтр для добавления атрибута defer при загрузке скриптов и удялем лишнее
  add_filter( 'script_loader_tag',   function( $html, $handle ) {

    $scripts = create_scripts_array();

    foreach( $scripts as $id => $dir ) {
      if ( $id === $handle ) {
        $html = str_replace( ' src', ' defer src', $html );
      }
    }

    $html = str_replace( " id='$handle-js' ", '', $html );
    $html = str_replace( " type='text/javascript'", '', $html );

     return $html;
  }, 10, 2 );

// Удаляем лишнее в тегах style
  add_filter( 'style_loader_tag', function($html, $handle ) {
    $html = str_replace( " id='$handle-css' ", '', $html );
    $html = str_replace( " type='text/css'", '', $html );
    return $html;
  }, 10, 2 );

}

    /* Настройка контактов в панели настройки->общее */
// Создание нужных полей
  function contatcs_options() {
    add_settings_field('tel', 'Телефон', 'display_tel', 'general');
    register_setting('general', 'contacts_tel');

    add_settings_field('address', 'Адрес', 'display_address', 'general');
    register_setting('general', 'contacts_address');

    add_settings_field('email', 'E-mail', 'display_email', 'general');
    register_setting('general', 'contacts_email');

    add_settings_field('coords', 'Координаты маркера на карте', 'display_coords', 'general');
    register_setting('general', 'contacts_coords');

    add_settings_field('zoom', 'Увеличение карты', 'display_zoom', 'general');
    register_setting('general', 'contacts_zoom');

    // Настройки отображения кол-во постов на странице
    add_settings_field('posts_for_desktop', 'Количество записей на больших экранах (desktop)', 'display_posts_desktop', 'reading');
    register_setting('reading', 'posts_desktop');

    add_settings_field('posts_for_tablet', 'Количество записей на средних экранах (tablet)', 'display_posts_tablet', 'reading');
    register_setting('reading', 'posts_tablet');

    add_settings_field('posts_for_mobile', 'Количество записей на маленьких экранах (mobile)', 'display_posts_mobile', 'reading');
    register_setting('reading', 'posts_mobile');
  }

  function display_posts_desktop() {
    echo "<input type='text' name='posts_desktop' value='" . esc_attr(get_option('posts_desktop')) . "'>";
  }

  function display_posts_tablet() {
    echo "<input type='text' name='posts_tablet' value='" . esc_attr(get_option('posts_tablet')) . "'>";
  }

  function display_posts_mobile() {
    echo "<input type='text' name='posts_mobile' value='" . esc_attr(get_option('posts_mobile')) . "'>";
  }

// Функции вывода нужных полей
  function display_tel() {
    echo "<input type='text' name='contacts_tel' value='" . esc_attr(get_option('contacts_tel')) . "'>";
  }

  function display_address() {
    echo "<input type='text' name='contacts_address' value='" . esc_attr(get_option('contacts_address')) . "'>";
  }

  function display_email() {
    echo "<input type='text' name='contacts_email' value='" . esc_attr(get_option('contacts_email')) . "'>";
  }

  function display_coords() {
    echo "<input type='text' name='contacts_coords' value='" . esc_attr(get_option('contacts_coords')) . "'>";
  }

  function display_zoom() {
    echo "<input type='text' name='contacts_zoom' value='" . esc_attr(get_option('contacts_zoom')) . "'>";
  }


// Хук для создания опций
  add_action( 'admin_init','contatcs_options' );


// Хук для создания опций
  // add_action( 'admin_init','contatcs_options' );

    /* Поддержка разных штучек-дрючек */

// Добавить поддержку тайтлов каждой страницы
  add_theme_support( 'title-tag' );

// Поддержка миниатюр
  add_theme_support( 'post-thumbnails' );

  add_image_size( 'post_card_768',    315, 185, true );
  add_image_size( 'post_card_768_x2', 630, 370, true );
  add_image_size( 'post_card_768_x3', 945, 555, true );


  add_image_size( 'post_768',    650, 320, true );
  add_image_size( 'post_768_x2', 1300, 640, true );

  add_image_size( 'post_1440_x2', 2520, 1240, true );


add_action('init', 'register_post_types');


function register_post_types(){
  register_post_type('services', [
    'label'  => null,
    'labels' => [
      'name'               => 'Услуги', // основное название для типа записи
      'singular_name'      => 'Услуга', // название для одной записи этого типа
      'add_new'            => 'Добавить услугу', // для добавления новой записи
      'add_new_item'       => 'Добавление услуги', // заголовка у вновь создаваемой записи в админ-панели.
      'edit_item'          => 'Редактирование услуги', // для редактирования типа записи
      'new_item'           => 'Новая услуга', // текст новой записи
      'view_item'          => 'Смотреть услугу', // для просмотра записи этого типа.
      'search_items'       => 'Искать услугу', // для поиска по этим типам записи
      'not_found'          => 'Не найдено', // если в результате поиска ничего не было найдено
      'not_found_in_trash' => 'Не найдено в корзине', // если не было найдено в корзине
      'parent_item_colon'  => '', // для родителей (у древовидных типов)
      'menu_name'          => 'Услуги', // название меню
    ],
    'description'         => 'Список услуг, которые оказывает компания. Каждый элемент из этого раздела формируется в карточку и выводится на страницах, где есть секция "Услуги нашей компании" или "Другие услуги нашей компании".',
    'public'              => true,
    'show_in_menu'        => null, // показывать ли в меню адмнки
    'show_in_rest'        => null, // добавить в REST API. C WP 4.7
    'rest_base'           => null, // $post_type. C WP 4.7
    'menu_position'       => null,
    'menu_icon'           => null,
    'hierarchical'        => false,
    'supports'            => ['title'], // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
    'taxonomies'          => [],
    'has_archive'         => false,
    'rewrite'             => true,
    'query_var'           => true,
  ]);

  register_post_type('banners', [
    'label'  => null,
    'labels' => [
      'name'               => 'Баннеры', // основное название для типа записи
      'singular_name'      => 'Баннер', // название для одной записи этого типа
      'add_new'            => 'Добавить баннер', // для добавления новой записи
      'add_new_item'       => 'Добавление баннера', // заголовка у вновь создаваемой записи в админ-панели.
      'edit_item'          => 'Редактирование баннера', // для редактирования типа записи
      'new_item'           => 'Новый баннер', // текст новой записи
      'view_item'          => 'Смотреть баннер', // для просмотра записи этого типа.
      'search_items'       => 'Искать баннер', // для поиска по этим типам записи
      'not_found'          => 'Не найдено', // если в результате поиска ничего не было найдено
      'not_found_in_trash' => 'Не най. дено в корзине', // если не было найдено в корзине
      'parent_item_colon'  => '', // для родителей (у древовидных типов)
      'menu_name'          => 'Баннеры', // название меню
    ],
    'description'         => '',
    'public'              => true,
    'show_in_menu'        => null, // показывать ли в меню адмнки
    'show_in_rest'        => null, // добавить в REST API. C WP 4.7
    'rest_base'           => null, // $post_type. C WP 4.7
    'menu_position'       => null,
    'menu_icon'           => null,
    'hierarchical'        => false,
    'supports'            => ['title'], // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
    'taxonomies'          => [],
    'has_archive'         => false,
    'rewrite'             => true,
    'query_var'           => true,
  ]);



  add_post_type_support( 'post', 'thumbnail' );
  add_post_type_support( 'post', 'excerpt' );
  // remove_post_type_support( 'post', 'editor' );
  // remove_post_type_support( 'post', 'thumbnail' );

  remove_post_type_support( 'page', 'editor' );
  remove_post_type_support( 'page', 'thumbnail' );
  remove_post_type_support( 'page', 'revisions' );
  remove_post_type_support( 'page', 'comments' );
};

add_action( 'init', 'register_taxonomies');

function register_taxonomies() {
  register_taxonomy( 'mass_media_source', [ 'post' ], [
    'label'          => '',
    'labels'         => [
      'name'              => _x( 'Источники Мы в СМИ', 'taxonomy general name' ),
			'singular_name'     => _x( 'Источник Мы в СМИ', 'taxonomy singular name' ),
    ],
    'description'   => '',
    'public'        => true,
    'hierarchical'  => false,
    'show_in_rest'  => true,
    'rewrite'       => true,
    'rest_base'     => null
  ]);
};

// Параметры меню
class My_Walker_Nav_Menu extends Walker_Nav_Menu {

  public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
    if ( isset( $args->item_spacing ) && 'discard' === $args->item_spacing ) {
      $t = '';
      $n = '';
    } else {
      $t = "\t";
      $n = "\n";
    }
    $indent = ( $depth ) ? str_repeat( $t, $depth ) : '';

    // echo '<script>console.log(' . json_encode($item) . ')</script>';
    // echo '<script>console.log('. json_encode($args). ')</script>';

    foreach ( $item->classes as $class ) {

      $dropdown = '';
      $link_before = '';
      $link_after = '';
      if ( $class === 'menu-item-has-children' ) {
        $dropdown = ' dropdown';
        $link_before = '<span class="nav__link-text">';
        $link_after = '</span>';
      }

      $current = '';
      if ( $class === 'current_page_item' || $class === 'current_page_parent' ) {
        $current = ' current';
      }
    }
    $classes[] = 'nav__link' . $dropdown . $current;

    $args = apply_filters( 'nav_menu_item_args', $args, $item, $depth );

    $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
    $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

    $id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args, $depth );
    $id = $id ? ' id="' . esc_attr( $id ) . '"' : '';


    $output .= $indent . '';

    $atts = array();
    $atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
    $atts['target'] = ! empty( $item->target )     ? $item->target     : '';
    $atts['rel']    = ! empty( $item->xfn )        ? $item->xfn        : '';
    $atts['href']   = ! empty( $item->url )        ? $item->url        : '';

    $atts = apply_filters('nav_menu_link_attributes', $atts, $item, $args, $depth);

    $attributes = '';
    foreach ( $atts as $attr => $value ) {
      if ( ! empty( $value ) ) {
        $value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
        $attributes .= ' ' . $attr . '="' . $value . '"';
      }
    }

    $title = apply_filters('the_title', $item->title, $item->ID);
    $title = apply_filters('nav_menu_item_title', $title, $item, $args, $depth);

    $item_output = $args->before;
    $item_output .= '<a'. $attributes . $class_names . '>';
    $item_output .= $link_before . $args->link_before . $title . $args->link_after . $link_after;
    $item_output .= '</a>';
    $item_output .= $args->after;


    $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
  }

  public function start_lvl( &$output, $depth = 0, $args = NULL ) {
    // depth dependent classes
    $indent = ($depth > 0  ? str_repeat( "\t", $depth ) : ''); // code indent
    $display_depth = ($depth + 1); // because it counts the first submenu as 0
    $classes = ['sub-menu'];

    $class_names = implode('', $classes);

    // build html
    $output .= "\n" . $indent . '<div class="' . $class_names . '">' . "\n";
  }

  public function end_lvl( &$output, $depth = 0, $args = null ) {
    if ( isset( $args->item_spacing ) && 'discard' === $args->item_spacing ) {
      $t = '';
      $n = '';
    } else {
      $t = "\t";
      $n = "\n";
    }

    $indent  = str_repeat( $t, $depth );
    $output .= "$indent</div>{$n}";
  }

  public function end_el( &$output, $item, $depth = 0, $args = null ) {
  if ( isset( $args->item_spacing ) && 'discard' === $args->item_spacing ) {
    $t = '';
    $n = '';
  } else {
    $t = "\t";
    $n = "\n";
  }
  $output .= "{$n}";
}
}


add_action( 'after_setup_theme', function() {
  register_nav_menus ( array(
    'header_menu' => 'Меню в шапке сайта',
    'mobile_menu' =>  'Мобильное меню на сайте',
    'footer_menu' => 'Меню в большом футере сайта',
    'footer_home-menu' => 'Меню в новом футере'
  ) );
} );

// если блог, то установим автора по умолчанию (том хантер)
add_action( 'save_post', function( $post_id, $post, $update ) {
  $terms = get_the_terms( $post_id, 'category' );
  foreach ( $terms as $term ) {
    // на локалке id = 4, на сервере id = 6
    if ( $post->post_author != 6 && $term->slug === 'blog' ) {
      global $wpdb;
      $wpdb->update( 'wp_posts', ['post_author' => 6], ['ID' => $post_id] );
      break;
    }
  }
}, 10, 3 );

function kama_excerpt( $args = '' ){
  global $post;

  if( is_string($args) )
    parse_str( $args, $args );

  $rg = (object) array_merge( array(
    'maxchar'     => 350,   // Макс. количество символов.
    'text'        => '',    // Какой текст обрезать (по умолчанию post_excerpt, если нет post_content.
    'autop'       => true,  // Заменить переносы строк на <p> и <br> или нет?
    'save_tags'   => '',    // Теги, которые нужно оставить в тексте, например '<strong><b><a>'.
    'more_text'   => 'Читать дальше...', // Текст ссылки `Читать дальше`.
    'ignore_more' => false, // нужно ли игнорировать <!--more--> в контенте
  ), $args );

  $rg = apply_filters( 'kama_excerpt_args', $rg );

  if( ! $rg->text )
    $rg->text = $post->post_excerpt ?: $post->post_content;

  $text = $rg->text;
  // убираем блочные шорткоды: [foo]some data[/foo]. Учитывает markdown
  $text = preg_replace( '~\[([a-z0-9_-]+)[^\]]*\](?!\().*?\[/\1\]~is', '', $text );
  // убираем шоткоды: [singlepic id=3]. Учитывает markdown
  $text = preg_replace( '~\[/?[^\]]*\](?!\()~', '', $text );
  $text = trim( $text );

  // <!--more-->
  if( ! $rg->ignore_more  &&  strpos( $text, '<!--more-->') ){
    preg_match('/(.*)<!--more-->/s', $text, $mm );

    $text = trim( $mm[1] );

    $text_append = ' <a href="'. get_permalink( $post ) .'#more-'. $post->ID .'">'. $rg->more_text .'</a>';
  }
  // text, excerpt, content
  else {
    $text = trim( strip_tags($text, $rg->save_tags) );

    // Обрезаем
    if( mb_strlen($text) > $rg->maxchar ){
      $text = mb_substr( $text, 0, $rg->maxchar );
      $text = preg_replace( '~(.*)\s[^\s]*$~s', '\\1...', $text ); // кил последнее слово, оно 99% неполное
    }
  }

  // сохраняем переносы строк. Упрощенный аналог wpautop()
  if( $rg->autop ){
    $text = preg_replace(
      array("/\r/", "/\n{2,}/", "/\n/",   '~</p><br ?/?>~'),
      array('',     '</p><p>',  '<br />', '</p>'),
      $text
    );
  }

  $text = apply_filters( 'kama_excerpt', $text, $rg );

  if( isset($text_append) )
    $text .= $text_append;

  return ( $rg->autop && $text ) ? "<p>$text</p>" : $text;
}

function load_banners() {
  if ( $_POST ) {
    $banners = get_posts( [
      'post_type'   => 'banners',
      'numberposts' => -1
    ] );

    foreach( $banners as $banner ) {
      $id = $banner->ID;
      $banner_fields = get_field( 'banner_fields', $id );

      $params = [
        'title'   => $banner_fields['title'],
        'descr'   => $banner_fields['descr'],
        'link'    => $banner_fields['link'],
        'images'  => [
          'img_320' => [
            'alt' => $banner_fields['img_320']['alt'],
            'src' => $banner_fields['img_320']['url']
          ],
          'img_768' => [
            'alt' => $banner_fields['img_768']['alt'],
            'src' => $banner_fields['img_768']['url']
          ]
        ]
      ];

      $response[] = $params;
    }

    echo json_encode( $response );
    die();
  }

}

add_action( 'wp_ajax_nopriv_loadbanners', 'load_banners' );
add_action( 'wp_ajax_loadbanners', 'load_banners' );

function true_load_posts( $cat, $posts_per_page=7 ) {


  if ( $_POST ) {
    $cat = $_POST['termId'];
    $offset = $_POST['postOffset'];
    $posts_per_page = $_POST['postsPerPage'];
    $banner_offset = $_POST['bannerOffset'];
  } else {
    $cat = $cat->term_id;
    $offset = 0;
    $banners_offset = 0;
  }

  $this_cat = get_category( $cat );

  if ( $this_cat->parent === 0 ) {
    $len = wp_count_posts()->publish;
  } else {
    $len = $this_cat->category_count;
  }

  $response = ['posts' => [], 'banner' => [], 'length' => $len];

  $posts = get_posts( [
    'cat'            => $cat,
    'offset'         => $offset,
    'posts_per_page' => $posts_per_page
  ] );

  $banner = get_posts( [
    'post_type'   => 'banners',
    'numberposts' => 1,
    'offset'      => $banner_offset
  ] );

  // $response['posts']['count'] = (int)wp_count_posts()->publish;

  $i = 0;
  foreach( $posts as $post ) {
    $i++;
    $id = $post->ID;

    $img_768_320 = wp_get_attachment_image_url( get_post_thumbnail_id( $id ), 'post_card_768' );

    $img_768x2_320x2_1440 = wp_get_attachment_image_url( get_post_thumbnail_id( $id ), 'post_card_768_x2' );

    $img_768x3_320x3_1440x2 = wp_get_attachment_image_url( get_post_thumbnail_id( $id ), 'post_card_768_x3' );

    // $excerpt = substr( get_the_excerpt( $id ), 0, get_field( 'post_excerpt_length', $id ) );
    // $excerpt = get_the_excerpt( $id );
    $excerpt = kama_excerpt( [
      'maxchar'   =>  get_field( 'post_excerpt_length', $id ),
      'text'      =>  get_the_excerpt( $id ),
      'autop'     =>  false,
      'ignore_more' => true
    ] );

    $params = [
      'category'      => [],
      'title'         => $post->post_title,
      'preview_descr' => $excerpt,
      'date'          => get_the_date( 'd.m.Y', $id ),
      'link'          => get_the_permalink( $id ),
      'images'        => [
        'post_card_320'     =>  $img_768_320,
        'post_card_320_x2'  =>  $img_768x2_320x2_1440,
        'post_card_320_x3'  =>  $img_768x3_320x3_1440x2,

        'post_card_768'     =>  $img_768_320,
        'post_card_768_x2'  =>  $img_768x2_320x2_1440,
        'post_card_768_x3'  =>  $img_768x3_320x3_1440x2,

        'post_card_1440'    =>  $img_768x2_320x2_1440,
        'post_card_1440_x2' =>  $img_768x3_320x3_1440x2
      ]
    ];

    $categories = get_the_terms( $post, 'category' );

    foreach ( $categories as $category ) {
      array_push( $params['category'], $category->name );
    }

    array_push( $response['posts'], $params );
  }

  $response['posts']['count'] = $i;

  $banner_fields = get_field( 'banner_fields', $banner[0]->ID );

  $params = [
    'title'   => $banner_fields['title'],
    'descr'   => $banner_fields['descr'],
    'link'    => $banner_fields['link'],
    'images'  => [
      'img_320' => [
        'alt' => $banner_fields['img_320']['alt'],
        'src' => $banner_fields['img_320']['url']
      ],
      'img_768' => [
        'alt' => $banner_fields['img_768']['alt'],
        'src' => $banner_fields['img_768']['url']
      ]
    ]
  ];

  array_push( $response['banner'], $params );

  if (!$_POST) {
    return $response;
    die();
  }

  echo json_encode( $response );
  die();
}

add_action( 'wp_ajax_nopriv_loadmore', 'true_load_posts' );
add_action( 'wp_ajax_loadmore', 'true_load_posts' );


// Функции для работы со страницами
  function print_paragraphs($target, $className) {
    $paragraphs = $target['p_repeater'];
    if ($paragraphs) {
      $class = ($className) ? " class='" . $className . "'" : "";
      foreach ($paragraphs as $p) {
        echo "<p$class>$p[p]</p>";
      }
    }
  }

function the_breadcrumb( $settings ) {

  // получаем номер текущей страницы
  $pageNum = ( get_query_var('paged') ) ? get_query_var('paged') : 1;

  $separator = ' &raquo; '; //  »

  $container_start = $settings['container_start'];
  $container_end = $settings['container_end'];
  $links_after = $settings['links_after'];
  $links_before = $settings['links_before'];
  $link_after = $settings['link_after'];
  $link_before = $settings['link_before'];
  $link_class = $settings['link_class'];
  $current_link_class = $settings['current_link_class'];
  $after_links = $settings['after_links'];

  if ( $link_class ) {
    $class = 'class="' . $link_class . '"';
  }


  // если главная страница сайта
  if ( is_front_page() ){
    return;

  } else { // не главная
    if ( $container_start ) {
      echo $container_start;
    }
    if ( $links_before ) {
      echo $links_before;
    }

    echo "$link_before<a href=' " . site_url() . " ' $class><span class='breadcrumbs__text'>Главная</span></a>$link_after"; // выводим главную
    if( is_single() ) { // записи
      $current_category = get_the_category()[0];
      $parent_category = get_term( $current_category->parent );

      // выводим пресс-центр
      if ( $parent_category ) {
        echo "$link_before<a href=' " . get_term_link( $parent_category ) . " ' $class><span class='breadcrumbs__text'>$parent_category->name</span></a>$link_after";
      }

      // выводим категорию
      echo "$link_before<a href=' " . get_term_link( $current_category ) . " ' $class><span class='breadcrumbs__text'>$current_category->name</span></a>$link_after";

      // выводим название статьи
      $class = 'class="' . $link_class . ' current"';
      echo "$link_before<a href='#' $class><span class='breadcrumbs__text'>" .get_the_title() . "</span></a>$link_after";

      if ( $container_end ) {
      echo $container_end;
    }

    } elseif ( is_page() ){ // страницы WordPress


      $current_page_id = get_post(0)->ID;
      $current_page_parents = get_ancestors($current_page_id, 'page');

      if ($current_page_parents) {  // если есть родительские страницы, то будем их выводить (кроме главной)
        foreach ($current_page_parents as $parent_page_id) {

          $page = get_post($parent_page_id);
          $page_name = $page->post_name;  // index

          if ($page_name !== 'index') {
            $page_title = $page->post_title;
            $page_link = get_permalink($parent_page_id);

            echo "$link_before<a href='$page_link' $class>$page_title</a>$link_after";
          }

        }
      }
      if ($current_link_class) {
        $class = 'class="' . $link_class . ' ' . $current_link_class . '"';
      }
      echo "$link_before<a href='#' $class>" . get_the_title() . "</a>$link_after"; // выводим текущую страницу
      if ($links_after) {
        echo $links_after;
      }

      if ($after_links) {
        echo $after_links;
      }

      if ($container_end) {
        echo $container_end;
      }

    } elseif ( is_category() ) {
      // var_dump();
      $current_category = get_category( get_query_var('cat') );
      $parent_category = get_term( $current_category->parent );
      // var_dump($parent_category);

      // выводим пресс-центр
      // if ( $parent_category ) {
      if ( !is_wp_error( $parent_category ) ) {
        if ( is_category($parent_category) ) {
          $class = 'class="' . $link_class . ' current"';
        }
        echo "$link_before<a href='".get_term_link( $parent_category )."' $class><span class='breadcrumbs__text'>$parent_category->name</span></a>$link_after";
      }

      // выводим категорию
      // if ( !is_category($parent_category) ) {
      if ( is_wp_error( $parent_category ) || !is_category($parent_category) ) {
        $class = 'class="' . $link_class . ' current"';
        echo "$link_before<a href='".get_term_link( $current_category )."' $class><span class='breadcrumbs__text'>$current_category->name</span></a>$link_after";
      }


      if ($links_after) {
        echo $links_after;
      }

      if ($after_links) {
        echo $after_links;
      }

      if ($container_end) {
        echo $container_end;
      }

    } elseif( is_tag() ) {

      single_tag_title();

    } elseif (is_day() ) { // архивы (по дням)

      echo '<a href="' . get_year_link(get_the_time('Y')) . '">' . get_the_time('Y') . '</a>' . $separator;
      echo '<a href="' . get_month_link(get_the_time('Y'),get_the_time('m')) . '">' . get_the_time('F') . '</a>' . $separator;
      echo get_the_time('d');

    } elseif ( is_month() ) { // архивы (по месяцам)

      echo '<a href="' . get_year_link(get_the_time('Y')) . '">' . get_the_time('Y') . '</a>' . $separator;
      echo get_the_time('F');

    } elseif ( is_year() ) { // архивы (по годам)

      echo get_the_time('Y');

    } elseif ( is_author() ) { // архивы по авторам

      global $author;
      $userdata = get_userdata($author);
      echo 'Опубликовал(а) ' . $userdata->display_name;

    } elseif ( is_404() ) { // если страницы не существует

      echo 'Ошибка 404';

    }

    if ($pageNum > 1) { // номер текущей страницы
      echo ' (' . $pageNum . '-я страница)';
    }

  }
}


add_filter( 'manage_posts_columns', 'add_views_column', 4 );


function add_views_column( $columns ){
  $num = 2; // после какой по счету колонки вставлять новые

  $new_columns = [
    'img'   => 'Миниатюра',
    'category'  => 'Категории'
  ];

  return array_slice( $columns, 0, $num ) + $new_columns + array_slice( $columns, $num );
}

add_action( 'manage_posts_custom_column', 'fill_views_column', 5, 2 );

function fill_views_column( $colname, $post_id ) {
  $fields = get_field( 'post_category', $id );

  if ( $colname === 'img' ) {

    echo get_the_post_thumbnail( $id, [75,75] );

  } else if ( $colname === 'category' ) {
    $paragraph = '';
    if ( $fields ) {
      foreach ( $fields as $field ) {
        $paragraph .= $field->name . '<br>';
      }
      echo "<p>$paragraph</p>";
    }

  }
}
