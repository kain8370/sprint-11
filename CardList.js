class CardList {
    constructor(container, cardsArray) {
      this.container = container;
      this.cardsArray = cardsArray;
    }

    render() {
      for (let i = 0; i < this.cardsArray.length; i++) {
        this.container.appendChild(cardsArray[i].cardElement);
      }
    }

    addCard(card) {
      this.container.appendChild(card.cardElement);
      document.querySelector('.popup').classList.remove('popup_is-opened');
      form.reset();
    }
}
