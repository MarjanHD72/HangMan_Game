const SignInPage = document.getElementById("SignIn-div");
const SignUpPage = document.getElementById("SignUp-div");
const SignUpLink = document.getElementById("SignUpHyperLink");
const SignInLink = document.getElementById("signUpPageLink");
const UserName_SignUp = document.getElementById("User_SignUp_Input");
const password_SignUp = document.getElementById("Password_SignUp_input");
const Email_SignUp = document.getElementById("Email_SignUp_Input");
const Submit_Registration = document.getElementById("Submit_Registration");

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

const RegisterHandler = () => {
  const userName = UserName_SignUp.value;
  const password = password_SignUp.value;
  const email = Email_SignUp.value;

  if (UserName_SignUp === "" && password_SignUp === "") {
    console.log("no value");
  } else {
    console.log(userName, password, email);
  }
};

SignUpLink.addEventListener("click", ShowSignUpPageHandler);
SignInLink.addEventListener("click", ShowSignInPageHandler);
Submit_Registration.addEventListener("click", RegisterHandler);
