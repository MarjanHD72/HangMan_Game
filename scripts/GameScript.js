import { JumpingLetters } from "./global.js";
import { LoadHeader } from "./global.js";
let Category = document.querySelectorAll(".Categories button");
const message = document.getElementById("Alert_Game");
const exitGame = document.getElementById("ExitGame");
const keyboard = document.getElementById("keyboard");
const changeBtn = document.getElementById("changeBtn");
const container = document.getElementById("container");
const HangmanStage = document.getElementById("hangingStage");
let Image_Steps = document.getElementById("stickman_game_steps");

JumpingLetters();
LoadHeader();
//Exit From Game Page
const exitHandler = () => {
  alert("are you sure you want to say Goodbye?");
  window.location.href = "../index.html";
};

exitGame.addEventListener("click", exitHandler);

const animals = [
  "cat",
  "dog",
  "elephant",
  "tiger",
  "lion",
  "giraffe",
  "zebra",
  "kangaroo",
  "panda",
  "monkey",
  "bear",
  "wolf",
  "fox",
  "rabbit",
  "dolphin",
  "whale",
  "shark",
  "eagle",
  "owl",
  "horse",
];
const fruits = [
  "apple",
  "banana",
  "mango",
  "grape",
  "orange",
  "pear",
  "peach",
  "cherry",
  "strawberry",
  "pineapple",
  "kiwi",
  "watermelon",
  "melon",
  "blueberry",
  "raspberry",
  "lemon",
  "lime",
  "papaya",
  "plum",
  "apricot",
];
const countrie = [
  "iran",
  "france",
  "brazil",
  "japan",
  "canada",
  "germany",
  "india",
  "china",
  "australia",
  "mexico",
  "egypt",
  "russia",
  "italy",
  "spain",
  "turkey",
  "argentina",
  "sweden",
  "norway",
  "southafrica",
  "thailand",
];
const objects = [
  "chair",
  "table",
  "phone",
  "lamp",
  "book",
  "pen",
  "computer",
  "keyboard",
  "mouse",
  "bottle",
  "wallet",
  "backpack",
  "television",
  "camera",
  "clock",
  "shoe",
  "hat",
  "glasses",
  "notebook",
  "umbrella",
];

let answers = "";
const maxWrong = 6;
let mistakes = 0;
let guessed = [];
let WordStatus = null;

// Function to set Image of hang-man per every mistakes
const GuessSteps = (mistakes) => {
  switch (mistakes) {
    case 1:
      Image_Steps.src = "../Images/1.png";
      break;
    case 2:
      Image_Steps.src = "../Images/2.png";
      break;
    case 3:
      Image_Steps.src = "../Images/3.png";
      break;
    case 4:
      Image_Steps.src = "../Images/4.png";
      break;
    case 5:
      Image_Steps.src = "../Images/5.png";
      break;
    case 6:
      Image_Steps.src = "../Images/6.png";
      break;
  }
};

//creating Random Words of each Category
function animalsGroup() {
  answers = animals[Math.floor(Math.random() * animals.length)];
}
function countriesGroup() {
  answers = countrie[Math.floor(Math.random() * countrie.length)];
}
function fruitsGroup() {
  answers = fruits[Math.floor(Math.random() * fruits.length)];
}
function objectsGroup() {
  answers = objects[Math.floor(Math.random() * objects.length)];
}

Category.forEach((button) => {
  button.addEventListener("click", SelectedCategoryHandler);
});
// allocating task to each Category
const categoryTasks = {
  animals: () => animalsGroup(),
  fruits: () => fruitsGroup(),
  countries: () => countriesGroup(),
  objects: () => objectsGroup(),
};

//Change Category when clicking on a  button

const ChangeCategoryHandler = () => {
  message.innerText = "Please Select a Category";
  Category.forEach((button) => {
    button.style.display = "inline-block";
  });
  container.style.backgroundImage = "none";
  changeBtn.style.display = "none";
  document.getElementById("WordLocation").innerHTML = "";

  Image_Steps.src = "../Images/0.png";
  mistakes = 0;
  guessed = [];
  WordStatus = "";
  document.getElementById("mistakes").innerText = mistakes;
  document.getElementById("maxWrongGuesse").innerText = maxWrong;
};
changeBtn.addEventListener("click", ChangeCategoryHandler);

//selecting Category to do Allocated task
function SelectedCategoryHandler(event) {
  const task = categoryTasks[event.target.id];
  if (task) {
    task();
    message.innerText = "Your Selected Category is: " + event.target.id;
    Category.forEach((button) => {
      changeBtn.style.display = "inline-block";
      button.style.display = "none";
    });
    keyboard.style.display = "inline-block";
    HangmanStage.style.display = "none";
    Image_Steps.style.display = "inline-block";
    guessed = [];
    mistakes = 0;
    WordStatus = null;
    Image_Steps.src = "../Images/0.png";
    GameButton();
    Guess();
  } else {
    alert("select one category");
  }
}
ChangeCategoryHandler();

function Guess() {
  console.log(answers);
  WordStatus = answers
    .split("")
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : "_"))
    .join(" ");
  document.getElementById("WordLocation").innerHTML = WordStatus;
}
Guess();
GuessSteps();

// Creating Game Buttons when The Category is selected
function GameButton() {
  const ButtonsLetter = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `<button id="${letter}" onclick="GuessHandler('${letter}')">${letter}</button>`
    )
    .join("");
  keyboard.innerHTML = ButtonsLetter;

  document.getElementById("keyboard").innerHTML = ButtonsLetter;
}

const CheckWinner = () => {
  const remaining = answers
    .split("")
    .filter((letter) => !guessed.includes(letter));

  if (remaining.length === 0) {
    message.innerText = "🎉Congratulations, You Won!";
    keyboard.style.display = "none";
    container.style.backgroundImage = 'url("/Images/Celebrate.gif")';
    container.style.backgroundSize = "cover";
    container.style.backgroundRepeat = "no-repeat";
    container.style.backgroundPosition = "center";
    setTimeout(() => {
      changeBtn.style.display = "inline-block";
      container.style.backgroundImage = "none";
    }, 2000);
  }
  // Number(maxWrong)
  //Case of wrong mistakes and lose Game
  else if (mistakes >= maxWrong) {
    message.innerText = "💀 You Lost! The word was: " + answers;
    container.style.backgroundImage = 'url("/Images/gameOver.gif")';
    changeBtn.style.display = "none";
    keyboard.style.display = "none";

    document.getElementById("WordLocation").innerHTML = "";
    setTimeout(() => {
      changeBtn.style.display = "inline-block";
    }, 2000);
  }
};
// function playMistakeEffect() {
//   container.classList.add("shake");
//   setTimeout(() => container.classList.remove("shake"), 500);
// }

// Controling the Guesses of User
window.GuessHandler = function (letter) {
  if (guessed.indexOf(letter) === -1) {
    guessed.push(letter);
  }
  if (answers.indexOf(letter) >= 0) {
    Guess();
    CheckWinner();
  } else {
    mistakes++;
    GuessSteps(mistakes);
    document.getElementById("mistakes").innerHTML = mistakes;
  }
  document.getElementById(letter).setAttribute("disabled", true);
  CheckWinner();
  console.log("You pressed:", letter);
};
document.getElementById("maxWrongGuesse").innerHTML = maxWrong;
