let Category = document.querySelectorAll(".Categories button");
const HangmanLetters = document.querySelectorAll(".keyboard-Hngman span");
const change_Category = document.getElementById("change_Category");
// jumping Hangman Function
HangmanLetters.forEach((span, index) => {
  span.style.animationDelay = `${index * 0.1}s`;
});

// HideCategory

function HideCategoryHandler(event) {
  const selectedBtn = event.target;
  selectedBtn.style.display = "inline-block";
  HangmanLetters.forEach((span) => {
    span.style.display = "none";
  });
  Category.forEach((button) => {
    if (button !== selectedBtn) {
      button.style.display = "none";
      change_Category.style.display = "inline-block";
    }
  });
}

ShowCategories = () => {
  Category.forEach((button) => {
    button.style.display = "inline-block";
    change_Category.style.display = "none";
  });
};

Category.forEach((button) => {
  button.addEventListener("click", HideCategoryHandler);
});
change_Category.addEventListener("click", ShowCategories);
