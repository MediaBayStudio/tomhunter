// ;(function() {
//   let relatedSinglesBlock = document.querySelector('.related-singles');

//     if (relatedSinglesBlock) {
//       let currentPostTitle = document.querySelector('.single-sect__title').innerText,
//         url = siteurl + '/wp-admin/admin-ajax.php',
//         xhr = new XMLHttpRequest(),
//         showedPosts = [];

//     xhr.open('POST', url);
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr.send('action=loadmore');

//     xhr.addEventListener('readystatechange', function() {
//       if (xhr.readyState === 4 && xhr.status === 200) {

//         let response = JSON.parse(xhr.response);

//         posts.all = response['posts'];
//         banners = response['banners'];

        
//         // filter posts
//         for (let i = 0; i < posts.all.length; i++) {
//           let post = posts.all[i];
//           if (post.title !== currentPostTitle) {
//             showedPosts.push(post);
//           }

          

//           if (showedPosts.length === 3) {
//             break;
//           }

//         }

//         for (let key in showedPosts) {
//           let {category, title, preview_descr, link, date, images} = showedPosts[key],
//               categoryNames = []

//           for (let j = 0; j < category.length; j++) {
//             categoryNames.push(category[j].name);
//           }

//           let categoryText = categoryNames.join(', '),
//             html =
//             `<article class="single-card">
//               <img src="#" alt="#"
//                 data-src="image-set(${images.post_card_320} 1x, ${images.post_card_320_x2} 2x, ${images.post_card_320_x2} 3x)"
//                 data-media="(min-width: 767.98px) {image-set(${images.post_card_768} 1x, ${images.post_card_768_x2} 2x, ${images.post_card_768_x3} 3x)}
//                             (min-width: 1319.98px) {image-set(${images.post_card_1440} 1x, ${images.post_card_1440_x2} 2x)}" class="single-card__img lazy">
//               <span class="single-card__category">${categoryText}</span>
//               <a href="${link}"><strong class="single-card__title">${title}</strong></a>
//               <p class="single-card__descr">${preview_descr}</p>
//               <div class="single-card__bottom">
//                 <a href="${link}" class="single-card__link link_red">Читать...</a>
//                 <span class="single-card__date">${date}</span>
//               </div>
//             </article>`;

//           relatedSinglesBlock.insertAdjacentHTML('beforeend', html);
//         }

//         lazy.refresh();
//         buildRelatedSinglesSlider();
//       }
//     });
//     }
// })();