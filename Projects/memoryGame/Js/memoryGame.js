let openCards = [];
let canClick = true;

async function cardDeckCreator() {
    try {
        const deckOfCardsResponse = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        const deckOfCards = await deckOfCardsResponse.json();

        const cardsResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckOfCards.deck_id}/draw/?count=5`);
        const createdCards = await cardsResponse.json();

        let gameCards = [];
        for (let card of createdCards.cards) {
            gameCards.push({
                image: card.image,
                value: card.value,
                suit: card.suit,
                valueAndSuit: `${card.value}_${card.suit}`
            });
            gameCards.push({
                image: card.image,
                value: card.value,
                suit: card.suit,
                valueAndSuit: `${card.value}_${card.suit}`
            });
        }

        return gameCards.sort(() => Math.random() - 0.5);
    } catch (error) {
        console.log(new Error(error));
        const cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
        return cards.sort(() => Math.random() - 0.5);
    }
}

async function startGame() {
    const gameCards = await cardDeckCreator();

    //create cards
    for (let randomCard of gameCards) {
        let card = document.createElement("div");
        card.className = "card";

        card.dataset.cardValue = randomCard.value;
        card.dataset.cardSuit = randomCard.suit;
        card.dataset.cardValueAndSuit = randomCard.valueAndSuit;

        card.innerHTML = `
            <div class="cardFlipping">
                <div class="cardFront">
                <img src="https://deckofcardsapi.com/static/img/back.png" alt="card back">
                </div>
                <div class="cardBack">
                    <img src="${randomCard.image}" alt="card">
                </div>
            </div>`;

        //click on card
        card.addEventListener("click", function () {
            //check if can click 
            if (canClick == false) return;

            //flipped card
            if (this.classList.contains("flipped")) return;

            //matched cards
            if (this.classList.contains("match")) return;

            //flip card
            this.classList.add("flipped");

            if (openCards.length < 2) {
                openCards.push(this);
                if (openCards.length === 2) {
                    canClick = false;
                }
            }
            checkCards();
        })

        //append card to board
        document.querySelector(".board").appendChild(card);
    }

}

function checkCards() {
    if (openCards.length === 2) {
        const firstCard = openCards[0].dataset.cardValueAndSuit;
        const secondCard = openCards[1].dataset.cardValueAndSuit;
        if (firstCard == secondCard) {
            setTimeout(() => {
                openCards[0].classList.add("match");
                openCards[1].classList.add("match");
                openCards = [];
                canClick = true;
                if (document.querySelectorAll(".match").length == document.querySelectorAll(".card").length) {
                    alert("You Win!");
                }
            }, 800)
        } else {
            canClick = false;
            setTimeout(function () {
                openCards[0].classList.remove("flipped");
                openCards[1].classList.remove("flipped");
                openCards = [];
                canClick = true;
            }, 800)
        }
    }
}

//start game
startGame();

function reset() {
    location.reload();
}