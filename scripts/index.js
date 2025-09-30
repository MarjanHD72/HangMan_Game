import { openGamePage } from "./global.js";
const SignIn_Page = document.getElementById("SignIn-Btn");
const SignUpHyperLink = document.getElementById("SignUpHyperLink");
const SignUp = document.getElementById("SignUp-div");
const LogIn = document.getElementById("login-div");
const playBtn = document.getElementById("playBtn");
function openRegisterPage() {
  const bodyElement = document.body;
  bodyElement.classList.add("page-fade-out");
  const transitionDuration = 450;
  setTimeout(() => {
    // 4. Perform the redirection after the delay
    window.location.href = "./HTML/SignUp.html";
  }, transitionDuration);
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
// SignUpHyperLink.addEventListener("click", AccountSwitch);
// playBtn.addEventListener("click", clicksoundHandler);
