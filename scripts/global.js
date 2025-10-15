import { userAuthentication } from "./userAuthentication.js";
const auth = new userAuthentication();

//jumping letters in header
export function JumpingKeyboardHangman() {
  const HangmanLetters = document.querySelectorAll(
    ".JumpingKeyboardHangman span"
  );
  HangmanLetters.forEach((span, index) => {
    span.style.animationDelay = `${index * 0.05}s`;
  });
}
//Open game page method
export function openGamePage() {
  window.location.href = "/HTML/play-Game.html";
}
// Loading header in pages by considering the location
export function LoadHeader() {
  let headerPath = "./HTML/global.html";
  if (window.location.pathname.includes("/HTML/")) {
    headerPath = "../HTML/global.html";
  }
  //fetching headers to load
  fetch(headerPath)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
      JumpingKeyboardHangman();
      // insert comment //////////////////////////////////////////////////////
      const highestScore = parseInt(localStorage.getItem("highestScore")) || 0;
      const highestElem = document.getElementById("highestScore");
      if (highestElem) highestElem.innerText = highestScore;

      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const loggedUser =
        auth.getUser() || JSON.parse(localStorage.getItem("loggedInUser"));

      if (loggedUser && isLoggedIn === "true") {
        // If user is loged in, the buttons will be hidden
        const signUpLink = document.getElementById("signup-link");
        const signInLink = document.getElementById("signin-link");
        if (signUpLink) signUpLink.style.display = "none";
        if (signInLink) signInLink.style.display = "none";

        // Hide SignUp / SignIn buttons in homepage (if user is logged in)
        const homeSignUpBtn = document.getElementById("SignUp-Btn");
        const homeSignInBtn = document.getElementById("SignIn-Btn");
        const homePlayBtn = document.getElementById("Play-Btn");
        if (homeSignUpBtn) homeSignUpBtn.style.display = "none";
        if (homeSignInBtn) homeSignInBtn.style.display = "none";
        if (homePlayBtn) homePlayBtn.innerText = "Play Now";

        //  LogOut
        const menu = document.querySelector(".menu");
        if (menu) {
          // creating LogOut Button
          const logoutBtn = document.createElement("a");
          logoutBtn.href = "#";
          logoutBtn.id = "logout-link";
          logoutBtn.innerText = `Logout ${loggedUser.username}`;
          menu.appendChild(logoutBtn);
          // modals to exit Account

          const modalOverlay = logoutModal;
          const confirmLogout = logoutModal.querySelector("#confirmLogout");
          const cancelLogout = logoutModal.querySelector("#cancelLogout");
          // Opening modal
          logoutBtn.addEventListener("click", (event) => {
            event.preventDefault();
            modalOverlay.style.display = "flex";
          });
          //confirmLogout and transfer to the firs page
          confirmLogout.addEventListener("click", () => {
            auth.logOut();
            window.location.href = "../index.html";
          });
          //Cancellation of logout
          cancelLogout.addEventListener("click", () => {
            modalOverlay.style.display = "none";
            const celebrateOverlay = document.createElement("div");
            celebrateOverlay.classList.add("celebrate-overlay");
          });
        }
        //modal to View Scores
        const highScoreModal = document.getElementById("HighestScoreModal");
        const viewScores = document.getElementById("highestScores");
        if (viewScores && highScoreModal) {
          viewScores.addEventListener("click", (event) => {
            event.preventDefault();
            // getting data from localStorage
            const userScores =
              JSON.parse(localStorage.getItem("userScores")) || {};
            const sortedScores = Object.entries(userScores).sort(
              (a, b) => b[1] - a[1]
            );
            const tableBody = highScoreModal.querySelector(
              "#highScoreTable tbody"
            );
            tableBody.innerHTML = ""; // پاک کردن قبلی

            if (sortedScores.length === 0) {
              tableBody.innerHTML =
                "<tr><td colspan='2'>No scores available yet</td></tr>";
            } else {
              sortedScores.forEach(([username, score]) => {
                const row = document.createElement("tr");
                row.innerHTML = `<td>${username}</td><td>${score}</td>`;
                tableBody.appendChild(row);
              });
            }
            highScoreModal.style.display = "flex";
          });
        }
        const confirmExit = document.getElementById("confirmExit");
        if (confirmExit && highScoreModal) {
          confirmExit.addEventListener("click", () => {
            highScoreModal.style.display = "none";
          });
        }
      }
    });
}
