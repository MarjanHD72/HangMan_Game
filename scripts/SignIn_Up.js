const SignInPage = document.getElementById("SignIn-div");
const SignUpPage = document.getElementById("SignUp-div");
const SignUpLink = document.getElementById("SignUpHyperLink");
const SignInLink = document.getElementById("signUpPageLink");
const UserName_SignUp = document.getElementById("User_SignUp_Input");
const password_SignUp = document.getElementById("Password_SignUp_input");
const Username_Login = document.getElementById("user_Login-input");
const Password_Login = document.getElementById("pass_Login-input");
const Email_SignUp = document.getElementById("Email_SignUp_Input");
const Submit_Registration = document.getElementById("Submit_Registration");
const SigninButton = document.getElementById("signInButton");
const SU_message = document.getElementById("SignUp-message");
const SignIn_message = document.getElementById("SignIn-message");

//Generate RndomID for Created Users
const generateId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};
// Switch Between SigUp and SignIn
ShowSignUpPageHandler = () => {
  SignInPage.style.transition = "opacity 0.5s ease-in-out";
  SignInPage.style.opacity = 0;
  setTimeout(() => {
    SignInPage.style.display = "none";
    SignUpPage.style.display = "block";
    SignInPage.style.opacity = 1;
    SignInPage.style.transition = "none";
  }, 550);
};
ShowSignInPageHandler = () => {
  SignUpPage.style.transition = "opacity 0.5s ease-in-out";
  SignUpPage.style.opacity = 0;
  setTimeout(() => {
    SignUpPage.style.display = "none";
    SignInPage.style.display = "block";
    SignUpPage.style.opacity = 1;
    SignUpPage.style.transition = "none";
  }, 550);
};

//register New Users on website

const RegisterHandler = () => {
  const userName = UserName_SignUp.value;
  const password = password_SignUp.value;
  const email = Email_SignUp.value;

  if (userName === "" || password === "" || email === "") {
    showAlert("Please Enter Required Field", "error", SU_message);
  } else {
    showAlert("User added Successfully", "success", SU_message);
    console.log("hi");
  }
};
// Login to existing account
const LogInHandler = () => {
  const userName = Username_Login.value;
  const password = Password_Login.value;
  if (userName === "" || password === "") {
    showAlert("Please Enter Required Field", "error", SignIn_message);
  } else {
    showAlert("Logged In Successfully", "success", SignIn_message);
  }
};

// Alert Message function
const showAlert = (message, type, targetElement) => {
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
      targetElement.style.backgroundColor = "#ecf0f3";
      Password_Login.value = "";
    }
  }, 2000);
};
SignUpLink.addEventListener("click", ShowSignUpPageHandler);
SignInLink.addEventListener("click", ShowSignInPageHandler);
Submit_Registration.addEventListener("click", RegisterHandler);
SigninButton.addEventListener("click", LogInHandler);
