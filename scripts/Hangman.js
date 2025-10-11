export class HangmanUI {
  constructor() {
    // تمام المنت‌های HTML که باهاشون کار داریم
    this.message = document.getElementById("Alert_Game");
    this.image = document.getElementById("stickman_game_steps");
    this.container = document.getElementById("container");
    this.wordLocation = document.getElementById("WordLocation");
    this.keyboard = document.getElementById("keyboard");
    this.mistakesText = document.getElementById("mistakes");
    this.maxWrongText = document.getElementById("maxWrongGuesse");
    this.changeBtn = document.getElementById("changeBtn");
  }
  //prototypes
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
      btn.addEventListener("click", () => onClick(btn.id));
    });
  }
}
export class HangmanGame {
  constructor(ui) {
    this.ui = ui; // ارتباط با رابط کاربری
    this.maxWrong = 6;
    this.mistakes = 0;
    this.guessed = [];
    this.answer = "";
  }

  //creating Random Words of a category
  setCategory(words) {
    this.answer = words[Math.floor(Math.random() * words.length)];
    this.reset();
  }

  //resetting the game
  reset() {
    this.mistakes = 0;
    this.guessed = [];
    this.ui.updateMistakes(this.mistakes, this.maxWrong);
    this.ui.updateWord(this.getWordDisplay());
    this.ui.setImage(0);
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

    if (this.answer.includes(letter)) {
      //correct Guesss
      this.ui.updateWord(this.getWordDisplay());
      this.checkWinner();
    } else {
      //Wrong Guesses
      this.mistakes++;
      this.ui.updateMistakes(this.mistakes, this.maxWrong);
      this.ui.setImage(this.mistakes);
      this.checkWinner();
    }
  }

  // check winner or looser of the Game
  checkWinner() {
    if (!this.getWordDisplay().includes("_")) {
      this.ui.showWin();
    } else if (this.mistakes >= this.maxWrong) {
      this.ui.showLose(this.answer);
    }
  }
}
