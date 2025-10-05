import { LoadHeader } from "./global.js";
let Category = document.querySelectorAll(".Categories button");
const message = document.getElementById("Alert_Game");
const exitGame = document.getElementById("ExitGame");
const keyboard = document.getElementById("keyboard");

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
//selecting Category to do Allocated task
function SelectedCategoryHandler(event) {
  const task = categoryTasks[event.target.id];
  if (task) {
    task();
    message.innerText = "Your Selected Category is: " + event.target.id;
    guessed = [];
    mistakes = 0;
    WordStatus = null;
    GameButton();
  } else {
    alert("select one category");
  }
}

let answers = "";
let maxWrong = "6";
let mistakes = 0;
let guessed = [];
let WordStatus = null;
