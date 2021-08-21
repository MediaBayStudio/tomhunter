<section class="questions container">
  <h2 class="questions__title sect-title forward_slash">Частые вопросы о консалтинге</h2>

  <?php $qustions = get_field('consult_questions') ?>

  <ul class="questions__list">
    <?php foreach ( $qustions as $question ) : ?>

    <li class="questions__item">
      <h3 class="questions__item-title"><?php echo $question['question'] ?></h3>

      <div class="questions__item-answer"><?php echo $question['answer'] ?></div>
    </li>
    <?php endforeach ?>
  </ul>
</section>