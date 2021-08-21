;(function() {
  let mediaCenterBlock = document.querySelector('.media-center-block');
  searchInp = document.querySelector('.search__inp');

  if (mediaCenterBlock) {
    document.body.removeChild(document.querySelector('.postcat'));
    searchInp = document.querySelector('.search__inp');

    let loadMoreBtn = document.querySelector('.load-more-btn'),
      pageLoader = document.querySelector('.media-center-sect > .loader-bg'),
      sortBlock = document.querySelector('.sort-block'),
      currentCategoryName = POSTCAT,
      currentPageNumber = 1,
      url = siteurl + '/wp-admin/admin-ajax.php',
      setPostsCounter = function() {
        if (matchMedia('(min-width: 1319.98px)').matches) {
          postsPerPage = 7;
        } else if (matchMedia('(min-width: 767.98px)').matches) {
          postsPerPage = 5;
        } else {
          postsPerPage = 3;
        }
      },
      // printPosts = function(start, counter) {
      //   if (posts.count > 0) {
      //     // console.log(posts);
      //     let cardsWrapper;

      //     // на больших экранах создаем обертку для 4-х карточек и баннера
      //     // только если карточек 7 и более
      //     if (postsCounter === 7 && posts.count >= counter) {
      //       cardsWrapper = document.createElement('div');
      //       cardsWrapper.classList.add('cards-wrapper');
      //     }

      //     for (let i = start, len = counter; i < len; i++) {
      //       if (posts[i]) {
      //         if (posts[i] === 'number') {
      //           continue;
      //         }
      //         let {category, title, preview_descr, link, date, images} = posts[i];

      //         let html =
      //           `<article class="single-card">
      //             <a href="${link}" class="single-card__img-wrap">
      //               <img src="#" alt="#"
      //                 data-src="image-set(${images.post_card_320} 1x, ${images.post_card_320_x2} 2x, ${images.post_card_320_x2} 3x)"
      //                 data-media="(min-width: 767.98px) {image-set(${images.post_card_768} 1x, ${images.post_card_768_x2} 2x, ${images.post_card_768_x3} 3x)}
      //                             (min-width: 1319.98px) {image-set(${images.post_card_1440} 1x, ${images.post_card_1440_x2} 2x)}" class="single-card__img lazy">
      //             </a>
      //             <span class="single-card__category">${category}</span>
      //             <a href="${link}" class="single-card__title-wrap"><strong class="single-card__title">${title}</strong></a>
      //             <p class="single-card__descr">${preview_descr}</p>
      //             <div class="single-card__bottom">
      //               <a href="${link}" class="single-card__link link_red">Читать...</a>
      //               <span class="single-card__date">${date}</span>
      //             </div>
      //           </article>`;

      //         // оборачиваем 4 первые карты в обертку
      //         if (cardsWrapper && postsCounter === 7 && i < counter - 3) {
      //           cardsWrapper.insertAdjacentHTML('beforeend', html);
      //         } else {
      //           mediaCenterBlock.insertAdjacentHTML('beforeend', html);
      //         }
      //       } // end if posts[i]
      //     } // end for

      //     if (cardsWrapper) {
      //       if (mediaCenterBlock.children[0].classList.contains('cards-wrapper')) {
      //         mediaCenterBlock.insertBefore(cardsWrapper, mediaCenterBlock.children[start - 3]);
      //       } else {
      //         mediaCenterBlock.insertBefore(cardsWrapper, mediaCenterBlock.children[start]);
      //       }
      //     }

      //     currentPosts = mediaCenterBlock.querySelectorAll('.single-card');
      //     currentPostsLength = currentPosts.length;

      //     // скрываем кнопку "загрузить еще", если записей больше нет
      //     if (posts.count > currentPostsLength) {
      //       loadMoreBtn.classList.remove('hide');
      //     }

      //     // выводим на экран баннеры
      //     if (currentPostsLength % postsCounter === 0) {
      //       let bannerCount = (counter / postsCounter) - 1;

      //       // если нужно вывести баннер, а они уже закончились, то начинаем сначала
      //       if (bannerCount > banners.length - 1) {
      //         // console.log('msg');
      //         // console.log('counter:' + counter);
      //         // console.log('postsCounter:' + postsCounter);
      //       } else {
      //         printBanner(bannerCount);
      //       }


      //       // вставляем в нужные места
      //       if (postsCounter === 5) {
      //         let lastSingleCard = mediaCenterBlock.querySelector('.single-card:last-of-type');
      //         mediaCenterBlock.insertAdjacentElement('beforeend', lastSingleCard);

      //       } else if (postsCounter === 7) {
      //         let lastBanner = mediaCenterBlock.querySelector('.service-block:last-child');
      //         cardsWrapper.insertBefore(lastBanner, cardsWrapper.children[2]);
      //       }

      //     }

      //     lazy.refresh();

      //   } else {
      //     mediaCenterBlock.innerHTML = '<p class="posts-no-found">Статей в этом разделе не найдено</p>';
      //     if (postsCounter === 7) {
      //       for (let i = 0; i < 3; i++) {
      //         printBanner(i);
      //       }
      //     } else if (postsCounter === 5) {
      //       for (let i = 0; i < 2; i++) {
      //         printBanner(i);
      //       }
      //     } else {
      //       printBanner(0);
      //     }

      //     lazy.refresh();
      //   }
      // },
      // printBanner = function(start) {
      //   if (banners) {
      //     for (let i = start; i < start + 1; i++) {
            // let {title, descr, link, images} = banners[i],
            //   img320 = images.img_320,
            //   img768 = images.img_768,
            //   html =
            //   `<a href="${link.url}" class="service-block" title="Перейти на страницу ${title}">
            //     <img src="#" alt="${img320.alt}" class="service-block__img lazy"
            //     data-src="${img320.src}"
            //     data-media="(min-width: 1319.98px) {${img768.src}}">
            //     <strong class="service-block__title">${title}</strong>
            //     <p class="service-block__descr">${descr}</p>
            //     <span class="service-block__link">${link.title}</span>
            //   </a>`;
      //       mediaCenterBlock.insertAdjacentHTML('beforeend', html);
      //     }
      //   }
      // },
      // loadMore = function() {
      //   showPostsCounter = postsCounter + currentPostsLength;
      //   // console.log(showPostsCounter);

      //   if (showPostsCounter >= posts.count) {
      //     loadMoreBtn.classList.add('hide');
      //   }

      //   printPosts(currentPostsLength, showPostsCounter);
      // },
      getPosts = function(postOffset, postsPerPage, callback) {
        let xhr = new XMLHttpRequest(),
          date = 'action=loadmore&termId=' + currentCategoryName + '&postOffset=' + postOffset + '&postsPerPage=' + postsPerPage;

        xhr.open('POST', url + '/wp-admin/admin-ajax.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(date);

        xhr.addEventListener('readystatechange', function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            // loader.style.animation = 'fadeOut .5s';
            let response = JSON.parse(xhr.response);
            console.log(response);
            if (response.posts) {
              // if (!productsLength) {
                // (productsLength = response.length);
              // }
              // callback && callback(response.products);
            } else {
              // productsBlock.insertAdjacentHTML('beforeend', '<p class="catalog-empty">Товаров в этой категории нет</p>');
            }
          }
        });
      },
      setBtnVisibility = function(showCallback, hideCallback) {
        // console.log(`pageProductsLength: ${pageProductsLength}`);
        // console.log(`productsLength: ${productsLength}`);
        if (postsOnPage.length < postsTotalLength) {
          console.log('show btn');
          // moreBtnLoader.classList.remove('active');
          loadMoreBtn.classList.remove('hide', 'disabled');
          showCallback && showCallback();
        } else {
          console.log('hide btn');
          loadMoreBtn.classList.add('hide');
          hideCallback && hideCallback();
        }
      },
      printBanner = function(start) {
        console.log(banners);
        if (banners) {
          for (let i = start; i < start + 1; i++) {
            let {title, descr, link, images} = banners[i],
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
            mediaCenterBlock.insertAdjacentHTML('beforeend', html);
          }
        }
      },
      // getPosts2 = function() {
      //   // console.log(`currentCategoryName : ${currentCategoryName}`);
      //   // console.log(`postsCounter : ${postsCounter}`);
      //   // console.log(`currentPostsLength : ${currentPostsLength}`);
      //   let xhr = new XMLHttpRequest();

      //   xhr.open('POST', url);
      //   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      //   xhr.send(`action=loadmore&category=${currentCategoryName}&count=${postsCounter}&offset=${currentPostsLength}$posts_per_page=-1`);

      //   xhr.addEventListener('readystatechange', function() {
      //     if (xhr.readyState === 4 && xhr.status === 200) {

      //       pageLoader && pageLoader.classList.remove('active');
      //       sortBlock.classList.remove('disabled');
      //       searchInp.parentElement.classList.remove('disabled');

      //       let response = JSON.parse(xhr.response);

      //       posts = response['posts'];
      //       banners = response['banners'];

      //       printPosts(0, postsCounter);
      //       // console.log(posts);

      //     } else if (xhr.readyState === 4 && xhr.status !== 200) {
      //       pageLoader && pageLoader.classList.remove('active');
      //       let html = '<p>Возникла какая-то ошибка, попробуйте обновить страницу</p>';
      //       mediaCenterBlock.insertAdjacentHTML('beforeend', html);
      //     }
      //   });
      // },
      showStartPosts = function() {
        let bannerOnPage = mediaCenterBlock.querySelector('.service-block.hide'),
          mediaCenterChilds = mediaCenterBlock.children;

        let diff = postsPerPage < mediaCenterChilds.length - 1 ? mediaCenterChilds.length - 1 - postsPerPage : 0;

        for (let i = 0; i < diff; i++) {
          mediaCenterBlock.removeChild(mediaCenterBlock.children[mediaCenterBlock.children.length - 2]);
        }

        for (let i = 0; i < mediaCenterChilds.length; i++) {
          if (mediaCenterChilds[i].classList.contains('single-card')) {
            postsOnPage.push(mediaCenterChilds[i]);
          }
        }

        if (postsOnPage.length >= postsPerPage) {
          bannerOnPage.classList.remove('hide');
          bannersOnPage.push(bannerOnPage);
        }

        // wrapPostsAndBanner();
        // setBtnVisibility();
      },
      wrapPostsAndBanner = function() {
        let cardsWrapper,
          mediaCenterChilds = mediaCenterBlock.children;

        // на больших экранах создаем обертку для 4-х карточек и баннера
        // только если карточек 7 и более
        if (postsPerPage === 7 && mediaCenterChilds.length >= 5) {
          cardsWrapper = document.createElement('div');
          cardsWrapper.classList.add('cards-wrapper');
        }

        for (let i = 0; i < 4; i++) {
          cardsWrapper.insertAdjacentElement('afterbegin', mediaCenterChilds[0]);
        }

        cardsWrapper.insertAdjacentElement('beforeend', bannersOnPage[0]);

        mediaCenterBlock.insertAdjacentElement('afterbegin', cardsWrapper);

      },
      banners,
      bannersOnPage = [],
      postsOnPage = [],
      postsPerPage = 0,
      postsTotalLength = mediaCenterBlock.dataset.length,
      currentPosts,
      currentPostsLength = 0,
      showPostsCounter = 0;

    setPostsCounter();
    // showStartPosts();
    // getPosts();
    // loadMoreBtn.addEventListener('click', loadMore);

    loadMoreBtn.addEventListener('click', function() {
      loadMoreBtn.classList.add('disabled');
      loadMoreBtn.classList.add('active');

      console.log(`postsOnPage.length: ${postsOnPage.length}`);
      console.log(`postsPerPage: ${postsPerPage}`);

      getPosts(postsOnPage.length, postsPerPage, function(response) {
        printPosts(response);
        setBtnVisibility();
      });
    });

  let cardsWrapper = mediaCenterBlock.querySelector('.cards-wrapper');

  if (cardsWrapper) {
    let cardsWrapperChilds = spread(cardsWrapper.children),
      containsBanner = cardsWrapperChilds.some(function(el){ return el.tagName === 'A'; });

    if (containsBanner) {
      // cardsWrapper.style.display = 'flex';
      cardsWrapper.classList.add('wrapped');
    }


  }

  }

})();