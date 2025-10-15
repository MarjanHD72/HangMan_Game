import { LoadHeader } from "./global.js";
import { JumpingKeyboardHangman } from "./global.js";
import { openGamePage } from "./global.js";
const SignIn_Btn = document.getElementById("SignIn-Btn");
const SignUp_Btn = document.getElementById("SignUp-Btn");
const PlayBtn = document.getElementById("Play-Btn");
JumpingKeyboardHangman();
// const SignUpHyperLink = document.getElementById("SignUpHyperLink");

// const SignUp = document.getElementById("SignUp-div");
// const LogIn = document.getElementById("login-div");

function LogInPage() {
  window.location.href = "./HTML/SignIn.html";
}

const SignUpePage = () => {
  window.location.href = "./HTML/SignUp.html";
};
LoadHeader();
// function clicksoundHandler() {
//   const audio = new Audio("./sounds/Mouse-Click.mp3");

//   audio.play();
// }
SignUp_Btn.addEventListener("click", SignUpePage);
SignIn_Btn.addEventListener("click", LogInPage);
PlayBtn.addEventListener("click", openGamePage);
// SignUpHyperLink.addEventListener("click", AccountSwitch);
// SignUpBtn.addEventListener("click", clicksoundHandler);
