<?php
/*
  Template Name: Услуги
*/

  $tel = get_option('contacts_tel');
  $tel_dry = preg_replace('/\s/', '', $tel);
  $address = get_option('contacts_address');
  $email = get_option('contacts_email');
  $coords = get_option('contacts_coords');
  $zoom = get_option('contacts_zoom');
  $page = get_page_template_slug();

  $descr_sect_fields = get_field('descr_sect');
  $stages_sect_fields = get_field('stages_sect');
  $risks_sect_fields = get_field('risks_sect');
  $best_in_business_fields = get_field('best_in_business');
  $complex_of_service_fields = get_field('complex_of_service');
  $work_result_fields = get_field('work_result');

  get_header();

  require 'layouts/_service-hero-new.php';

  $descr_sect = [
    'title'       => $descr_sect_fields['sect_title'],
    'paragraphs'  => $descr_sect_fields['p_repeater'],
    'list_title'  => $descr_sect_fields['list_title'],
    'list_items'  => $descr_sect_fields['list_repeater'],
    'img_src'     => $descr_sect_fields['img']['url']
  ];

  require 'layouts/_descr.php';

  $complex_of_service_points = $complex_of_service_fields['points'];

  if ( $complex_of_service_points ) {
    require 'layouts/_complex-of-service-sect.php';
  }

  require 'layouts/_testing-models.php';

  $work_res = [
    'title' => $work_result_fields['sect_title'],
    'descr' => $work_result_fields['descr']
  ];

  require 'layouts/_work-result.php';
  require 'layouts/_thunt-advantages.php';

  $risks_sect_images = $risks_sect_fields['images'];

  $risks_sect = [
    'title'       => $risks_sect_fields['sect_title'],
    'paragraphs'  => $risks_sect_fields['p_repeater'],
    'pdf'         => $risks_sect_fields['pdf'],
    'img_320'     => $risks_sect_images['img_320']['url'],
    'img_768'     => $risks_sect_images['img_768']['url'],
    'img_1440'    => $risks_sect_images['img_1440']['url'],
    'img_alt'     => $risks_sect_images['img_320']['alt'],
    'zoom'        => $risks_sect_images['zoom'],
    'blocks'      => $risks_sect_fields['blocks_repeater'],
    'sign'        => $risks_sect_fields['sign'],
    'units'       => $risks_sect_fields['units'],
    'small_units' => $risks_sect_fields['small_units']
  ];


  require 'layouts/_service.php';
  require 'layouts/_actual-news.php';
  require 'layouts/_contact-us-new.php';

  get_footer('home');