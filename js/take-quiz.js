

const quizList = JSON.parse(localStorage.getItem("quizList"));

const currentQuizIndex = localStorage.getItem("currentQuizIndex");
if (currentQuizIndex === "undefined") window.location.replace("my-quizzes.html");

const currentQuiz = quizList[currentQuizIndex];
const currentQuizQuestions = currentQuiz.allQuestions;
const totalQuestions = currentQuizQuestions.length;

let userAnswers = new Array(totalQuestions).fill(null);
let currentQuestionIndex = 0;

const time = document.querySelector("#time-left");
const questionNumber = document.querySelector("#current-q");
const question = document.querySelector("#question-text");
const optA = document.querySelector("#opt-A");
const optB = document.querySelector("#opt-B");
const optC = document.querySelector("#opt-C");
const optD = document.querySelector("#opt-D");

const allOptions = document.querySelectorAll(".option-card input[type='radio']");

const previousBtn = document.querySelector(".prev-btn");
const clearBtn = document.querySelector(".clear-btn");
const nextBtn = document.querySelector(".next-btn");
const submitBtn = document.querySelector(".submit-btn");

previousBtn.addEventListener("click", previousQuestion);
clearBtn.addEventListener("click", clearAnswer);
nextBtn.addEventListener("click", nextQuestion);
submitBtn.addEventListener("click", submitQuiz);

let timeInterval;
let timeLeft = currentQuiz.duration * 60;

init()

function init() {

    allOptions.forEach(option => {

        option.addEventListener("change", () => {
            userAnswers[currentQuestionIndex] = option.value;
        })

    })

    document.querySelector("#total-q").innerText = totalQuestions;

    time.innerText = `${currentQuiz.duration} : 00`;

    loadQuestion();
    loadAnswer();

    timeInterval = setInterval(updateTimer, 1000);

}

function loadQuestion() {

    if (currentQuestionIndex === 0) previousBtn.setAttribute("disabled", true);
    else previousBtn.removeAttribute("disabled");

    if (currentQuestionIndex === totalQuestions - 1) {
        submitBtn.style.display = "";
        nextBtn.style.display = "none";
    }
    else {
        submitBtn.style.display = "none";
        nextBtn.style.display = "";
    }

    const currentQuestion = currentQuizQuestions[currentQuestionIndex];

    questionNumber.innerText = currentQuestionIndex + 1;
    question.innerText = currentQuestion.question;
    optA.innerText = currentQuestion.options.A;
    optB.innerText = currentQuestion.options.B;
    optC.innerText = currentQuestion.options.C;
    optD.innerText = currentQuestion.options.D;

}

function loadAnswer() {

    allOptions.forEach(option => {
        if (userAnswers[currentQuestionIndex] === option.value) option.checked = true;
        else option.checked = false;
    })

}

function nextQuestion() {

    ++currentQuestionIndex;

    loadQuestion();
    loadAnswer();

}

function previousQuestion() {

    --currentQuestionIndex;

    loadQuestion();
    loadAnswer();

}

function clearAnswer() {

    userAnswers[currentQuestionIndex] = null;
    allOptions.forEach(option => option.checked = false);

}

function updateTimer() {

    timeLeft--;

    const mintue = (timeLeft / 60 < 10) ? ("0" + parseInt(timeLeft / 60)) : parseInt(timeLeft / 60);
    const second = (timeLeft % 60 < 10) ? ("0" + timeLeft % 60) : (timeLeft % 60);

    time.innerText = `${mintue} : ${second}`;

    if (timeLeft === 0) submitQuiz();

}

function submitQuiz() {

    clearInterval(timeInterval);

    let history = JSON.parse(localStorage.getItem("history")) || [];

    const stats = getStats();

    const result = {
        title: currentQuiz.title,
        totalQuestions: totalQuestions,
        score: stats.correct,
        correct: stats.correct,
        wrong: stats.wrong,
        unattempted: stats.unattempted,
        status: (stats.correct > totalQuestions / 2) ? "Good" : "Bad",
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    }

    history.push(result);

    localStorage.setItem("history", JSON.stringify(history));

    localStorage.setItem("currentQuizIndex", JSON.stringify());

    window.location.replace("result.html");
}

function getStats() {

    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i] === null) {
            unattempted++;
            continue;
        }

        if (userAnswers[i] === currentQuizQuestions[i].answer) correct++;
        else wrong++;
    }

    return {
        correct: correct,
        wrong: wrong,
        unattempted: unattempted
    }

}