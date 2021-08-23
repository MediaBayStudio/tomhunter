<?php
  /**
   * Template Name: Аудит
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
require 'layouts/single_service/audit/_commercial-secret.php';
require 'layouts/single_service/audit/_financial-orgz.php';
require 'layouts/single_service/audit/_gos-info-system.php'; //стили от _commercial-secret

$best_in_business_fields = get_field('best_in_business');
$best_in_business_cards = $best_in_business_fields['cards'];
require 'layouts/_best-in-business.php';

require 'layouts/single_service/_materials.php';
require 'layouts/_service.php';
require 'layouts/_actual-news.php';
require 'layouts/_contact-us-new.php';
?>

<?php get_footer('home'); ?>