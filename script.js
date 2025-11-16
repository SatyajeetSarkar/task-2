const inputTask = document.getElementById("inputTask");
const addButton = document.getElementById("addButton");
const taskItems = document.getElementById("taskItems");

const SVG_UNCHECKED = `
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2">
    <rect x="3" y="3" width="18" height="18" rx="4"></rect>
</svg>`;

const SVG_CHECKED = `
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="3">
    <polyline points="20 6 9 17 4 12"></polyline>
</svg>`;

loadTasks();

function addTasks() {
    const tasks = inputTask.value.trim();

    if (tasks) {
        createTasks({ text: tasks, completed: false });
        inputTask.value = "";
        saveTasks();
    } else {
        alert("Please Enter Task First");
    }
}

addButton.addEventListener("click", addTasks);

function createTasks(taskObj) {
    const listItem = document.createElement("li");
    listItem.className = "items";

    const checkBox = document.createElement("div");
    checkBox.className = "taskCheckSvg";
    checkBox.innerHTML = taskObj.completed ? SVG_CHECKED : SVG_UNCHECKED;

    const taskText = document.createElement("span");
    taskText.textContent = taskObj.text;

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "buttonGroup";

    const completeButton = document.createElement("button");
    completeButton.textContent = "✓";
    completeButton.className = "completeTask";

    if (taskObj.completed) {
        completeButton.style.display = "none";
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.className = "deleteTask";

    buttonGroup.appendChild(completeButton);
    buttonGroup.appendChild(deleteButton);

    listItem.appendChild(checkBox);
    listItem.appendChild(taskText);
    listItem.appendChild(buttonGroup);

    taskItems.appendChild(listItem);

    completeButton.addEventListener("click", function () {
        markCompleted(checkBox, taskText, completeButton);
        saveTasks();
    });

    checkBox.addEventListener("click", function () {
        const isCompleted = checkBox.innerHTML.includes("polyline");

        if (isCompleted) {
            checkBox.innerHTML = SVG_UNCHECKED;
            taskText.style.textDecoration = "none";
            completeButton.style.display = "inline-block";
        } else {
            markCompleted(checkBox, taskText, completeButton);
        }

        saveTasks();
    });

    deleteButton.addEventListener("click", function() {
        taskItems.removeChild(listItem);
        saveTasks();
    });
}

function markCompleted(checkBox, taskText, completeButton) {
    checkBox.innerHTML = SVG_CHECKED;
    completeButton.style.display = "none";
}

function saveTasks() {
    let tasks = [];

    taskItems.querySelectorAll("li").forEach(function (item) {
        const text = item.querySelector("span").textContent;

        const isCompleted = item.querySelector(".taskCheckSvg").innerHTML.includes("polyline");

        tasks.push({ text, completed: isCompleted });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    tasks.forEach(createTasks);
}
