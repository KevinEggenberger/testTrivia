function selectButton(choice) {
  const yesButton = document.getElementById("yes-button");
  const noButton = document.getElementById("no-button");

  if (choice === "yes") {
    yesButton.classList.add("active");
    noButton.classList.remove("active");
  } else {
    noButton.classList.add("active");
    yesButton.classList.remove("active");
  }
}

// Placeholder function to set the question text
function setQuestionText(text) {
  document.getElementById("question-text").innerText = text;
}

// Example usage:
setQuestionText("Is this an example question?");
