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

  reset() {
    this.ui.hidePlayAgain();
    this.mistakes = 0;
    this.guessed = [];

    // ✅ گرفتن نام کاربر فعلی
    const currentUser = localStorage.getItem("currentUser");

    // ✅ خواندن امتیاز ذخیره‌شده برای کاربر فعلی از localStorage
    const userScores = JSON.parse(localStorage.getItem("userScores")) || {};
    this.scores = userScores[currentUser] || 50; // ← اگه نبود، از 50 شروع کن

    // ✅ به‌روزرسانی نمایش امتیاز در UI
    this.ui.updateScore(this.scores);

    // ✅ ریست ظاهر بازی
    this.ui.updateMistakes(this.mistakes, this.maxWrong);
    this.ui.updateWord(this.getWordDisplay());
    this.ui.setImage(0);

    // ✅ نمایش بالاترین امتیاز عمومی
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
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) return;
    const userScores = JSON.parse(localStorage.getItem("userScores")) || {};
    userScores[currentUser] = this.scores;
    //add user in LocalStorage
    localStorage.setItem("userScores", JSON.stringify(userScores));
    const highestScore = parseInt(localStorage.getItem("highestScore")) || 0;
    if (this.scores > highestScore) {
      // update the highest score section if the user score is larger than highest score so far
      localStorage.setItem("highestScore", this.scores);
    }
    const highest = document.getElementById("highestScore");
    if (highest) {
      highest.innerText = localStorage.getItem("highestScore");
    }
  }
}
