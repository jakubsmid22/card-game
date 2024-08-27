const symbols = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const colors = ["Heart.png", "diamond.png", "club.png", "spade.png"];
const player1CardsE = document.getElementById("player1-cards");
const player2CardsE = document.getElementById("player2-cards");
const player1CardE = document.getElementById("player1-card");
const player2CardE = document.getElementById("player2-card");
let player1Cards = [];
let player2Cards = [];
let cardsOnTable = [];
const placeCardBtn = document.querySelector(".place-card-btn");
const winner = document.getElementById("winner");

class Card {
  constructor(symbol, color) {
    this.symbol = symbols[symbol];
    this.color = colors[color];
  }
}

function initializeGame() {
  player1Cards = [];
  player2Cards = [];
  cardsOnTable = [];
  winner.textContent = "";
  placeCardBtn.textContent = "NEXT CARD";

  for (let index = 0; index < 20; index++) {
    const card = new Card(
      Math.floor(Math.random() * symbols.length),
      Math.floor(Math.random() * colors.length)
    );
    const card2 = new Card(
      Math.floor(Math.random() * symbols.length),
      Math.floor(Math.random() * colors.length)
    );
    player1Cards.push(card);
    player2Cards.push(card2);
  }

  player1CardsE.querySelector(".cards-num").textContent = player1Cards.length;
  player2CardsE.querySelector(".cards-num").textContent = player2Cards.length;

  player1CardsE.querySelector(".big-symbol").src = player1Cards[0].color;
  player2CardsE.querySelector(".big-symbol").src = player2Cards[0].color;

  updateCardDisplay(player1CardsE, player1Cards[0]);
  updateCardDisplay(player2CardsE, player2Cards[0]);

  player1CardE.classList.add("hide");
  player2CardE.classList.add("hide");
}

function updateCardDisplay(element, card) {
  element.querySelectorAll(".symbol").forEach((symbol) => {
    symbol.textContent = card.symbol;
    symbol.style.color = card.color === "Heart.png" ? "red" : "black";
  });
  element.querySelectorAll(".color").forEach((color) => {
    color.src = card.color;
  });
}

placeCardBtn.addEventListener("click", () => {
  if (player1Cards.length === 0 || player2Cards.length === 0) {
    resetGame();
    return;
  }

  placeCardBtn.textContent = "NEXT CARD";

  cardsOnTable.push(player1Cards.pop());
  cardsOnTable.push(player2Cards.pop());

  updateCardDisplay(player1CardE, cardsOnTable[0]);
  updateCardDisplay(player2CardE, cardsOnTable[1]);

  player1CardE.classList.remove("hide");
  player2CardE.classList.remove("hide");

  player1CardsE.querySelector(".cards-num").textContent = player1Cards.length;
  player2CardsE.querySelector(".cards-num").textContent = player2Cards.length;

  if (player1Cards.length === 0 || player2Cards.length === 0) {
    if (player1Cards.length === 0) {
      winner.textContent = "PLAYER 2 WINS";
    } else {
      winner.textContent = "PLAYER 1 WINS";
    }
    placeCardBtn.textContent = "RESTART";
  } else {
    determineRoundWinner();
  }
});

function determineRoundWinner() {
  if (
    cardsOnTable[0].color === "Heart.png" &&
    cardsOnTable[1].color !== "Heart.png"
  ) {
    winner.textContent = "PLAYER 1 TAKES";
    player1Cards = player1Cards.concat(cardsOnTable);
  } else if (
    cardsOnTable[0].color !== "Heart.png" &&
    cardsOnTable[1].color === "Heart.png"
  ) {
    winner.textContent = "PLAYER 2 TAKES";
    player2Cards = player2Cards.concat(cardsOnTable);
  }
  cardsOnTable = [];
}

function resetGame() {
  initializeGame();
}

initializeGame();
