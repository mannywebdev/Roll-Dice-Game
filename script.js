"use strict";

//Selecting Elements
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

//Starting Conditions
let currentScore, activePlayer, totalScore, playing;
const init = () => {
  currentScore = 0;
  activePlayer = 0;
  totalScore = [0, 0];
  playing = true;
  diceEl.classList.add("hidden");
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--active`);
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add(`player--active`);
  currentScore = 0;
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    //Generate Random Dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log("dice :>> ", dice);
    //Generate Random Dice Roll
    diceEl.src = `dice-${dice}.svg`;
    diceEl.classList.remove("hidden");

    if (dice !== 1) {
      //When dice not equals to 1
      currentScore = currentScore + dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //When dice equals to 1
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //Assign score to player when player holds
    totalScore[activePlayer] = totalScore[activePlayer] + currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScore[activePlayer];
    //If Player score is > 0
    if (totalScore[activePlayer] >= 100) {
      diceEl.classList.add("hidden");
      playing = false;
      // Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    }
    //Switching the player
    switchPlayer();
  }
});

btnNew.addEventListener("click", init);
