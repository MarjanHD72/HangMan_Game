import { LoadHeader } from "./global.js";
let Category = document.querySelectorAll(".Categories button");
const Levels = document.querySelectorAll(".gameLevel button ");
const container = document.querySelectorAll(".container");
const change = document.getElementById("changeBtn");
let notice = document.getElementById("Alert_Game");
let StartGameBtn = document.querySelectorAll(".ChangeDiv button");
let currentLevel = document.querySelectorAll("currentLevel");
const Exit = document.getElementById("ExitGame");
// let Game_Stickman = document.getElementById("stickman-alert");
const keyboard = document.querySelector(".keyboard");
const StartBtn = document.querySelector(".Start_Game");
LoadHeader();
let step = 0;
// Hide Category
function CategoryHandler(event) {
  const selectedBtn = event.target;
  Category.forEach((button) => {
    button.style.display = "none";
  });
  change.style.display = "inline-block";
  notice.innerText = "Your choice is Category of " + selectedBtn.textContent;

  step = 1;
  updateChangeButtonText();
}
// hide Level Buttons
function LevelHandler(event) {
  const selectetedLevel = event.target;
  Levels.forEach((button) => {
    button.style.display = "none";
  });
  change.style.display = "inline-block";
  notice.append(" at " + selectetedLevel.textContent);
  step = 2;
  console.log(step);
  updateChangeButtonText();
}
//Function to change the Category of the Game
ChangeCategories = () => {
  Category.forEach((button) => {
    button.style.display = "inline-block";
  });
  Levels.forEach((button) => {
    button.style.display = "inline-block";
  });
  notice.innerText = "Please select Category and Level again";
  keyboard.style.display = "none";
  StartGameBtn.forEach((button) => {
    button.style.display = "none";
  });
};
//Update and change the buttons
function updateChangeButtonText() {
  if (step === 0) {
    change.textContent = "Change";
  } else if (step === 1) {
    change.textContent = "Change Level";
  } else if (step === 2) {
    change.style.display = "none";
    StartGameBtn.forEach((button) => {
      button.style.display = "inline-block";
    });
  } else if (step === 3) {
    keyboard.style.display = "none";
    if (Game_Stickman && Game_Stickman.tagName === "IMG") {
      Game_Stickman.src = Game_Stickman.src = "none";
    }

    updateChangeButtonText();
  }
}
function StartGameHandler() {
  keyboard.style.display = "inline-block";
  StartBtn.style.display = "none";
}

//Exit From Game Page
ExitHandler = () => {
  alert("are you sure you want to say Goodbye?");
  window.location.href = "../index.html";
};

Category.forEach((button) => {
  button.addEventListener("click", CategoryHandler);
});

Levels.forEach((button) => {
  button.addEventListener("click", LevelHandler);
});
change.addEventListener("click", ChangeCategories);
Exit.addEventListener("click", ExitHandler);
StartBtn.addEventListener("click", StartGameHandler);
