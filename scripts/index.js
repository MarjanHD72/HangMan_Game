import { LoadHeader, JumpingKeyboardHangman, openGamePage } from "./global.js";
import { showAlert } from "./SignUp.js";
const SignIn_Btn = document.getElementById("SignIn-Btn");
const SignUp_Btn = document.getElementById("SignUp-Btn");
const PlayBtn = document.getElementById("Play-Btn");

JumpingKeyboardHangman();
//Open LogIn Page
function LogInPage() {
  window.location.href = "./HTML/SignIn.html";
}
// Open Register Page
const SignUpePage = () => {
  window.location.href = "./HTML/SignUp.html";
};
LoadHeader();
// getting buttons to add events
SignUp_Btn.addEventListener("click", SignUpePage);
SignIn_Btn.addEventListener("click", LogInPage);
PlayBtn.addEventListener("click", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    //Checl if the guest User has played once or not
    const hasPlayed = localStorage.getItem("guestPlayed");
    // if User has played once, Give message on a button
    if (hasPlayed === "true") {
      PlayBtn.innerText = "You already used your one-time play";
      return;
    }
    // save to local storage
    localStorage.setItem("guestPlayed", "true");
  }
  openGamePage();
});
