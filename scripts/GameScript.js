import { LoadHeader } from "./global.js";
let Category = document.querySelectorAll(".Categories button");
const message = document.getElementById("Alert_Game");
const exitGame = document.getElementById("ExitGame");
const keyboard = document.getElementById("keyboard");
const changeBtn = document.getElementById("changeBtn");
const container = document.getElementById("container");

LoadHeader();

//Exit From Game Page
const exitHandler = () => {
  alert("are you sure you want to say Goodbye?");
  window.location.href = "../index.html";
};

exitGame.addEventListener("click", exitHandler);
var animals = [
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
var fruits = [
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
var countrie = [
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
var objects = [
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
  container.style.backgroundImage = changeBtn.style.display = "none";
  document.getElementById("WordLocation").innerHTML = "";
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
    guessed = [];
    mistakes = 0;
    WordStatus = null;
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
    container.style.backgroundSize = "cover"; // کل container پر بشه
    container.style.backgroundRepeat = "no-repeat"; // تکرار نشه
    container.style.backgroundPosition = "center"; // وسط تصویر قرار بگیره
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
    setTimeout(() => {
      changeBtn.style.display = "inline-block";
    }, 2000);
  }
};
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
    document.getElementById("mistakes").innerHTML = mistakes;
  }
  document.getElementById(letter).setAttribute("disabled", true);
  CheckWinner();
  console.log("You pressed:", letter);
};
document.getElementById("maxWrongGuesse").innerHTML = maxWrong;
