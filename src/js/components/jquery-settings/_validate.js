;
(function() {
  let thanksPopupTimer,
    callbackPopupTimer,
    thanksPopup = $('.thanks-popup'),
    callbackPopup = $('.callback-popup'),
    overlay = $('.overlay');

  closeThanksPopup = function() {
    thanksPopup.css('animation', 'fadeOut .5s');

    if (overlay.hasClass('active') && !callbackPopup.hasClass('active')) {
      overlay.css('animation', 'fadeOut .5s');
    }
  };

  $('form').each(function() {
    $(this).validate({
      rules: {
        'user-name': {
          required: true,
          userName: true,
          minlength: 2
        },
        'user-tel': {
          required: true,
          userPhone: true
        },
        'user-email': {
          // required: true,
          email: true
        },
        'privacy-policy': {
          required: true,
          minlength: 1
        },
        'company-name': {
          // required: true,
          minlength: 2
        }
      },
      messages: {
        'user-name': {
          required: 'Укажите имя',
          minlength: jQuery.validator.format('Имя не может быть таким коротким'),
          userName: 'Допустимы только буквы'
        },
        'user-tel': {
          required: 'Укажите телефон',
          userPhone: 'Укажите верный номер телефона'
        },
        'user-email': {
          // required: 'Укажите E-mail',
          email: 'Укажите верный E-mail'
        },
        'privacy-policy': {
          required: 'Согласитель с политикой обработки персональных данных'
        },
        'company-name': {
          // required: 'Укажите название компании',
          minlength: jQuery.validator.format('Название компании не может быть таким коротким')
        }
      },
      onfocusout: false,
      errorClass: 'invalid',
      submitHandler: function(form, event) {
        event.preventDefault();

        // let inputs = form.querySelectorAll('.form__inp, textarea');
        // console.log('msg');
        // for (let i = 0; i < inputs.length; i++) {
        //   inputs[i].value = "";
        // }

        // $(this)[0].resetForm();

        thanksPopup.addClass('active');
        if (!overlay.hasClass('active')) {
          overlay.addClass('active');
        }
        thanksPopupTimer = setTimeout(function() {
          closeThanksPopup();
        }, 3000);

        callbackPopupTimer = setTimeout(function() {
          callbackPopup[0].close();
        }, 5000);
      }
    });
  });

  // form beforesubmit validate
  $('form .btn, form .submit').on('click', function() {
    if (!$(event.target).parents('form').valid()) {
      event.preventDefault();
    }
  });

  thanksPopup.on('click', function() {
    closeThanksPopup();
    clearTimeout(thanksPopupTimer);
    clearTimeout(callbackPopupTimer);
  });

  $('.thanks-popup, .overlay').on('animationend', function() {
    if (event.animationName === 'fadeOut') {
      $(this).removeClass('active');
      $(this).css('animation', '');
    }
  });

})();

let commentForm = document.querySelector('#commentform');
if (commentForm) {
  commentForm.validate().destroy();
  commentForm.validate({
    messages: {
      author: {
        required: 'Укажите имя или ник'
      },
      email: {
        required: 'Укажите Email',
        email: 'Укажите верный Email'
      },
      comment: {
        required: 'Напишите комментарий'
      }
    },
    // submitHandler: function(form, event) {
    //   event.preventDefault();
    //   console.log('submit');
    // }
  });
}




// $.validator.methods.userEmail = function(value, element) {
//   return /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/.test(value);
// };

$.validator.methods.userPhone = function(value, element) {
  return /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/.test(value);
};

$.validator.methods.userName = function(value, element) {
  return /^[а-яёА-ЯЁa-zA-Z\s]+$/.test(value);
};