export function formValidate(elem) {
  if (elem.target.value.length === 0) {
    elem.target.style.marginBottom = '4px';
    elem.target.nextElementSibling.textContent = 'Это обязательное поле';
  } else if (elem.target === document.querySelector('.popup__input_type_link-url') && elem.target.value.length > 1) {
  elem.target.nextElementSibling.textContent = '';
  } else if (elem.target.value.length < 2 || elem.target.value.length > 30) {
    elem.target.nextElementSibling.textContent = "Должно быть от 2 до 30 символов";
    elem.target.style.marginBottom = '4px';
    if (elem.target === document.querySelector('.popup__input_type_link-url')) {
      elem.target.nextElementSibling.textContent = "Должно быть от 2 символов";
    }
  } else {
    elem.target.nextElementSibling.textContent = '';
  }
  addActiveButton(elem.target.parentElement);
}