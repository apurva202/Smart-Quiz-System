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

updateList();

addBtn.addEventListener("click", addQuestion);

createQuizForm.addEventListener("submit", saveQuiz);

function addQuestion() {
    const q = question.value.trim();
    const a = optA.value.trim();
    const b = optB.value.trim();
    const c = optC.value.trim();
    const d = optD.value.trim();
    const ca = correct.value.trim();

    if (!q || !a || !b || !c || !d || !ca) {
        alert("Please Fill All Fields");
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
        alert('At Least 1 Question Required');
        return;
    }

    if (!t && !d) {
        alert('Please Fill "Title" and "Duration"');
        return;
    }

    if (!d) {
        alert('Please Fill "Duration"');
        return;
    }

    if (!t) {
        alert('Please Fill "Title"');
        return;
    }

    let duplicate = quizList.some(quiz => quiz.title.toLowerCase() === t.toLowerCase())

    if (duplicate) {
        alert("This Quiz Title Already Exists");
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
}
