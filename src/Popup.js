export class Popup {
    constructor(form, formEdit) {
      this.popupOpen = document.querySelector('.user-info__button');
      this.buttonEdit = document.querySelector('.user-info__button-edit');
      this.form = form;
      this.formEdit = formEdit;
    }

    open(event) {
      if (event.target === this.popupOpen) {
        document.querySelector('.popup').classList.toggle('popup_is-opened');
      } else if (event.target === this.buttonEdit) {
        document.querySelector('.popup-edit').classList.toggle('popup_is-opened');
        document.querySelector('.popup-edit .popup__button').classList.add('popup__button_active');
      } else {
        document.querySelector('.popup-images').classList.toggle('popup_is-opened');
        let elemImg = document.createElement('img');
        elemImg.classList.add('big-image');
        elemImg.alt = 'Большое изображение';
        elemImg.src = event.target.style.backgroundImage.match(/"(.+)"/)[1];
        elemImg.style.maxWidth = '80vw';
        elemImg.style.maxHeight = '80vh';
        document.querySelector('.popup-images > .popup__content').appendChild(elemImg);
      }
    }

    close(event) {
      event.target.parentElement.parentElement.classList.toggle('popup_is-opened');
      if (event.target.parentElement.parentElement.classList.contains('popup-edit')) {
        this.formEdit.elements[0].value = document.querySelector('.user-info__name').textContent;
        this.formEdit.elements[1].value = document.querySelector('.user-info__job').textContent;
        let spans = this.formEdit.querySelectorAll('.popup__error');
        spans[0].textContent = '';
        spans[1].textContent = '';
      } else if (event.target.parentElement.parentElement.classList.contains('popup-images')) {
        event.target.parentElement.removeChild(document.querySelector('.big-image'));
      } else {
        this.form.reset();
        Array.from(document.querySelectorAll('.popup .popup__error')).forEach(elem => {
          elem.textContent = '';
        });
      }
    }
}
  
