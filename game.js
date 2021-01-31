const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptionAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "How old are you?",
    choice1: "14",
    choice2: "19",
    choice3: "15",
    choice4: "30",
    answer: 1,
  },
  {
    question: "What is your favorite food?",
    choice1: "Pizza",
    choice2: "Khinkali",
    choice3: "Khachapuri",
    choice4: "Tolma",
    answer: 2,
  },
  {
    question: "What is your favorite song?",
    choice1: "Country rouds",
    choice2: "Yesterday",
    choice3: "Don't let me down",
    choice4: "High hopes",
    answer: 3,
  },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //enter end page
    return window.location.assign("/end.html");
  }

  questionCounter++;
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

    acceptionAnswer = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    let classToApply = "incorect";
    if (currentQuestion.answer == selectedAnswer) {
      classToApply = "correct";
    }

    selectedChoice.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);

    console.log(selectedChoice);

  });
});

startGame();
