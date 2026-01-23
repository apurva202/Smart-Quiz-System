
const history = JSON.parse(localStorage.getItem("history")) || [];

const header = document.querySelector(".performance-header");

const table = document.querySelector(".data-card");
const tableBody = document.querySelector("#table-body");

const empty_quiz_card = document.querySelector(".empty-quiz-card");

const clearBtn = document.querySelector("#clear-btn");

const clearPopup = document.querySelector("#clear-popup");
const cancelBtn = document.querySelector("#cancel-btn");
const confirmBtn = document.querySelector("#confirm-btn");

confirmBtn.addEventListener("click", confirmClear);
cancelBtn.addEventListener("click", cancelClear);

init();

function init() {

    clearBtn.addEventListener("click", clearHistory);

    updateHistory()
    
}

function updateHistory() {
    
    tableBody.innerHTML = "";

    if (history.length === 0) {
        table.style.display = "none";
        header.style.display = "none";
        empty_quiz_card.style.display = "flex";
    }
    else {
        table.style.display = "";
        header.style.display = "";
        empty_quiz_card.style.display = "none";
    }

    history.forEach(data => {

        const tr = document.createElement("tr");

        const percent = ((data.score/data.totalQuestions)*100).toFixed(2);

        tr.innerHTML = `<td class="title">
                            ${data.title}
                        </td>
                        <td>
                            <div class="score ${data.status}">
                                <span class="score-a">${data.score}</span>/<span class="score-t">${data.totalQuestions}</span>
                            </div>
                        </td>
                        <td class="percent ${data.status}">${percent}%</td>
                        <td>${data.date}</td>
                        <td>${data.time}</td>`

        tableBody.append(tr);

    })

}

function clearHistory() {
    clearPopup.style.display = "flex";
}

function confirmClear() {
    clearPopup.style.display = "none";
    history.splice(0,history.length);
    localStorage.setItem("history",JSON.stringify(history));
    updateHistory();
}

function cancelClear() {
    clearPopup.style.display = "none";
}

