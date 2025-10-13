//Hangmn UI class for all user interaction

export class HangmanUI {
  constructor() {
    //elements we need
    this.message = document.getElementById("Alert_Game");
    this.image = document.getElementById("stickman_game_steps");
    this.container = document.getElementById("container");
    this.wordLocation = document.getElementById("WordLocation");
    this.keyboard = document.getElementById("keyboard");
    this.mistakesText = document.getElementById("mistakes");
    this.maxWrongText = document.getElementById("maxWrongGuesse");
    this.changeBtn = document.getElementById("changeBtn");
    this.exitBtn = document.getElementById("ExitGame");
    this.playAgainBtn = document.getElementById("playAgainBtn");

    this.playAgainBtn.style.display = "none";

    this.ExitGame();
  }

  showPlayAgain(onClick) {
    this.playAgainBtn.style.display = "block";
    this.playAgainBtn.onclick = () => {
      this.playAgainBtn.style.display = "none";
      onClick();
    };
  }

  // Hide PlayAgain Button after starting each game
  hidePlayAgain() {
    this.playAgainBtn.style.display = "none";
  }
  //prototypes:
  updateScore(score) {
    const scoreElem = document.getElementById("score");
    if (scoreElem) scoreElem.innerText = score;
  }

  showTotalScore(total) {
    this.message.innerText += ` Total Score: ${total}`;
  }
  // ExitGame
  ExitGame() {
    this.exitBtn.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  }

  //Set the Image of Current Step of Guesses
  setImage(step) {
    console.log("setImage called → step:", step);

    this.image.src = `../Images/${step}.png`;
  }
  //Updating  Numbers of Mistakes
  updateMistakes(mistakes, maxWrong) {
    this.mistakesText.innerText = mistakes;
    this.maxWrongText.innerText = maxWrong;
  }
  //Hhowing Letters
  updateWord(wordStatus) {
    this.wordLocation.innerHTML = wordStatus;
  }
  //Check Winner
  showWin() {
    this.message.innerText = "🎉 Congratulations, You Won!";
    this.keyboard.style.display = "none";
    this.container.style.backgroundImage = 'url("../Images/Celebrate.gif")';
    this.container.style.backgroundSize = "cover";
    setTimeout(() => {
      this.container.style.backgroundImage = "none";
    }, 2000);
  }
  //Check Looser
  showLose(answer) {
    this.message.innerText = `💀 You Lost! The word was: ${answer}`;
    this.keyboard.style.display = "none";
    this.container.classList.add("game-over-bg");
    setTimeout(() => {
      this.container.classList.remove("game-over-bg");
    }, 2000);
  }
  //Creating Buttons Of Keyboard
  renderKeyboard(onClick) {
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    this.keyboard.innerHTML = letters
      .map((letter) => `<button id="${letter}" class="key">${letter}</button>`)
      .join("");
    this.keyboard.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        onClick(btn.id);
        btn.disabled = true;
        btn.classList.add("disabled-key");
      });
    });
  }
}

//Class for Hangman Game

export class HangmanGame {
  constructor(ui) {
    this.ui = ui;

    this.maxWrong = 6;
    this.mistakes = 0;
    this.guessed = [];
    this.answer = "";
    this.scores = 50;
  }

  //creating Random Words of a category
  setCategory(words) {
    this.answer = words[Math.floor(Math.random() * words.length)];
    this.reset();
  }

  //resetting the game
  reset() {
    this.ui.hidePlayAgain();
    this.mistakes = 0;
    this.guessed = [];
    this.scores = 50;
    this.ui.updateMistakes(this.mistakes, this.maxWrong);
    this.ui.updateWord(this.getWordDisplay());
    this.ui.setImage(0);
    this.ui.updateScore(this.scores);

    // Showing Scores
    const totalScore = parseInt(localStorage.getItem("totalScore")) || 0;
    const highestScore = parseInt(localStorage.getItem("highestScore")) || 0;
    const scoreElem = document.getElementById("score");
    const highestElem = document.getElementById("highestScore");
    if (scoreElem) scoreElem.innerText = totalScore;
    if (highestElem) highestElem.innerText = highestScore;
  }

  //Creating words
  getWordDisplay() {
    return this.answer
      .split("")
      .map((letter) => (this.guessed.includes(letter) ? letter : "_"))
      .join(" ");
  }

  //   Process of Guesses
  guess(letter) {
    if (this.guessed.includes(letter)) return;

    this.guessed.push(letter);

    //correct Guesss
    if (this.answer.includes(letter)) {
      this.scores += 5;
      this.ui.updateWord(this.getWordDisplay());
      this.ui.updateScore(this.scores);
      this.checkWinner();
    } else {
      //Wrong Guesses
      this.mistakes++;
      this.scores -= 5;
      this.ui.updateMistakes(this.mistakes, this.maxWrong);
      this.ui.setImage(this.mistakes);
      this.ui.updateScore(this.scores);
      this.checkWinner();
    }
  }

  // check winner or looser of the Game
  checkWinner() {
    if (!this.getWordDisplay().includes("_")) {
      this.ui.showWin();
      this.saveScoreTolocalStorage();
      this.ui.showPlayAgain(() => this.reset());
    } else if (this.mistakes >= this.maxWrong) {
      this.ui.showLose(this.answer);
      this.saveScoreTolocalStorage();
      this.ui.showPlayAgain(() => this.reset());
    }
  }
  saveScoreTolocalStorage() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) return;

    const username = user.username; // مثلا "m"

    const totalKey = `${username}_totalScore`;
    const highKey = `${username}_highestScore`;

    let totalScore = parseInt(localStorage.getItem(totalKey)) || 0;
    let highestScore = parseInt(localStorage.getItem(highKey)) || 0;

    totalScore += this.scores;
    localStorage.setItem(totalKey, totalScore);

    if (this.scores > highestScore) {
      highestScore = this.scores;
      localStorage.setItem(highKey, highestScore);
    }

    this.ui.showTotalScore(totalScore);

    const currentScoreElem = document.getElementById("score");
    const highestScoreElem = document.getElementById("highestScore");

    if (currentScoreElem) currentScoreElem.innerText = totalScore;
    if (highestScoreElem) highestScoreElem.innerText = highestScore;
  }
}
