// import { openGamePage } from "./global.js";
import { LoadHeader } from "./global.js";

const SignInPage = document.getElementById("SignIn-div");
const SignUpPage = document.getElementById("SignUp-div");
const SignUpLink = document.getElementById("SignUpHyperLink");
const SignInLink = document.getElementById("signInPageLink");
const UserName_SignUp = document.getElementById("User_SignUp_Input");
const password_SignUp = document.getElementById("Password_SignUp_input");

const Email_SignUp = document.getElementById("Email_SignUp_Input");
const PhoneNumber = document.getElementById("PhoneNumber-Input");

const SigninButton = document.getElementById("HaveAccount");
const SU_message = document.getElementById("SignUp-message");

let Users = JSON.parse(localStorage.getItem("Users")) || [];
LoadHeader();
//Menu

//Generate RndomID for Created Users
const generateId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};

// Save Users details in Local Storage
const saveToLocalStorage = () => {
  localStorage.setItem("Users", JSON.stringify(Users));
};
function LogInPage() {
  window.location.href = "./SignIn.html";
}
//register New Users on website
const RegisterHandler = () => {
  console.log("RegisterHandler triggered");
  const userName = UserName_SignUp.value;
  const password = password_SignUp.value;
  const email = Email_SignUp.value;
  const Ph_Number = PhoneNumber.value;
  if (userName === "" || password === "" || email === "" || Ph_Number === "") {
    showAlert("Please Enter Required Field", "error", SU_message);
    return;
  }
  // Check User
  const UserExistance = Users.find((user) => user.email === email);
  if (UserExistance) {
    showAlert("This user already exist", "error", SU_message);
    return;
  }
  const newUser = {
    id: generateId(),
    username: userName,
    password: password,
    email: email,
    PhoneNumber: PhoneNumber,
  };
  Users.push(newUser);
  saveToLocalStorage();
  showAlert("User added Successfully", "success", SU_message);

  setTimeout(() => {
    LogInPage();
  }, 1000);
};

// Alert Message function
export const showAlert = (message, type, targetElement) => {
  targetElement.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  targetElement.append(alert);
  setTimeout(() => {
    if (targetElement === SU_message) {
      targetElement.innerText = "Create an Account";
      UserName_SignUp.value = "";
      password_SignUp.value = "";
      Email_SignUp.value = "";
    } else if (targetElement === SignIn_message) {
      targetElement.innerText = "Log in to Your account";
      Username_Login.value = "";
      Password_Login.value = "";
    }
  }, 2000);
};
// SignUpLink.addEventListener("click", ShowSignUpPageHandler);
// SignInLink.addEventListener("click", ShowSignInPageHandler);
// document.addEventListener("DOMContentLoaded", () => {
//   const SigninButton = document.getElementById("signInButton");

//   if (SigninButton) {
//     console.log("SigninButton found:", SigninButton);
//     SigninButton.addEventListener("click", LogInHandler);
//   } else {
//     console.log("SigninButton not found");
//   }
// });

const SubmitRegistration = document.getElementById("Submit_Registration");
if (SubmitRegistration) {
  SubmitRegistration.addEventListener("click", RegisterHandler);
}
document.addEventListener("DOMContentLoaded", () => {
  const SubmitRegistration = document.getElementById("Submit_Registration");
  if (SubmitRegistration) {
    SubmitRegistration.addEventListener("click", RegisterHandler);
  }
});
