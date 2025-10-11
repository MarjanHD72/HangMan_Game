import { showAlert } from "./SignUp.js";
import { LoadHeader } from "./global.js";
import { openGamePage } from "./global.js";
import { JumpingLetters } from "./global.js";
const Username_Login = document.getElementById("user_Login-input");
const Password_Login = document.getElementById("pass_Login-input");
const SignInPage = document.getElementById("SignIn-div");
const SignInBtn = document.getElementById("signInButton");
const SignIn_message = document.getElementById("SignIn-message");
// const SignOutMenu = document.querySelectorAll(".menu .Signup");
let Users = JSON.parse(localStorage.getItem("Users")) || [];

LoadHeader();
JumpingLetters();
// Login to existing account
function LogInHandler() {
  console.log("LogInHandler triggered");
  const UserCheck = Username_Login.value;
  const userName = Username_Login.value;
  const password = Password_Login.value;

  if (userName === "" || password === "") {
    showAlert("Please Enter Required Field", "error", SignIn_message);
    return;
  }
  const UserExists = Users.find(
    (user) =>
      (user.username === UserCheck || user.email === UserCheck) &&
      user.password === password
  );

  if (UserExists) {
    showAlert("Logged In Successfully", "success", SignIn_message);
    
    setTimeout(() => {
      openGamePage();
    }, 1000);
  } else {
    showAlert("Username or Password is Incorrect", "error", SignIn_message);
  }
}
SignInBtn.addEventListener("click", LogInHandler);
