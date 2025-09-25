const SignIn_Page = document.getElementById("SignIn-Btn");
const SignUpHyperLink = document.getElementById("SignUpHyperLink");
const SignUp = document.getElementById("SignUp-div");
const LogIn = document.getElementById("login-div");
const playBtn = document.getElementById("playBtn");
// const choices = ["rock", "paper", "scissors"];
// let playerScore = 0;
// let computerScore = 0;
// const checkWinner = (player, computer) => {
//   if (player === computer) {
//     return "Even";
//   } else if (player === "rock") {
//     return computer === "scissoers" ? "player" : "computer";
//   } else if (player === "paper") {
//     return computer === "rock" ? "player" : "computer";
//   } else if (player === "scissors") {
//     return computer === "paper" ? "player" : "computer";
//   } else {
//     return computer === "rock" ? "computer" : "player";
//   }
// };
// function showResult(result) {
//   if (result === "player") {
//     console.log("you win");
//     playerScore++;
//   } else if (result === "computer") {
//     console.log("you lose");
//     computerScore++;
//   } else {
//     console.log("you are even");
//   }
//   console.log(`your score: ${playerScore}`);
//   console.log(`computer score: ${computerScore}`);
// }
// const play = () => {
//   const playerChoice = prompt("please choose rock or paper or scissors");
//   if (choices.indexOf(playerChoice?.toLowerCase()) !== -1) {
//     console.log(`You Chose ${playerChoice}`);
//   } else {
//     console.log("Don't Cheat");
//     return;
//   }
//   const randomNumber = Math.floor(Math.random() * choices.length);
//   const computerChoice = choices[randomNumber];
//   console.log(`computer's choice is: ${computerChoice}`);

//   const gameResult = checkWinner(playerChoice, computerChoice);
//   showResult(gameResult);

//   if (computerScore === 5) {
//     console.log("Computer won the Game");
//   } else if (playerScore === 5) {
//     console.log("You won the Game");
//   } else {
//     play();
//   }
// };
// showResult();
// play();

function openGamePage() {
  window.location.href = "./HTML/play-Game.html";
}
function openRegisterPage() {
  window.location.href = "./HTML/SignUp.html";
}
function AccountSwitch() {
  LogIn.style.display = "none";
  console.log("none");
  SignUp.style.display = "block";
}
// function clicksoundHandler() {
//   const audio = new Audio("./sounds/Mouse-Click.mp3");

//   audio.play();
// }
playBtn.addEventListener("click", openGamePage);
SignIn_Page.addEventListener("click", openRegisterPage);
SignUpHyperLink.addEventListener("click", AccountSwitch);
// playBtn.addEventListener("click", clicksoundHandler);
