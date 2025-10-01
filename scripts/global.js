const HangmanLetters = document.querySelectorAll(".keyboard-Hangman span");
// jumping Hangman Function
HangmanLetters.forEach((span, index) => {
  span.style.animationDelay = `${index * 0.1}s`;
});

export function openGamePage() {
  window.location.href = "/HTML/play-Game.html";
}
