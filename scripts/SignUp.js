// import { openGamePage } from "./global.js";
import { LoadHeader } from "./global.js";
import { JumpingKeyboardHangman } from "./global.js";
const UserName_SignUp = document.getElementById("User_SignUp_Input");
const password_SignUp = document.getElementById("Password_SignUp_input");
let Users = JSON.parse(localStorage.getItem("Users")) || [];
const Email_SignUp = document.getElementById("Email_SignUp_Input");
const PhoneNumber = document.getElementById("PhoneNumber-Input");
const P_Regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// const SigninButton = document.getElementById("HaveAccount");
const SU_message = document.getElementById("SignUp-message");

LoadHeader();
JumpingKeyboardHangman();
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
    console.log("Password is valid");
    showAlert("Please Enter Required Field", "error", SU_message);
    return;
  }
  //UserNAme validation
  const usernameRegex = /^[A-Za-z0-9_]{3,15}$/;
  if (!usernameRegex.test(userName)) {
    showAlert("UserName must include  3 to 15 character", "error", SU_message);
    return;
  }
  // password validation
  if (!P_Regex.test(password)) {
    console.log("tested");
    showAlert("Please choose strong Password", "error", SU_message);
    return;
  }

  // //Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showAlert("Please enter a valid Email", "error", SU_message);
    return;
  }
  //phone numbervalidation
  const phoneRegex = /^(\+44\s?7\d{9}|07\d{9})$/;
  if (!phoneRegex.test(Ph_Number)) {
    showAlert("Please enter a valid phone number", "error", SU_message);
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
    PhoneNumber: Ph_Number,
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
      PhoneNumber.value = "";
    }
  }, 2000);
};

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
