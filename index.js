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

player1CardsE.querySelectorAll(".symbol").forEach((symbol) => {
  symbol.textContent = player1Cards[0].symbol;
});
player2CardsE.querySelectorAll(".symbol").forEach((symbol) => {
  symbol.textContent = player2Cards[0].symbol;
});

player1CardsE.querySelector(".big-symbol").src = player1Cards[0].color;
player2CardsE.querySelector(".big-symbol").src = player2Cards[0].color;

player1CardsE.querySelectorAll(".color").forEach((color) => {
  color.src = player1Cards[0].color;
});
player2CardsE.querySelectorAll(".color").forEach((color) => {
  color.src = player2Cards[0].color;
});

player1Cards[0].color === "Heart.png"
  ? player1CardsE
      .querySelectorAll(".symbol")
      .forEach((symbol) => (symbol.style.color = "red"))
  : player1CardsE
      .querySelectorAll(".symbol")
      .forEach((symbol) => (symbol.style.color = "black"));
player2Cards[0].color === "Heart.png"
  ? player2CardsE
      .querySelectorAll(".symbol")
      .forEach((symbol) => (symbol.style.color = "red"))
  : player2CardsE
      .querySelectorAll(".symbol")
      .forEach((symbol) => (symbol.style.color = "black"));

player1Cards[0].color === "Heart.png"
  ? player1CardsE
      .querySelectorAll(".cards-num")
      .forEach((num) => (num.style.color = "red"))
  : player1CardsE
      .querySelectorAll(".cards-num")
      .forEach((num) => (num.style.color = "black"));
player2Cards[0].color === "Heart.png"
  ? player2CardsE
      .querySelectorAll(".cards-num")
      .forEach((num) => (num.style.color = "red"))
  : player2CardsE
      .querySelectorAll(".cards-num")
      .forEach((num) => (num.style.color = "black"));

placeCardBtn.addEventListener("click", () => {
  placeCardBtn.textContent = "NEXT CARD";
  if (player1Cards.length > 0 && player2Cards.length > 0) {
    winner.textContent = "";
    player1CardsE.querySelector(".cards-num").textContent =
      player1Cards.length - 1;
    player2CardsE.querySelector(".cards-num").textContent =
      player2Cards.length - 1;

    cardsOnTable.push(player1Cards[player1Cards.length - 1]);
    cardsOnTable.push(player2Cards[player2Cards.length - 1]);

    player1CardE.querySelectorAll(".symbol").forEach((symbol) => {
      symbol.textContent = player1Cards[player1Cards.length - 1].symbol;
    });
    player2CardE.querySelectorAll(".symbol").forEach((symbol) => {
      symbol.textContent = player2Cards[player2Cards.length - 1].symbol;
    });

    player1CardE.querySelectorAll(".color").forEach((color) => {
      color.src = player1Cards[player1Cards.length - 1].color;
    });
    player2CardE.querySelectorAll(".color").forEach((color) => {
      color.src = player2Cards[player2Cards.length - 1].color;
    });

    player1CardE.querySelector(".big-symbol").src =
      player1Cards[player1Cards.length - 1].color;
    player2CardE.querySelector(".big-symbol").src =
      player2Cards[player2Cards.length - 1].color;

    player1Cards[player1Cards.length - 1].color === "Heart.png"
      ? player1CardE
          .querySelectorAll(".symbol")
          .forEach((symbol) => (symbol.style.color = "red"))
      : player1CardE
          .querySelectorAll(".symbol")
          .forEach((symbol) => (symbol.style.color = "black"));
    player2Cards[player2Cards.length - 1].color === "Heart.png"
      ? player2CardE
          .querySelectorAll(".symbol")
          .forEach((symbol) => (symbol.style.color = "red"))
      : player2CardE
          .querySelectorAll(".symbol")
          .forEach((symbol) => (symbol.style.color = "black"));

    player1CardE.classList.remove("hide");
    player2CardE.classList.remove("hide");

    if (
      player1Cards[player1Cards.length - 1].color === "Heart.png" &&
      player2Cards[player2Cards.length - 1].color !== "Heart.png"
    ) {
      winner.textContent = "PLAYER 1 TAKES";
      player1Cards = player1Cards.concat(cardsOnTable);
      cardsOnTable = [];
    } else if (
      player1Cards[player1Cards.length - 1].color !== "Heart.png" &&
      player2Cards[player2Cards.length - 1].color === "Heart.png"
    ) {
      winner.textContent = "PLAYER 2 TAKES";
      player2Cards = player2Cards.concat(cardsOnTable);
      cardsOnTable = [];
    }
    player1Cards.pop();
    player2Cards.pop();
  } else if (player1Cards.length === 0) {
    winner.textContent = "PLAYER 2 WINS";
    placeCardBtn.textContent = "RESTART";
    player1CardE.classList.add("hide");
    player2CardE.classList.add("hide");
  } else {
    winner.textContent = "PLAYER 1 WINS";
    placeCardBtn.textContent = "RESTART";
    player1CardE.classList.add("hide");
    player2CardE.classList.add("hide");
  }
});

placeCardBtn.addEventListener("click", () => {
  if (player1Cards.length === 0 || player2Cards.length === 0) {
    resetGame();
  }
});

function resetGame() {
  player1Cards = [];
  player2Cards = [];
  cardsOnTable = [];
  winner.textContent =
    player1Cards.length === 0 ? "PLAYER 2 WINS" : "PLAYER 1 WINS";
  placeCardBtn.textContent = "RESTART";
  player1CardsE.querySelector(".cards-num").textContent = 20;
  player2CardsE.querySelector(".cards-num").textContent = 20;

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

  player1CardE.classList.add("hide");
  player2CardE.classList.add("hide");
}
