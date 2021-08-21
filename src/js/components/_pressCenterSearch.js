;(function() {

  if (searchInp) {

     let searchResult = document.querySelector('.search__result'),
      searchResultList = searchResult.querySelector('.search__result-list'),
      searchStartText = searchResult.querySelector('.search__start'),
      searchNoResultsText = searchResult.querySelector('.search__noresult'),
      posts,
      insertMark = function(string, pos, length) {
        return string.slice(0, pos) + '<span class="mark">' + string.slice(pos, pos + length) + '</span>' + string.slice(pos + length);
      },
      closeResultsWIndow = function() {
        this.value = '';
        searchResultList.innerHTML = '';

        searchResult.classList.add('hide');
        showNoResults();
      },
      openResultsWindow = function() {
        searchResult.classList.remove('hide');
      },
      removeEvent = function() {
        searchInp.removeEventListener('blur', closeResultsWIndow);
      },
      addEvent = function() {
        searchInp.addEventListener('blur', closeResultsWIndow);
      },
      showNoResults = function() {
        searchNoResultsText.classList.remove('hide');
        searchStartText.classList.add('hide');
      };
      forbidInput = function() {
        this.value = '';
      };


    searchInp.addEventListener('focus', function() {
      searchInp.classList.add('focused');
      searchInp.value = '';

      if (!posts) {
        searchInp.classList.add('searching');
        searchInp.addEventListener('input', forbidInput);

        let xhr = new XMLHttpRequest();
        xhr.open('POST', `${dir}/search.php`);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`search=${searchInp.value}`);

        xhr.addEventListener('readystatechange', function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            searchInp.classList.remove('searching');
            searchInp.removeEventListener('input', forbidInput);
            if (xhr.response) {
              posts = JSON.parse(xhr.response);

              openResultsWindow();
              searchInp.addEventListener('blur', closeResultsWIndow);
              searchResult.addEventListener('mousedown', removeEvent);
              searchResult.addEventListener('mouseup', addEvent);
              searchResult.addEventListener('touchstart', removeEvent);
              searchResult.addEventListener('touchend', addEvent);
              searchInp.addEventListener('focus', openResultsWindow);
              searchInp.addEventListener('input', function() {
                let html = '';

                for (let key in posts) {
                  let post = posts[key],
                    searchRegExp = new RegExp(searchInp.value, 'gi'),
                    startPos = post.title.search(searchRegExp);

                  if (startPos !== -1) {
                    let postLink = post.link,
                      postTitle = insertMark(post.title, startPos, searchInp.value.length);
                      console.log(postTitle);
                      searchStartText.classList.add('hide');

                    html += `<a href="${postLink}" class="search__result-link" title="Перейти на страницу статьи">${postTitle}</a>`;
                  }

                  if (searchInp.value === '') {
                    html = '';
                  }
                }

                searchResultList.innerHTML = '';
                searchResultList.insertAdjacentHTML('beforeend', html);

                if (searchInp.value !== '' && searchResultList.innerHTML === '') {
                  showNoResults();
                } else {
                  searchNoResultsText.classList.add('hide');
                }

                if (searchInp.value === '' && searchResultList.innerHTML === '') {
                  searchStartText.classList.remove('hide');
                }

              });

            } else {
              // записей нет
            }
          }
        });
      }
    });

    searchInp.addEventListener('blur', function() {
        searchInp.classList.remove('focused', 'searching');
        searchInp.removeEventListener('input', forbidInput);
    });

  }

})();