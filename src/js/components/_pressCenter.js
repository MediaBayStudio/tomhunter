;(function() {
  //let mediaCenterBlock = document.querySelector('.media-center-block');
  searchInp = document.querySelector('.search__inp');

  if (mediaCenterBlock) {
    document.body.removeChild(document.querySelector('.postcat'));

    let
    // loadMoreBtn = document.querySelector('.load-more-btn'),
      sortBlock = document.querySelector('.sort-block'),
      // pageLoader = document.querySelector('.media-center-sect > .loader-bg'),
      currentCategoryName = POSTCAT,
      currentPageNumber = 1,
      url = siteurl + '/wp-admin/admin-ajax.php',
      banners,
      bannersOnPage = [],
      bannersCoeff = 0,
      bannersTotalCount = mediaCenterBlock.getAttribute('data-banners-count'),
      postsOnPage = [],
      postsPerPage = 0,
      postsTotalLength = mediaCenterBlock.getAttribute('data-length'),
      inProgress = false,
      setPostsPerPage = function() {
        if (matchMedia('(min-width: 1319.98px)').matches) {
          postsPerPage = 7;
        } else if (matchMedia('(min-width: 767.98px)').matches) {
          postsPerPage = 5;
        } else {
          postsPerPage = 4;
        }
      },
      showStartPosts = function() {
        let mediaCenterChilds = spread(mediaCenterBlock.children);
        // если десктоп, то в каждой семерке берем первые 4, вставляем в обертку и туда же баннер
        // чередуем баннер
        if (postsPerPage === 7) {
          let banner = mediaCenterBlock.querySelector('.media-center-block > a:first-of-type');

          if (banner) {
            let cardsWrapper = document.createElement('div'),
              cardsWrapperLeft = document.createElement('div');

            cardsWrapper.classList.add('cards-wrapper');
            cardsWrapperLeft.classList.add('cards-wrapper__left');

            for (let i = 0; i < 4; i++) {
              mediaCenterChilds[i] && cardsWrapperLeft.insertAdjacentElement('beforeend', mediaCenterChilds[i]);
            }

            cardsWrapper.insertAdjacentElement('beforeend', cardsWrapperLeft);
            banner && cardsWrapper.insertAdjacentElement('beforeend', banner);

            // mediaCenterBlock.children[0].insertAdjacentElement('beforebegin', cardsWrapper);
            mediaCenterBlock.insertAdjacentElement('afterbegin', cardsWrapper);
          }
        } else if (postsPerPage === 5) {
          for (let i = mediaCenterBlock.children.length - 1; i > 5; i--) {
            mediaCenterBlock.removeChild(mediaCenterBlock.children[mediaCenterBlock.children.length - 1]);
          }
        } else if (postsPerPage === 4) {
          for (let i = mediaCenterBlock.children.length - 1; i > 4; i--) {
            mediaCenterBlock.removeChild(mediaCenterBlock.children[mediaCenterBlock.children.length - 1]);
          }
        }

        for (let i = 0; i < mediaCenterChilds.length; i++) {
          if (mediaCenterChilds[i].classList.contains('service-block')) {
            continue;
          }
          postsOnPage.push(mediaCenterChilds[i]);
        }
        mediaCenterBlock.removeAttribute('data-length');
        searchInp.parentElement.classList.remove('disabled');
        sortBlock.classList.remove('disabled');
      },
      getPosts = function(postOffset, postsPerPage, bannerOffset, callback) {
        // console.log(`postOffset: ${postOffset}`);
        // console.log(`postsPerPage: ${postsPerPage}`);
        // console.log('bannerOffset', bannerOffset);
        inProgress = true;
        let xhr = new XMLHttpRequest(),
          data = 'action=loadmore&termId=' + currentCategoryName + '&postOffset=' + postOffset + '&postsPerPage=' + postsPerPage + '&bannerOffset=' + bannerOffset;

        xhr.open('POST', url + '/wp-admin/admin-ajax.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
        // console.log(data);
        xhr.addEventListener('readystatechange', function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.response);
            callback && callback(response);
          }
        });
      },
      printPosts = function(posts) {
        let cardsWrapper,
          cardsWrapperLeft;

        if (postsPerPage === 7 && posts.count > 3) {
          cardsWrapper = document.createElement('div');
          cardsWrapperLeft = document.createElement('div');

          cardsWrapper.classList.add('cards-wrapper');
          cardsWrapperLeft.classList.add('cards-wrapper__left');
        }

        for (let i = 0; i < posts.count; i++) {
          let {category, title, preview_descr, link, date, images} = posts[i],
            html =
              `<article class="single-card">
                <a href="${link}" class="single-card__img-wrap">
                  <img src="#" alt="#"
                    data-src="image-set(${images.post_card_320} 1x, ${images.post_card_320_x2} 2x, ${images.post_card_320_x2} 3x)"
                    data-media="(min-width: 767.98px) {image-set(${images.post_card_768} 1x, ${images.post_card_768_x2} 2x, ${images.post_card_768_x3} 3x)}
                                (min-width: 1319.98px) {image-set(${images.post_card_1440} 1x, ${images.post_card_1440_x2} 2x)}" class="single-card__img lazy">
                </a>
                <span class="single-card__category">${category.join(', ')}</span>
                <a href="${link}" class="single-card__title-wrap"><strong class="single-card__title">${title}</strong></a>
                <p class="single-card__descr">${preview_descr}</p>
                <div class="single-card__bottom">
                  <a href="${link}" class="single-card__link link_red">Читать...</a>
                  <span class="single-card__date">${date}</span>
                </div>
              </article>`;

          if (cardsWrapper) {
            if (i < 4) {
              cardsWrapperLeft.insertAdjacentHTML('beforeend', html);
            } else {
              // cardsWrapper.insertAdjacentHTML('beforeend', html);
              setTimeout(function() {
                mediaCenterBlock.insertAdjacentHTML('beforeend', html);
              }, 10);
            }
          } else {
            mediaCenterBlock.insertAdjacentHTML('beforeend', html);
          }
          inProgress = false;
          mediaCenterBlock.classList.remove('loading');

          // console.log(posts[i]);
        }

        if (postsPerPage === 7 && posts.count > 3) {
          cardsWrapper.insertAdjacentElement('beforeend', cardsWrapperLeft);
          mediaCenterBlock.insertAdjacentElement('beforeend', cardsWrapper);
        }

        // console.log(posts);
        // console.log(cardsWrapper);
      },
      printBanner = function(banner, posts) {

        if (posts.count < 4 && postsPerPage !== 7) {
          return;
        }

        // console.log(banner);
        // console.log(posts);

        let lastCardsWrapper;

        if (posts.count > 3) {

          if (postsPerPage === 7) {
            lastCardsWrapper = mediaCenterBlock.querySelector('.cards-wrapper:last-of-type');
          }

          let {title, descr, link, images} = banner[0],
            img320 = images.img_320,
            img768 = images.img_768,
            html =
            `<a href="${link.url}" class="service-block" title="Перейти на страницу ${title}">
              <img src="#" alt="${img320.alt}" class="service-block__img lazy"
              data-src="${img320.src}"
              data-media="(min-width: 1319.98px) {${img768.src}}">
              <strong class="service-block__title">${title}</strong>
              <p class="service-block__descr">${descr}</p>
              <span class="service-block__link">${link.title}</span>
            </a>`;

          if (postsPerPage === 7) {
            lastCardsWrapper.insertAdjacentHTML('beforeend', html);
          } else {
            mediaCenterBlock.insertAdjacentHTML('beforeend', html);
          }
        }

      };


  // console.log('bannersTotalCount', bannersTotalCount);
    setPostsPerPage();
    showStartPosts();
    window.addEventListener('scroll', function() {
      let doc = document.documentElement;
      if ((doc.scrollHeight - doc.clientHeight <= window.pageYOffset + 500) && !inProgress) {
          let singles = mediaCenterBlock.querySelectorAll('.single-card'),
            bannersLength = mediaCenterBlock.querySelectorAll('.service-block').length;

        if (singles.length < postsTotalLength) {
          mediaCenterBlock.classList.add('loading');
          // console.log('bannersLength', bannersLength);

          if (bannersCoeff < bannersTotalCount - 1) {
            // console.log('Прибавляем 1');
            bannersCoeff++;
          } else {
            bannersCoeff = 0;
            // console.log('Сбрасываем счетчик');
          }

          // if (bannersLength === bannersTotalCount) {
          //   bannersLength = 0;
          // }

          // if (bannersLength === 5) {
          //   bannersCoeff = 5;
          // }
          // if (bannersLength < 5) {
          //   bannersCoeff++;
          // }

          // getPosts(singles.length, postsPerPage, bannersLength - bannersCoeff, function(response) {
          getPosts(singles.length, postsPerPage, bannersCoeff, function(response) {
            printPosts(response.posts);
            printBanner(response.banner, response.posts);
            setTimeout(function() {
              lazy.refresh();
            }, 25);
          });
        }
      }
    });
    // setBtnVisibility();

    // loadMoreBtn.addEventListener('click', function() {
    //   loadMoreBtn.classList.add('disabled');
    //   loadMoreBtn.classList.add('active');


    //   let singles = mediaCenterBlock.querySelectorAll('.single-card'),
    //     bannersLength = mediaCenterBlock.querySelectorAll('.service-block').length;

    //   if (bannersLength === 5) {
    //     bannersCoeff = 5;
    //   }
    //   if (bannersLength < 5) {
    //     bannersCoeff++;
    //   }

    //   getPosts(singles.length, postsPerPage, bannersLength - bannersCoeff, function(response) {
    //     printPosts(response.posts);
    //     printBanner(response.banner, response.posts);
    //     setTimeout(function() {
    //       setBtnVisibility();
    //       lazy.refresh();
    //     }, 25);
    //   });
    // });

  }
})();