
const history = JSON.parse(localStorage.getItem("history")) || [];

const result = (history.length === 0) ? {} : history.at(-1);

const score = document.querySelector("#score");
const totalScore = document.querySelector("#total-score");
const correct = document.querySelector("#correct-count");
const wrong = document.querySelector("#wrong-count");
const unattempted = document.querySelector("#unattempted-count");

const homeBtn = document.querySelector("#home-btn");
const restartBtn = document.querySelector("#restart-btn");

init();

function init() {

    homeBtn.addEventListener("click", goToDashboard);

    if (history.length === 0) return;
    
    restartBtn.addEventListener("click", restartQuiz)

    score.innerText = result.score;
    totalScore.innerText = result.totalQuestions;
    correct.innerText = result.correct;
    wrong.innerText = result.wrong;
    unattempted.innerText = result.unattempted;

}

function goToDashboard() {
    localStorage.setItem("currentQuizIndex", JSON.stringify());
    window.location.replace("index.html");
}

function restartQuiz() {
    localStorage.setItem("currentQuizIndex", JSON.stringify(result.index));
    window.location.replace("take-quiz.html");
}

