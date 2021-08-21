<?php
  /**
   * Template Name: Персональные данные
   */
?>

<?php get_header(); ?>

<?php
require 'layouts/single_service/_single_service-hero.php';

$descr_sect_fields = get_field('descr_sect');
$descr_sect = [
  'title'       => $descr_sect_fields['sect_title'],
  'paragraphs'  => $descr_sect_fields['p_repeater'],
  'list_title'  => $descr_sect_fields['list_title'],
  'list_items'  => $descr_sect_fields['list_repeater'],
  'img_src'     => $descr_sect_fields['img']['url']
];
require 'layouts/_descr.php';

$complex_of_service_fields = get_field('complex_of_service');
$complex_of_service_points = $complex_of_service_fields['points'];
require 'layouts/_complex-of-service-sect.php';

$work_result_fields = get_field('work_result');
$work_res = [
  'title' => $work_result_fields['sect_title'],
  'descr' => $work_result_fields['descr']
];
require 'layouts/_work-result.php';

require 'layouts/single_service/personal-data/GDPR-requirements.php';

$best_in_business_fields = get_field('best_in_business');
$best_in_business_cards = $best_in_business_fields['cards'];
require 'layouts/_best-in-business.php';

require 'layouts/single_service/_materials.php';
require 'layouts/_service.php';
require 'layouts/_actual-news.php';
?>

<?php get_footer('home'); ?>