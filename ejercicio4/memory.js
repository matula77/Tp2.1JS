class Card {
    constructor(name, img) {
        this.name = name;
        this.img = img;
        this.isFlipped = false;
        this.element = this.#createCardElement();
    }
    /*Para completar la implementación, se solicita realizar las siguientes tareas:

    1. Se solicita completar la implementación de la clase `Card`.
    
        - Definir el método `toggleFlip()` 
        vvoltear
        que cambia el estado de volteo de la carta en función de su estado actual.
        - Implementar el método `matches(otherCard)` que verifica si la carta actual coincide con otra carta.
    */
    toggleFlip(){
    this.isFlipped = !this.isFlipped;
    }
    matches(otherCard){
    return this.name === otherCard.name;
    }

    #createCardElement() {
        const cardElement = document.createElement("div");
        cardElement.classList.add("cell");
        cardElement.innerHTML = `
          <div class="card" data-name="${this.name}">
              <div class="card-inner">
                  <div class="card-front"></div>
                  <div class="card-back">
                      <img src="${this.img}" alt="${this.name}">
                  </div>
              </div>
          </div>
      `;
        return cardElement;
    }

    #flip() {
        const cardElement = this.element.querySelector(".card");
        cardElement.classList.add("flipped");
    }

#unflip() {
        const cardElement = this.element.querySelector(".card");
        cardElement.classList.remove("flipped");
    }
}

class Board {
    constructor(cards) {
        this.cards = cards;
        this.fixedGridElement = document.querySelector(".fixed-grid");
        this.gameBoardElement = document.getElementById("game-board");
    }
/*2. Se solicita completar la implementación de la clase `Board`.

    - Implementar el método `shuffleCards()` que mezcla las cartas del tablero. 
    El criterio de mezcla esta dispuesto a elección del estudiante.
    - Implementar el método `reset()` que reinicia el tablero.
    - Implementar el método `flipDownAllCards()` que posiciona todas las cartas en su estado 
    inicial. Es necesario para reiniciar el tablero.
    - Implementar el método `reset()` que reinicia el tablero. Debe emplear otros métodos de la 
    clase `Board` para realizar esta tarea.
    */
   shuffleCards() {
    this.cards.forEach(card => {
        const randomIndex = Math.floor(Math.random() * this.cards.length);// entrevera las cartas por la longitud 
        const temp = this.cards[randomIndex];
        this.cards[randomIndex] = card;
        card.element = temp.element;
        });
        }
    flipDownAllCards(){
            this.cards.forEach(card => {
            card.flip();
            });
        }
    reset() {
        this.cards.forEach(card => {
        card.element.remove();
        });
    }
    
    #calculateColumns() {
        const numCards = this.cards.length;
        let columns = Math.floor(numCards / 2);

        columns = Math.max(2, Math.min(columns, 12));

        if (columns % 2 !== 0) {
            columns = columns === 11 ? 12 : columns - 1;
        }

        return columns;
    }

    #setGridColumns() {
        const columns = this.#calculateColumns();
        this.fixedGridElement.className = `fixed-grid has-${columns}-cols`;
    }

    render() {
        this.#setGridColumns();
        this.gameBoardElement.innerHTML = "";
        this.cards.forEach((card) => {
            card.element
                .querySelector(".card")
                .addEventListener("click", () => this.onCardClicked(card));
            this.gameBoardElement.appendChild(card.element);
        });
    }

    onCardClicked(card) {
        if (this.onCardClick) {
            this.onCardClick(card);
        }
    }
}

class MemoryGame {
    constructor(board, flipDuration = 500) {
        this.board = board;
        this.flippedCards = [];
        this.matchedCards = [];
        if (flipDuration < 350 || isNaN(flipDuration) || flipDuration > 3000) {
            flipDuration = 350;
            alert(
                "La duración de la animación debe estar entre 350 y 3000 ms, se ha establecido a 350 ms"
            );
        }
        this.flipDuration = flipDuration;
        this.board.onCardClick = this.#handleCardClick.bind(this);
        this.board.reset();
    }
/*3. Se solicita completar la implementación de la clase `MemoryGame`.

    - Implementar el método `checkForMatch()` que verifica si las cartas volteadas coinciden. 
    En caso de coincidir, las cartas deben ser añadidas al conjunto de cartas emparejadas. 
    Es fundamental para que el método `#handleCardClick()` funcione correctamente.
    - Implementar el método `resetGame()` que reinicia el juego.
     Debe emplear otros métodos de la clase `MemoryGame` para realizar esta tarea. 
*/
checkForMatch(){
    if(this.flippedCards.length === 2){
        const card1 = this.flippedCards[0];
        const card2 = this.flippedCards[1];
        if(card1.element === card2.element){
            return;
            }
            if(card1.value === card2.value){
                this.matchedCards.push(card1, card2);
                this.flippedCards = [];
                return;
                }
                this.flippedCards = [];
    setTimeout(() => {
                    this.board.flipCard(card1);
                    this.board.flipCard(card2);
                    }, this.flipDuration);
                    }
                    }
    resetGame(){
        this.board.reset();
        this.flippedCards = [];
        this.matchedCards = [];
        }

        

    #handleCardClick(card) {
        if (this.flippedCards.length < 2 && !card.isFlipped) {
            card.toggleFlip();
            this.flippedCards.push(card);

            if (this.flippedCards.length === 2) {
                setTimeout(() => this.checkForMatch(), this.flipDuration);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const cardsData = [
        { name: "Python", img: "./img/Python.svg" },
        { name: "JavaScript", img: "./img/JS.svg" },
        { name: "Java", img: "./img/Java.svg" },
        { name: "CSharp", img: "./img/CSharp.svg" },
        { name: "Go", img: "./img/Go.svg" },
        { name: "Ruby", img: "./img/Ruby.svg" },
    ];

    const cards = cardsData.flatMap((data) => [
        new Card(data.name, data.img),
        new Card(data.name, data.img),
    ]);
    const board = new Board(cards);
    const memoryGame = new MemoryGame(board, 1000);

    document.getElementById("restart-button").addEventListener("click", () => {
        memoryGame.resetGame();
    });
});
