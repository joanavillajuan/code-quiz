// HTML elements
var viewHighScore = document.querySelector("#view-hs");
var timer = document.querySelector("#timer");
var startPage = document.querySelector(".start-page");
var startBtn = document.querySelector("#start-btn");
var quizPage = document.querySelector(".quiz-page");
var question = document.querySelector(".question");
var quizChoices = document.querySelector(".quiz-choices");
var btnA = document.querySelector("#A");
var btnB = document.querySelector("#B");
var btnC = document.querySelector("#C");
var btnD = document.querySelector("#D");
var linebreak = document.querySelector("#linebreak");
var quizAnswer = document.querySelector("#quiz-answer");
var scorePage = document.querySelector(".score-page");
var score = document.querySelector("#score");
var initialInput = document.querySelector(".initial-input");
var userInitial = document.querySelector(".user-initial");
var submitBtn = document.querySelector("#submit-btn");
var highscorePage = document.querySelector(".highscore-page");
var highscores = document.querySelector(".highscores");
var scoreList = document.querySelector(".score-list");
var goBackBtn = document.querySelector("#back-btn");
var clearHsBtn = document.querySelector("#clear-hs-btn");

// series of questions that will be asked
var questionSet = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title:
      "The condition between an if/else statement is enclosed within________.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "Array in Javascript can be used to store______.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    title:
      "String values must be enclosed within_____ when being assigned to variables",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log",
  },
];

// variables
var timeLeft = 75;
var qIndex = 0;

// When user click start button, timer starts counting down from 75 sec.
startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  quizPage.style.display = "block";
  startPage.style.display = "none";
  startTimer();
  quiz();

  console.log("Quiz started");
}

function startTimer() {
  setInterval(function () {
    timeLeft--;
    timer.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
      clearInterval();
      gameOver();
    }
  }, 1000);
}

// Questions and Choice presented when start button is clicked
function quiz() {
  question.textContent = questionSet[qIndex].title;
  btnA.textContent = questionSet[qIndex].choices[0];
  btnB.textContent = questionSet[qIndex].choices[1];
  btnC.textContent = questionSet[qIndex].choices[2];
  btnD.textContent = questionSet[qIndex].choices[3];
}

// Next Question is presented when the user clicks any choices
function nextQuestion() {
  if (qIndex < questionSet.length - 1) {
    qIndex++;
    quiz(qIndex);
  } else {
    gameOver();
  }

  console.log(qIndex);
}

// When is question wrong, time is subtracted from the clock
btnA.addEventListener("click", answerCheck);
btnB.addEventListener("click", answerCheck);
btnC.addEventListener("click", answerCheck);
btnD.addEventListener("click", answerCheck);

function answerCheck(event) {
  linebreak.style.display = "block";

  var correctAnswer = questionSet[qIndex].answer;
  if (correctAnswer == event.target.textContent) {
    quizAnswer.textContent = "Correct!";
  } else {
    quizAnswer.textContent = "Wrong!";
    timeLeft -= 10;
  }

  nextQuestion();

  console.log(quizAnswer.textContent);
  console.log(timeLeft);
}

// When quiz is over, score page is displayed.
function gameOver() {
  scorePage.style.display = "block";
  quizPage.style.display = "none";
  timer.style.display = "none";

  clearInterval(timeLeft);

  score.textContent = "Your final score is: " + timeLeft;
}

// User initials and scores
var highscore = [];
function saveScore() {
  scoreList.innerHTML = "";
  for (var i = 0; i < highscore.length; i++) var finalScore = highscore[i];

  var li = document.createElement("li");
  li.textContent = finalScore;
  scoreList.appendChild(li);

  console.log(scoreList);

  storeHighscore();
}

function showHighscore() {
  var storedScoreList = JSON.parse(localStorage.getItem("highscore"));

  if (storedScoreList !== null) {
    highscore = storedScoreList;
  }
  saveScore();

}

function storeHighscore() {
  localStorage.setItem("highscore", JSON.stringify(highscore));
}

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  window.location.href='highscore.html';

  finalScore = {
    id: userInitial.value,
    score: timeLeft,
  };

  // Return from function early if submitted blank
  if (finalScore == "") {
    return;
  }

  // add score to highscores
  highscore.push(finalScore);
  userInitial.value = "";

  // Store updated todos in localStorage
  storeHighscore();
  saveScore();
});

// When clear highscore is clicked
clearHsBtn.addEventListener("click", clearScores);
function clearScores() {
  localStorage.clear();
}

// whne go back button is clicked.
goBackBtn.addEventListener("click", clearScores);
function goBack() {
  window.location.href='index.html';
} 
