;(function() {
  searchInp = document.querySelector('.search__inp');

  const loadmoreBtn = document.querySelector('.loadmore-btn');

  if (!loadmoreBtn) return;

  const cardList = document.querySelector('.news__list')

  const baseURL = window.location.origin + '/t.hunter';
  const wpRestApiURL = baseURL + '/wp-json/wp/v2';

  getPostsOnClick(loadmoreBtn, cardList)

  async function getPostsByCatId(id, offset, numberOfPosts) {
    const arguments = `/posts?categories=${id}&_embed&offset=${offset}&per_page=${numberOfPosts}`;
    const request = wpRestApiURL + arguments;
    const response = await fetch(request);
    const json = await response.json();

    return json
  }

  function getPostsOnClick(btn, parentElem) {
    let offset = 6
    let per_page = 6

    btn.addEventListener('click', () => {
      const id = btn.dataset.categoryId;

      getPostsByCatId(id, offset, per_page)
        .then(posts => {
          posts.forEach(post => {
            const link = post.link
            const images = post['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']
            const title = post.title.rendered
            const descr = post.excerpt.rendered
            const category = post['_embedded']['wp:term'][0][0]['name']
            const date = (new Date(post.date)).toLocaleDateString('ru', {day: 'numeric', month: 'numeric' ,year: '2-digit'})

            const cardHTML = createNewsArticlePreview(link, images, category, title, descr, date)

            parentElem.insertAdjacentHTML('beforeend', cardHTML)
          })

          offset += per_page
          setTimeout(() => lazy.refresh())
        })
        .catch(err => console.log(err))
    })
  }

  function createNewsArticlePreview(link, images, category, title, descr, date ) {
    const articleHtml = `
      <li class="press-centr__list-item news__list-item">
        <article class="single-card">
          <a href="${link}" class="single-card__img-wrap">
          <img src="#" alt="#"
            data-src="image-set(${images.medium.source_url} 1x, ${images.post_card_768_x2.source_url} 2x, ${images.post_card_768_x3.source_url} 3x)"
            data-media="(min-width: 767.98px) {image-set(${images.post_card_768.source_url} 1x, ${images.post_card_768_x2.source_url} 2x, ${images.post_card_768_x3.source_url} 3x)} (min-width: 1319.98px) {image-set(${images.post_768_x2.source_url} 1x, ${images.post_1440_x2.source_url} 2x)}"
            class="single-card__img lazy">
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

    return articleHtml
  }

  function createMassmediaArticlePreveiew(imgSrc, title, descr, date) {

  }

})();