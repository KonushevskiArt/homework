let isFormField = false;

const addError = (elem, message) => {
  try {
    const errorMessageElem = elem.nextElementSibling;
    elem.classList.add('error');
    errorMessageElem.textContent = message;
      elem.addEventListener('input', function removeErrorMessage() {
      elem.classList.remove('error');
      errorMessageElem.textContent = '';
      elem.removeEventListener('input', removeErrorMessage);
    })
  } catch (error) {}
}

const checkValidation = (elem) => {
  const inputName = elem.name;
  const value = elem.value.trim();
  let isValid = true; 

  switch (inputName) {
    case 'developers':
      isValid = /^[a-zA-Zа-яёА-ЯЁ ]+$/g.test(value);
      if (!isValid) {
        addError(elem, 'Введите корректное значение, допустимы только кириллические, латинские символы и пробел')
      }
      if (value.length < 2) {
        addError(elem, 'Количество символов должно быть больше 1');
      }
      break;
    case 'siteName':
      isValid = /^[a-zA-Z\d]+$/g.test(value);
      if (!isValid) {
        addError(elem, 'Введите корректное значение, допустимы только латинские символы и цифры')
      }
      if (value.length < 3) {
        addError(elem, 'Количество символов должно быть больше 2');
      }
      break;
    case 'url':
      isValid = /^[a-zA-Z\d]+\.[a-z]+$/g.test(value);
      if (!isValid) {
        addError(elem, 'Введите корректное значение, допустимы только латинские символы, цифры и точка')
      }
      if (value.length < 6) {
        addError(elem, 'Количество символов должно быть больше 5');
      }
      break;
    case 'visitorsPerMonth':
      isValid = elem.value > 0;
      if (!isValid) {
        addError(elem, 'Введите корректное значение, значение должно быть больше 0');
      }
      break;
    case 'email':
      isValid = /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/g.test(value);
      if (!isValid) {
        addError(elem, 'Введите корректный email!');
      }
      break;
    case 'description':
      isValid = /^[a-zA-Zа-яёА-ЯЁ ]+$/g.test(value);
      if (!isValid) {
        addError(elem, 'Введите корректное значение, допустимы только кириллические, латинские символы и пробел')
      }
      if (value.length < 11) {
        addError(elem, 'Количество символов должно быть больше 10');
      }
      break;
  }
}

const addValidator = (el) => {
  el.addEventListener('blur', (e) => {
    checkValidation(el);
  })
}

const formValidate = (formElem) => {
  // const elems = formElem.querySelectorAll('input, select, textarea');
  const elems = Array.from(formElem.elements).filter(el => el.nodeName !== 'BUTTON');

  elems.forEach(el => {
    addValidator(el);
  })

  formElem.addEventListener('submit', (e) => {
    e.preventDefault();

    elems.forEach(el => {

      if (el.type === 'radio') {
        const radioSet = formElem.querySelectorAll(`[name=${el.name}]`); 
        const radioChecked = Array.from(radioSet).filter((radio) => radio.checked)[0];
        if (!radioChecked) {
          addError(el.parentElement, 'Поле должно быть заполнено!');  
        }
      } else if(el.tagName === 'SELECT' && el.value === '0') {
        addError(el, 'Поле должно быть заполнено!');
      } else if(el.type === 'checkbox' && !el.checked) {
        if (!isFormField) {
          addError(el, 'Поле должно быть заполнено!');
        }
      } else if (el.value === '') {
        addError(el, 'Поле должно быть заполнено!');
      }
    })

    const firstElemWidthError = formElem.querySelector('.error');

    if (!firstElemWidthError) {
      formElem.submit();
    } else {
      firstElemWidthError.focus();
    }
  })
}

formValidate(document.forms.siteDescription);