export function checkValidity(elem) {
  if (elem.value.length === 0) {
    return false;
  }
  if (elem === document.querySelector('.popup__input_type_link-url')) {
    if (elem.value.length < 2) {
      return false;
    } else {
      return true;
    }
  }
  if (elem.value.length < 2 || elem.value.length > 30) {
    return false;
  }
  return true;
}