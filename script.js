const quizData = [
  {
    question: "What is the main purpose of HTML?",
    options: [
      "Styling web pages",
      "Creating database",
      "Structuring web content",
      "Making web pages interactive"
    ],
    answer: 2
  },
  {
    question: "Which CSS property is used to make a website responsive?",
    options: [
      "display",
      "position",
      "media queries",
      "float"
    ],
    answer: 2
  },
  {
    question: "What does console.log() do?",
    options: [
      "Displays output on webpage",
      "Prints output to console",
      "Shows alert box",
      "Stores data"
    ],
    answer: 1
  },
  {
    question: "Which attribute is used to link CSS file?",
    options: [
      "src",
      "href",
      "link",
      "style"
    ],
    answer: 1
  },
  {
    question: "What is DOM?",
    options: [
      "Database Object Model",
      "Document Object Model",
      "Data Object Method",
      "Digital Order Model"
    ],
    answer: 1
  }
];

let currentQuestion = 0;
let userAnswers = new Array(quizData.length).fill(null);

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const submitBtn = document.getElementById("submitBtn");

loadQuestion();

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="option" value="${index}"
      ${userAnswers[currentQuestion] === index ? "checked" : ""}>
      ${option}
    `;
    optionsEl.appendChild(label);
  });

  submitBtn.style.display =
    currentQuestion === quizData.length - 1 ? "block" : "none";
}

function nextQuestion() {
  saveAnswer();
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
}

function prevQuestion() {
  saveAnswer();
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function saveAnswer() {
  const selected = document.querySelector("input[name='option']:checked");
  if (selected) {
    userAnswers[currentQuestion] = Number(selected.value);
  }
}

function submitQuiz() {
  saveAnswer();
  let score = 0;

  userAnswers.forEach((ans, index) => {
    if (ans === quizData[index].answer) score++;
  });

  document.getElementById("question-container").classList.add("hidden");
  document.querySelector(".buttons").classList.add("hidden");
  document.getElementById("score-board").classList.remove("hidden");
  document.getElementById("score").textContent =
    `${score} / ${quizData.length}`;
}
