const HangmanLetters = document.querySelectorAll(".keyboard-Hangman span");

export function JumpingLetters() {
  HangmanLetters.forEach((span, index) => {
    span.style.animationDelay = `${index * 0.05}s`;
  });
}

export function openGamePage() {
  window.location.href = "/HTML/play-Game.html";
}

export function LoadHeader() {
  fetch("../HTML/global.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;

      //checking LogIn Status of the user
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        document.getElementById("signup-link").style.display = "none";
        document.getElementById("signin-link").style.display = "none";
      }
    });
}
