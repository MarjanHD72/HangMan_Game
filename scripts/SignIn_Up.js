const SignInPage = document.getElementById("SignIn-div");
const SignUpPage = document.getElementById("SignUp-div");

const SignUpLink = document.getElementById("SignUpHyperLink");
const SignInLink = document.getElementById("signUpPageLink");

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

SignUpLink.addEventListener("click", ShowSignUpPageHandler);
SignInLink.addEventListener("click", ShowSignInPageHandler);
