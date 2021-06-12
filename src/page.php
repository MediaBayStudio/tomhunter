<?php 
/*
  Template Name: Услуга
*/

  $tel = get_option('contacts_tel');
  $tel_dry = preg_replace('/\s/', '', $tel);
  $address = get_option('contacts_address');
  $email = get_option('contacts_email');
  $coords = get_option('contacts_coords');
  $zoom = get_option('contacts_zoom');
  $page = get_post(0)->post_name;

  $descr_sect_fields = get_field('descr_sect');
  $stages_sect_fields = get_field('stages_sect');
  $risks_sect_fields = get_field('risks_sect');

  get_header();
  require 'layouts/_hero.php';
 
  $descr_sect = [
    'title'       => $descr_sect_fields['sect_title'],
    'paragraphs'  => $descr_sect_fields['p_repeater'],
    'list_title'  => $descr_sect_fields['list_title'],
    'list_items'  => $descr_sect_fields['list_repeater'],
    'img_src'     => $descr_sect_fields['img']['url']
  ];

  require 'layouts/_descr.php';
    
  $childs = $stages_sect_fields['cards_settings'][0];

  $prefix = ' stages-block_';

  if ($childs == 4) {
    $prefix .= 'four';
  } else if ($childs == 3) {
    $prefix .= 'three';
  } else if ($childs == 2) {
    $prefix .= 'two';
  } else {
    $prefix = '';
  }

  if ($prefix !== '') {
    $prefix .= '-children';
  }

  $stages_cards = $stages_sect_fields['cards_repeater'];

  require 'layouts/_stages.php';
  require 'layouts/_invite.php';

  $risks_sect_images = $risks_sect_fields['images'];

  $risks_sect = [
    'title'       => $risks_sect_fields['sect_title'],
    'paragraphs'  => $risks_sect_fields['p_repeater'],
    'pdf'         => $risks_sect_fields['pdf'],
    'img_320'     => $risks_sect_images['img_320']['url'],
    'img_768'     => $risks_sect_images['img_768']['url'],
    'img_1440'    => $risks_sect_images['img_1440']['url'],
    'img_alt'     => $risks_sect_images['img_320']['alt'],
    'zoom'        => $risks_sect_images['zoom']
  ];

  require 'layouts/_risks.php';
  require 'layouts/_service.php';
  require 'layouts/_contacts.php';
  
  get_footer('home');