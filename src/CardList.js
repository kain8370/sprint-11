export class CardList {
    constructor(container, cardsArray, form) {
      this.container = container;
      this.cardsArray = cardsArray;
      this.form = form;
    }

    render() {
      for (let i = 0; i < this.cardsArray.length; i++) {
        this.container.appendChild(this.cardsArray[i].cardElement);
      }
    }

    addCard(card) {
      this.container.appendChild(card.cardElement);
      document.querySelector('.popup').classList.remove('popup_is-opened');
      form.reset();
    }
}
