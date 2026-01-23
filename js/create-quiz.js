// CREATE QUIZ

let allQuestions = JSON.parse(localStorage.getItem("createQuizDraft")) || [];

const addBtn = document.querySelector("#add-Question-Btn");

const question = document.querySelector("#question");
const optA = document.querySelector("#option-a");
const optB = document.querySelector("#option-b");
const optC = document.querySelector("#option-c");
const optD = document.querySelector("#option-d");
const correct = document.querySelector("#correct-answer");

const createQuizForm = document.querySelector("#create-quiz-form");

const title = document.querySelector("#quiz-title");
const duration = document.querySelector("#duration");

const question_list = document.querySelector(".question-list");
const question_count = document.querySelector("#question-Count");

const container = document.querySelector("#custom-popup");
const closeBtn = document.querySelector("#popup-close-btn");
let submit = false;

updateList();

addBtn.addEventListener("click", addQuestion);

createQuizForm.addEventListener("submit", saveQuiz);

closeBtn.addEventListener("click", closePopUp);

function addQuestion() {
    const q = question.value.trim();
    const a = optA.value.trim();
    const b = optB.value.trim();
    const c = optC.value.trim();
    const d = optD.value.trim();
    const ca = correct.value.trim();

    if (!q || !a || !b || !c || !d || !ca) {
        popUp("Missing Info","Please Fill All Fields of Question","error");
        return;
    }

    allQuestions.push({
        question: q,
        options: { A: a, B: b, C: c, D: d },
        answer: ca
    })

    updateList();
    clearField();
}

function updateList() {

    localStorage.setItem("createQuizDraft", JSON.stringify(allQuestions));

    question_count.innerText = allQuestions.length;

    if (allQuestions.length === 0) {
        question_list.innerText = "No questions added yet";
        return;
    }

    question_list.innerHTML = ""

    allQuestions.forEach((q, i) => {

        const questionItem = document.createElement("div");
        questionItem.classList.add("question-item");

        questionItem.innerHTML = `<span class="question-number">Q${i + 1}.</span>
                            <span class="question-text">${q.question}</span>
                            <span class="question-answer">Ans: ${q.answer}</span>
                            <img src="icons/delete.png" alt="delete">`

        questionItem.querySelector("img").addEventListener("click", () => {
            deleteQuestion(i)
        });

        question_list.append(questionItem);
    })

}

function clearField() {
    question.value = "";
    optA.value = "";
    optB.value = "";
    optC.value = "";
    optD.value = "";
    correct.value = "";
}

function deleteQuestion(index) {
    allQuestions.splice(index, 1);
    updateList();
}

function saveQuiz(e) {
    e.preventDefault();

    const t = title.value.trim();
    const d = duration.value.trim();

    const quizList = JSON.parse(localStorage.getItem("quizList")) || [];

    if (allQuestions.length == 0) {
        popUp("Empty Quiz", "At least 1 question is required to save.", "error");
        return;
    }

    if (!t && !d) {
        popUp("Missing Info", "Please fill both 'Title' and 'Duration'.", "error");
        return;
    }

    if (!d) {
        popUp("Missing Duration", "Please enter the quiz duration.", "error");
        return;
    }

    if (!t) {
        popUp("Missing Title", "Please enter a title for your quiz.", "error");
        return;
    }

    let duplicate = quizList.some(quiz => quiz.title.toLowerCase() === t.toLowerCase())

    if (duplicate) {
        popUp("Duplicate Title", "This Quiz Title already exists.", "error");
        window.scrollTo({top:0})
        return;
    }

    quizList.push({
        title: t,
        allQuestions: allQuestions,
        duration: parseInt(d),
        created: new Date().toLocaleString()
    })

    localStorage.setItem("quizList", JSON.stringify(quizList));

    allQuestions = [];
    updateList();

    submit = true;
    popUp("Saved", "Your quiz has been saved successfully.","success")
}

function popUp(heading, message, type){

    const icon = document.querySelector(".popup-icon");
    const head = document.querySelector("#popup-title");
    const msg = document.querySelector("#popup-message");

    if (type === "success"){
        icon.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    }
    else {
        icon.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
    }

    head.innerText = heading;
    msg.innerText = message;

    container.className = type;
    container.style.display = "flex";

}

function closePopUp() {
    
    container.style.display = "none";

    if (submit) window.location.replace("index.html");

}