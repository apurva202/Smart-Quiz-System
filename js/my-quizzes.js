
const quizList = JSON.parse(localStorage.getItem("quizList")) || [];

const quiz_card_grid = document.querySelector(".quiz-card-grid");
const empty_quiz_card = document.querySelector(".empty-quiz-card");

const deletePopup = document.querySelector("#delete-popup");
const cancelBtn = document.querySelector("#cancel-btn");
const confirmBtn = document.querySelector("#confirm-btn");

let indexToDelete = null;

confirmBtn.addEventListener("click", confirmDelete);
cancelBtn.addEventListener("click", cancelDelete);

updateList();

function updateList() {

    quiz_card_grid.innerHTML = "";
    
    if (quizList.length === 0) empty_quiz_card.style.display = "flex";
    else empty_quiz_card.style.display = "none";

    quizList.forEach((quiz, i) => {

        const quizCard = document.createElement("div");
        quizCard.classList.add("quiz-card")

        quizCard.innerHTML = `<div class="title">${quiz.title}</div>
                <div class="duration">duration : ${quiz.duration} min</div>
                <div class="questions-created">
                    <div class="questions">${quiz.allQuestions.length} Questions</div>
                    <div class="created">created : ${quiz.created}</div>
                </div>
                <div class="buttons">
                    <button class="start-btn">Start</button>
                    <img src="icons/delete.png" alt="delete" class="delete-btn">
                </div>`

        quizCard.querySelector(".start-btn").addEventListener("click",() => {
            startQuiz(i);
        })
        quizCard.querySelector(".delete-btn").addEventListener("click",() => {
            deleteQuiz(i);
        })

        quiz_card_grid.append(quizCard);
    })
}

function startQuiz(index){
    localStorage.setItem("currentQuizIndex", JSON.stringify(index));
    window.location.href = "take-quiz.html"
}

function deleteQuiz(index) {
    deletePopup.style.display = "flex";
    indexToDelete = index;
}

function confirmDelete() {
    deletePopup.style.display = "none";
    quizList.splice(indexToDelete, 1);
    updateLocalStorage();
    updateList();
    indexToDelete = null;
}

function cancelDelete() {
    deletePopup.style.display = "none";
    indexToDelete = null;
}

function updateLocalStorage() {
    localStorage.setItem("quizList" , JSON.stringify(quizList));
}