import { userAuthentication } from "./userAuthentication.js";
const auth = new userAuthentication();

//jumping letters in header
export function JumpingLetters() {
  const HangmanLetters = document.querySelectorAll(".keyboard-Hangman span");
  HangmanLetters.forEach((span, index) => {
    span.style.animationDelay = `${index * 0.05}s`;
  });
}
//Open game page method
export function openGamePage() {
  window.location.href = "/HTML/play-Game.html";
}
// Loading header in pages
export function LoadHeader() {
  let headerPath = "./HTML/global.html";
  if (window.location.pathname.includes("/HTML/")) {
    headerPath = "../HTML/global.html";
  }
  fetch(headerPath)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
      JumpingLetters();

      const auth = new userAuthentication();
      const loggedUser = auth.getUser();

      if (loggedUser) {
        // If user is loged in, the buttons will be hidden
        const signUpLink = document.getElementById("signup-link");
        const signInLink = document.getElementById("signin-link");
        if (signUpLink) signUpLink.style.display = "none";
        if (signInLink) signInLink.style.display = "none";

        //  LogOut
        const menu = document.querySelector(".menu");
        if (menu) {
          // creating LogOut Button
          const logoutBtn = document.createElement("a");
          logoutBtn.href = "#";
          logoutBtn.id = "logout-link";
          logoutBtn.innerText = `Logout ${loggedUser.username}`;
          menu.appendChild(logoutBtn);
          // modals
          const modalOverlay = logoutModal;
          const confirmLogout = logoutModal.querySelector("#confirmLogout");
          const cancelLogout = logoutModal.querySelector("#cancelLogout");
          // Opening modal
          logoutBtn.addEventListener("click", (event) => {
            event.preventDefault();
            modalOverlay.style.display = "flex";
          });
          //confirmLogout
          confirmLogout.addEventListener("click", () => {
            auth.logOut();

            window.location.href = "../index.html";
          });
          cancelLogout.addEventListener("click", () => {
            modalOverlay.style.display = "none";
          });
        }
      }
    });
}
