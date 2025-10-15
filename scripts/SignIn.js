import { userAuthentication } from "./userAuthentication.js";
import { showAlert } from "./SignUp.js";
import { LoadHeader, openGamePage, JumpingKeyboardHangman } from "./global.js";

const Username_Login = document.getElementById("user_Login-input");
const Password_Login = document.getElementById("pass_Login-input");
const SignInBtn = document.getElementById("signInButton");
const SignIn_message = document.getElementById("SignIn-message");

JumpingKeyboardHangman();
LoadHeader();

const auth = new userAuthentication();

function LogInHandler() {
  const username = Username_Login.value.trim();
  const password = Password_Login.value.trim();

  if (username === " " || password === " ") {
    showAlert("Please enter required fields", "error", SignIn_message);
    return;
  }

  const success = auth.logIn(username, password);

  if (success) {
    showAlert("Logged in successfully", "success", SignIn_message);
    setTimeout(() => {
      openGamePage();
    }, 1000);
    ContainerBtn.style.display = "none";
  } else {
    showAlert("Username or password is incorrect", "error", SignIn_message);
  }
}

SignInBtn.addEventListener("click", LogInHandler);
