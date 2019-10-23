'use strict';

const placesList = document.querySelector('.places-list');
const popupEdit = document.querySelector('.popup-edit');
const form = document.forms.new;
const formEdit = document.forms.second;
let cardsArray = [];
let cardsList = new CardList(document.querySelector('.places-list'), cardsArray);
const config = {
  url: 'http://95.216.175.5/cohort2',
  headers: {
    authorization: 'c39118be-f59d-44d8-b478-001a851a6b1e',
    'Content-Type': 'application/json',
  }
}

function checkValidity(elem) {
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

function formValidate(elem) {
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

function addActiveButton(elem) {
  let submitButton = elem.querySelector('.popup__button');
  if (checkValidity(elem.elements[0]) && checkValidity(elem.elements[1])) {
    submitButton.classList.contains('popup__button_active') ? false : submitButton.classList.add('popup__button_active')
  } else {
    submitButton.classList.contains('popup__button_active') ? submitButton.classList.remove('popup__button_active') : true;
  }
}

function showBigImage(event) {
  if (event.target.classList.contains('place-card__image')) {
    popup.open(event);
  }
}

document.querySelector('.place-card__like-icon').addEventListener('click', function(event) {
  event.target.classList.toggle('place-card__like-icon_liked');
});

document.querySelector('.place-card__delete-icon').addEventListener('click', function(event) {
  event.target.parentElement.parentElement.classList.add('del');
  let delElement = document.querySelector('.del');
  document.querySelector('.places-list').removeChild(delElement);
});

document.querySelector('.user-info__button').addEventListener('click', function(event) {
  popup.open(event);
})
Array.from(document.querySelectorAll('.popup__close')).forEach( function(item) {
  item.addEventListener('click', function(event) {
    popup.close(event);
  });
});

document.querySelector('.user-info__button-edit').addEventListener('click', function() {
  popup.open(event);
})

placesList.addEventListener('click', showBigImage);

document.querySelector('.popup').addEventListener('submit', function(event) {
  event.preventDefault();
  if (checkValidity(event.target.elements[0]) && checkValidity(event.target.elements[1])) {
    api.sendImage(event.target.elements[0].value, event.target.elements[1].value)
      .then((res) => {
        console.log(res);
        let card = new Card(res.name, res.link);
        cardsList.addCard(card);
      })
      .catch((err) => {
        console.log(err); 
      })
  }
});

popupEdit.addEventListener('submit', (event) => {
  event.preventDefault();
  if (checkValidity(event.target.elements[0]) && checkValidity(event.target.elements[1])) {
    api.sendUser(event.target.elements[0].value, event.target.elements[1].value)
      .then(res => {
        document.querySelector('.user-info__name').textContent = res.name;
        document.querySelector('.user-info__job').textContent = res.about;
      })
      .catch((err) => {
        console.log(err); 
      });
    popupEdit.classList.remove('popup_is-opened');
  }
})

form.elements[0].addEventListener('input', formValidate);
form.elements[1].addEventListener('input', formValidate);
formEdit.elements[0].addEventListener('input', formValidate);
formEdit.elements[1].addEventListener('input', formValidate);

let api = new Api(config);
api.getData()
  .then(user => {
    document.querySelector('.user-info__name').textContent = user.name;
    document.querySelector('.user-info__job').textContent = user.about;
    document.querySelector('.user-info__photo').setAttribute('style', `background-image: url(${user.avatar})`);
    formEdit.elements.name.value = document.querySelector('.user-info__name').textContent;
    formEdit.elements.info.value = document.querySelector('.user-info__job').textContent;
  })
   .catch( err => {
     console.log(err);
   })

api.getInitialCards()
  .then(cards => {
    for(let i = 0; i < cards.length; i++) {
      cardsArray.push(new Card(cards[i].name, cards[i].link));
    };
  })
  .then(() => {
    cardsList.render();
  })
  .catch();

let popup = new Popup();












