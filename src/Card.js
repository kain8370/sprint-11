export class Card {
    constructor(text, imgSrc, placesList) {
      this.text = text;
      this.imgSrc = imgSrc;
      this.placesList = placesList;
      this.likeButton = this.like.bind(this);
      this.removeButton = this.remove.bind(this);
      this.cardElement = this.create();
      this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.likeButton);
      this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.removeButton);
    }

    makeElement(tagName, className) {
      let element = document.createElement(tagName);
      element.classList.add(className);
      return element;
    }

    create() {
      let placeCard = this.makeElement('div', 'place-card');
      let cardImage = this.makeElement('div', 'place-card__image');
      placeCard.appendChild(cardImage);
      cardImage.appendChild(this.makeElement('button', 'place-card__delete-icon'));
      let cardDescription = this.makeElement('div', 'place-card__description');
      let cardName = this.makeElement('h3', 'place-card__name');
      cardName.textContent = this.text;
      cardDescription.appendChild(cardName);
      cardDescription.appendChild(this.makeElement('button', "place-card__like-icon"));
      placeCard.appendChild(cardDescription);
      cardImage.setAttribute('style', `background-image: url(${this.imgSrc})`);
      return placeCard;
    }

    like(event) {
      event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove(event) {
      let cardDelete = event.target.parentElement.parentElement;
      cardDelete.classList.add('del');
      event.target.removeEventListener('click', this.removeButton);
      cardDelete.querySelector('.place-card__like-icon').classList.add('.del');
      cardDelete.querySelector('.place-card__like-icon').removeEventListener('click', this.likeButton);
      let delElement = document.querySelector('.del');
      this.placesList.removeChild(delElement);
    }
}
