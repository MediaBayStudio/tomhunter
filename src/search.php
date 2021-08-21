<?php
// поиск по заголовкам в базе данных
// require_once($_SERVER['DOCUMENT_ROOT'] . $folder . '/wp-config.php');
// require_once($_SERVER['DOCUMENT_ROOT'] . $folder . '/wp-load.php');

require_once($_SERVER['DOCUMENT_ROOT'] . '/t.hunter/wp-config.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/t.hunter/wp-load.php');

// var_dump( $_POST['search'] )

$search = $_POST['search'];

$posts = $wpdb->get_results(
  "
  SELECT ID
  FROM $wpdb->posts
  WHERE post_type = 'post'
  AND post_status = 'publish'
  AND post_title
  LIKE '%$search%'
  "
);
/* вытаскивает из базы данных заголовки и содержимое
всех опубликованных страниц */
if ( $posts ) {
  $response = [];

  foreach ( $posts as $post ) {
    $elem = [
      'title' =>  get_the_title($post->ID),
      'link'  =>  get_the_permalink($post->ID),
    ];
    array_push($response, $elem);
  }

  echo json_encode($response);
}