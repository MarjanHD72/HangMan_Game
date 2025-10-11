import { HangmanGame, HangmanUI } from "./Hangman.js";
import { JumpingLetters, LoadHeader } from "./global.js";

//Global Functions
JumpingLetters();
LoadHeader();

//Game Categories
const animals = ["cat", "dog", "elephant", "lion", "tiger"];
const fruits = ["apple", "banana", "orange", "grape"];
const countries = ["iran", "france", "japan", "brazil"];
const objects = ["chair", "book", "phone", "lamp"];

//UserInterface and Logic of the Game
const ui = new HangmanUI();
const game = new HangmanGame(ui);

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
