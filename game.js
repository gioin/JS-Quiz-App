const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptionAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch(
  "https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple"
)
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formatetQuestions = {
        question: loadedQuestion.question,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formatetQuestions.answer = Math.floor(Math.random() * 3 + 1);
      answerChoices.splice(
        formatetQuestions.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formatetQuestions["choice" + (index + 1)] = choice;
      });
      return formatetQuestions;
    });

    //questions = loadedQuestions;
    startGame();
  })
  .catch((err) => {
    console.log(err);
  });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  game.classList.remove("hidden");
  loader.classList.add("hidden");
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //enter end page
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //update the progressbar
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  console.log(availableQuestions);
  acceptionAnswer = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptionAnswer) return;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    acceptionAnswer = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    let classToApply = "incorect";
    if (currentQuestion.answer == selectedAnswer) {
      classToApply = "correct";
      incrementScoure(CORRECT_BONUS);
    }

    selectedChoice.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);

    console.log(selectedChoice);
  });
});

incrementScoure = (num) => {
  score += num;
  scoreText.innerText = score;
};
