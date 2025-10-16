import { HangmanGame, HangmanUI } from "./Hangman.js";
import { JumpingKeyboardHangman, LoadHeader } from "./global.js";

//Global Functions
JumpingKeyboardHangman();
LoadHeader();

//Game Categories
const animals = ["cat", "dog", "elephant", "lion", "tiger"];
const fruits = ["apple", "banana", "orange", "grape"];
const countries = ["iran", "france", "japan", "brazil"];
const objects = ["chair", "book", "phone", "lamp"];

//UserInterface and Logic of the Game
const ui = new HangmanUI();
const game = new HangmanGame(ui);

window.KeyboardStatus = false;
document.addEventListener("keydown", (event) => {
  if (!window.KeyboardStatus) return;
  const letter = event.key.toLowerCase();

  //For Using Physical Keyboard, if letter was between a to z disable the button and send it for guessed one
  if (letter >= "a" && letter <= "z") {
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
        game.setCategory(animals);
        break;
      case "fruits":
        game.setCategory(fruits);
        break;
      case "countries":
        game.setCategory(countries);
        break;
      case "objects":
        game.setCategory(objects);
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
