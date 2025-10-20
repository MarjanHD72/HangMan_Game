import { HangmanGame, HangmanUI } from "./Hangman.js";
import { JumpingKeyboardHangman, LoadHeader } from "./global.js";

//Global Functions
JumpingKeyboardHangman();
LoadHeader();

//Game Categories
const animals = [
  "cat",
  "dog",
  "elephant",
  "lion",
  "tiger",
  "giraffe",
  "zebra",
  "monkey",
  "bear",
  "kangaroo",
];
const fruits = [
  "apple",
  "banana",
  "orange",
  "grape",
  "mango",
  "strawberry",
  "pineapple",
  "watermelon",
  "cherry",
  "kiwi",
];
const objects = [
  "apple",
  "banana",
  "orange",
  "grape",
  "mango",
  "strawberry",
  "pineapple",
  "watermelon",
  "cherry",
  "kiwi",
];
const countries = [
  "iran",
  "france",
  "japan",
  "brazil",
  "italy",
  "canada",
  "germany",
  "mexico",
  "india",
  "egypt",
];

//UserInterface and Logic of the Game
const ui = new HangmanUI();
const game = new HangmanGame(ui);

window.KeyboardStatus = false;
document.addEventListener("keydown", (event) => {
  if (!window.KeyboardStatus) return;
  const letter = event.key.toLowerCase();

  //For Using Physical Keyboard, if letter was between a to z disable the button and send it for guessed one
  if (/^[a-z]$/.test(letter)) {
    const button = document.getElementById(letter);
    if (button && !button.disabled) {
      button.click();
    }
  }
});

//Game Buttons Operations
document.querySelectorAll(".Categories button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.id;
    switch (id) {
      case "animals":
        game.setCategory(animals, "Animals");
        game.reset(true);
        break;
      case "fruits":
        game.setCategory(fruits, "Fruits");
        game.reset(true);
        break;
      case "countries":
        game.setCategory(countries, "Countries");
        game.reset(true);
        break;
      case "objects":
        game.setCategory(objects, "Objects");
        game.reset(true);
        break;
    }
    document.getElementById("hangingStage").style.display = "none";
    document.getElementById("stickman_game_steps").style.display = "block";
    ui.renderKeyboard((letter) => game.guess(letter));
    window.KeyboardStatus = true;
    ui.message.innerText = `Your Selected Category is: ${id}`;
    ui.keyboard.style.display = "block";
  });
});

// Changing the categories
document.getElementById("changeBtn").addEventListener("click", () => {
  game.reset();
  ui.keyboard.innerHTML = "";
  ui.message.innerText = "Please Select a Category";
});
