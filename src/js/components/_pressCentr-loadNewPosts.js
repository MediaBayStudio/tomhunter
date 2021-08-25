;(function() {
  searchInp = document.querySelector('.search__inp');

  const loadmoreBtn = document.querySelector('.loadmore-btn');

  if (loadmoreBtn) {
    const cardList = document.querySelector('.news__list');

    const baseURL = window.location.origin;
    const wpRestApiURL = baseURL + '/wp-json/wp/v2';

    const categoryID = +loadmoreBtn.dataset.categoryId;

    let offset = document.querySelectorAll('.news__list-item').length;
    let per_page = 6;

    loadmoreBtn.addEventListener('click', function() {
      let arguments = '/posts?' + '_embed' +
        '&categories=' + categoryID +
        '&offset=' + offset +
        '&per_page=' + per_page;

      loadmoreBtn.classList.add('loading');

      fetch(wpRestApiURL + arguments)
        .then(response => response.json())
        .then(posts => {
          posts.forEach( function(post) {
            cardList.insertAdjacentHTML('beforeend', createNewsArticlePreview(post));
            offset += per_page;
            setTimeout(() => lazy.refresh());
            loadmoreBtn.classList.remove('loading');
          })
        })
        .catch(err => {
          console.log(err);
          loadmoreBtn.classList.remove('loading');
        })
    });

    function createNewsArticlePreview(post) {
      const link = post.link;
      const title = post.title.rendered;
      const descr = post.excerpt.rendered;
      const category = post['_embedded']['wp:term'][0][0]['name'];
      const date = (new Date(post.date)).toLocaleDateString('ru', {day: 'numeric', month: 'numeric' ,year: '2-digit'});
      let imgHTML = '';

      if (post['_embedded']['wp:featuredmedia']) {
        let images = post['_embedded']['wp:featuredmedia'][0]['media_details']['sizes'];

        imgHTML = `
          <img src="#" alt="#" data-src="image-set(${images.medium.source_url} 1x, ${images.post_card_768_x2.source_url} 2x, ${images.post_card_768_x3.source_url} 3x)"
            data-media="(min-width: 767.98px) {image-set(${images.post_card_768.source_url} 1x, ${images.post_card_768_x2.source_url} 2x, ${images.post_card_768_x3.source_url} 3x)} (min-width: 1319.98px) {image-set(${images.post_768_x2.source_url} 1x, ${images.post_1440_x2.source_url} 2x)}"
            class="single-card__img lazy">
        `;
      } else if (post['_embedded']['wp:term'][1][0]) {
        let image = post['_embedded']['wp:term'][1][0]['acf']['icon']['sizes']['large'];

        imgHTML = `<img src="#" alt="#" data-src='${image}' class="single-card__img lazy">`;

      } else {
        imgHTML = ''
      }

      const HTML = `
        <li class="press-centr__list-item news__list-item">
          <article class="single-card ${categoryID === 25 ? 'mass-media__single-card' : '' }">
            <a href="${link}" class="single-card__img-wrap">
              ${imgHTML}
            </a>
            <span class="single-card__category">${category}</span>
            <a href="${link}" class="single-card__title-wrap">
              <strong class="single-card__title">${title}</strong>
            </a>
            <p class="single-card__descr">${descr}</p>
            <div class="single-card__bottom">
              <a href="${link}" class="single-card__link link_red">
                Читать...
              </a>
              <span class="single-card__date">${date}</span>
            </div>
          </article>
        </li>
      `;

      return HTML;
    }

  };
})()