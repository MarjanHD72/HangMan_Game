//Hangmn UI class for all user interaction

export class HangmanUI {
  constructor() {
    //elements we need
    this.winSound = new Audio("../sounds/applause.mp3");
    this.loseSound = new Audio("../sounds/wrong-answer.mp3");
    this.winSound.load();
    this.loseSound.load();
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
    const highestScore = parseInt(localStorage.getItem("highestScore")) || 0;
    const highestElem = document.getElementById("highestScore");
    if (highestElem) highestElem.innerText = highestScore;
    this.ExitGame();
  }

  showPlayAgain(onClick) {
    this.playAgainBtn.style.display = "block";
    this.playAgainBtn.onclick = () => {
      this.playAgainBtn.style.display = "none";
      onClick();
      window.KeyboardStatus = true;
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
    this.message.innerText = " Congratulations, You Won!";
    this.keyboard.style.display = "none";
    this.container.style.backgroundImage = 'url("../Images/Celebrate.gif")';
    this.container.style.backgroundSize = "cover";
    this.winSound.currentTime = 0;
    this.image.src = "../Images/stickman-dancing.gif";
    this.winSound.play();
    setTimeout(() => {
      this.container.style.backgroundImage = "none";
    }, 2000);
    window.KeyboardStatus = false;
  }
  //Check Looser
  showLose(answer) {
    this.message.innerText = ` You Lost! The word was: ${answer}`;
    this.keyboard.style.display = "none";
    this.container.classList.add("game-over-bg");
    //sound effect when lose
    this.loseSound.currentTime = 0;
    this.loseSound.play();
    setTimeout(() => {
      this.container.classList.remove("game-over-bg");
    }, 2000);
    window.KeyboardStatus = false;
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

  reset() {
    this.ui.hidePlayAgain();
    this.mistakes = 0;
    this.guessed = [];

    // name of current user
    const currentUser = localStorage.getItem("currentUser");

    // getting score of the current user from local storage
    const userScores = JSON.parse(localStorage.getItem("userScores")) || {};
    this.scores = userScores[currentUser] || 50;
    if (this.scores < 0 || isNaN(this.scores)) {
      this.scores = 50;
    }
    // ✅ Upating score
    this.ui.updateScore(this.scores);

    // reset game
    this.ui.updateMistakes(this.mistakes, this.maxWrong);
    this.ui.updateWord(this.getWordDisplay());
    this.ui.setImage(0);

    // // Showing highest score of the game
    const highestScore = parseInt(localStorage.getItem("highestScore")) || 0;
    const highestElem = document.getElementById("highestScore");
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
    const isGuest = localStorage.getItem("guestPlayed") === "true";
    if (!this.getWordDisplay().includes("_")) {
      this.ui.showWin();
      this.saveScoreTolocalStorage();
      setTimeout(() => {
        if (!isGuest) {
          this.ui.showPlayAgain(() => this.reset());
        } else {
          this.endGuestSession(); // User will be locked after onetime play and win
        }
      }, 2000);
    } else if (this.mistakes >= this.maxWrong) {
      this.ui.showLose(this.answer);
      this.saveScoreTolocalStorage();
      setTimeout(() => {
        if (!isGuest) {
          this.ui.showPlayAgain(() => this.reset());
        } else {
          this.endGuestSession(); // User will be locked after onetime play and lose
        }
      }, 2000);
    }
  }
  endGuestSession() {
    // disable UI
    document.querySelectorAll(".Categories button").forEach((btn) => {
      btn.disabled = true;
      btn.classList.add("disabled-key");
    });
    this.ui.playAgainBtn.style.display = "none";
    this.ui.keyboard.style.display = "none";
    window.KeyboardStatus = false;
    localStorage.setItem("guestPlayed", "true");

    //  showing modal after a delay
    setTimeout(() => {
      const modal = document.getElementById("Register");
      if (!modal) {
        console.warn("⚠️ Modal element with id='Register' not found!");
        return;
      }
      modal.style.display = "flex";

      const cancelBtn = document.getElementById("CancelRegister");
      if (cancelBtn) {
        cancelBtn.onclick = () => {
          modal.style.display = "none";
          window.location.href = "../index.html";
        };
      }

      const registerBtn = document.getElementById("RegisterAccount");
      if (registerBtn) {
        registerBtn.onclick = () => {
          window.location.href = "../HTML/signup.html";
        };
      }
    }, 300);
  }
  saveScoreTolocalStorage() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) return;
    const userScores = JSON.parse(localStorage.getItem("userScores")) || {};
    userScores[currentUser] = this.scores;
    //add user in LocalStorage
    localStorage.setItem("userScores", JSON.stringify(userScores));
    const highestScore = parseInt(localStorage.getItem("highestScore")) || 0;

    console.log(
      "Previous Highest:",
      highestScore,
      "Current Score:",
      this.scores
    );

    if (!highestScore || this.scores > highestScore) {
      localStorage.setItem("highestScore", this.scores);

      // update the highest score section if the user score is larger than highest score so far
      localStorage.setItem("highestScore", this.scores);
    }
    const highest = document.getElementById("highestScore");
    if (highest) {
      highest.innerText = localStorage.getItem("highestScore");
    }
  }
}
