let $bishkek = document.getElementsByClassName('city')[0];
let $tree = document.getElementsByClassName('tree')[0];
let $recycling = document.getElementsByClassName('recycling')[0];
const garbageCounter = document.querySelector("#garbage-counter");
const treeCounter = document.querySelector("#tree_counter");
const recyclingCounter = document.querySelector("#recycling-counter");
const cleanupArea = document.querySelector(".cleanup");

let availableTrees = 0;
let availableBins = 0;

const balls = document.querySelectorAll('.ball');
const bin = document.querySelector('.bin');
let draggedBall = null;

balls.forEach(ball => {
    ball.setAttribute('draggable', true);
    ball.addEventListener('dragstart', (event) => {
        draggedBall = event.target;
    });
});

bin.addEventListener('dragover', (event) => {
    event.preventDefault();
});

bin.addEventListener('drop', (event) => {
    event.preventDefault();
    if (draggedBall) {
        // Обновляем счетчики
        garbageCounter.innerText = parseInt(garbageCounter.innerText) + 1;
        treeCounter.innerText = parseInt(treeCounter.innerText) + 1;
        recyclingCounter.innerText = parseInt(recyclingCounter.innerText) + 3;

        availableTrees++;
        availableBins++;

        // Удаляем собранный мусор
        draggedBall.remove();
        draggedBall = null;

        // Проверка на завершение задачи
        checkCompletion();
    }
});

// Добавляем возможность посадки дерева по клику в `.cleanup`
cleanupArea.addEventListener("click", function(event) {
    if (availableTrees > 0) {
        const tree = document.createElement("img");
        tree.src = "images/дерево.png"; // замените на путь к изображению дерева
        tree.className = "planted-tree";

        tree.style.position = "absolute";
        tree.style.left = `${event.clientX - cleanupArea.offsetLeft - 15}px`;
        tree.style.top = `${event.clientY - cleanupArea.offsetTop - 25}px`;

        cleanupArea.appendChild(tree);
        availableTrees--;
        treeCounter.innerText = availableTrees;

        checkCompletion();
    }
});

// Добавляем возможность установки урны по правому клику в `.cleanup`
cleanupArea.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    if (availableBins > 0) {
        const bin = document.createElement("img");
        bin.src = "images/waste-bin.png"; // замените на путь к изображению урны
        bin.className = "planted-bin";

        bin.style.position = "absolute";
        bin.style.left = `${event.clientX - cleanupArea.offsetLeft - 15}px`;
        bin.style.top = `${event.clientY - cleanupArea.offsetTop - 25}px`;

        cleanupArea.appendChild(bin);
        availableBins--;
        garbageCounter.innerText = availableBins;

        checkCompletion();
    }
});

// Функция для проверки завершения задачи
function checkCompletion() {
    if (availableTrees === 0 && availableBins === 0 && parseInt(garbageCounter.innerText) === balls.length) {
        cleanupArea.style.backgroundColor = "rgba(0, 128, 0, 0.5)";

        const successMessage = document.createElement("div");
        successMessage.textContent = "Молодец! Ты очистил город!";
        successMessage.style.position = "absolute";
        successMessage.style.top = "50%";
        successMessage.style.left = "50%";
        successMessage.style.transform = "translate(-50%, -50%)";
        successMessage.style.fontSize = "32px";
        successMessage.style.color = "green";
        successMessage.style.fontWeight = "bold";
        cleanupArea.appendChild(successMessage);
    }
}