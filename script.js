const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockGame = false;
let cardA, cardB;

function flipCard() {
  if (lockGame) return;
  if (this === cardA) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    cardA = this;
  } else {
    // second click
    hasFlippedCard = false;
    cardB = this;

    checkForMatch();
  }
}

cards.forEach((card) => card.addEventListener("click", flipCard));

// do cards match?
function checkForMatch() {
  if (cardA.dataset.image === cardB.dataset.image) {
    // cards match
    disableCards();
  } else {
    // cards do not match... with setTimeout secondCard flips for a slight moment
    unflipCards();
  }
}

// cards match so we remove flip
function disableCards() {
  cardA.removeEventListener("click", flipCard);
  cardB.removeEventListener("click", flipCard);
}

// cards do not match... with setTimeout cards flips back after a slight moment
function unflipCards() {
  lockGame = true;
  setTimeout(() => {
    cardA.classList.remove("flip");
    cardB.classList.remove("flip");
    lockGame = false;
  }, 1000);
}

// function resetBoard() {
//   [hasFlippedCard, lockGame] = [false, false];
//   [cardA, cardB] = [null, null];
// }

// function will execute immediately by wrapping it in parenthesis and invoking itself
(function shuffleCards() {
  cards.forEach((card) => {
    let randomOrder = Math.floor(Math.random() * 12);
    card.style.order = randomOrder;
  });
})();
