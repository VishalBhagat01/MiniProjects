let taskData = {
    todo: [],
    progress: [],
    done: []
};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const addTaskButton = document.querySelector("#add-task-btn");
const toggleModalButton = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".bg");
const modal = document.querySelector(".modal");

let dragElement = null;

function saveTasks() {
    [todo, progress, done].forEach((column) => {
        const tasks = column.querySelectorAll(".task");

        taskData[column.id] = Array.from(tasks).map((task) => ({
            title: task.querySelector("h2").innerText,
            description: task.querySelector("p").innerText,
        }));

        column.querySelector(".right").innerText = tasks.length;
    });

    localStorage.setItem("taskData", JSON.stringify(taskData));
}

function addTaskEvents(task) {
    task.addEventListener("dragstart", () => {
        dragElement = task;
    });

    task.querySelector("button").addEventListener("click", () => {
        task.remove();
        saveTasks();
    });
}

function createTaskElement(title, description, column) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.draggable = true;

    task.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <button>Delete</button>
    `;

    addTaskEvents(task);
    column.appendChild(task);

    return task;
}

const storedTasks = JSON.parse(localStorage.getItem("taskData"));

if (storedTasks) {
    taskData = storedTasks;

    for (const columnId in taskData) {
        const column = document.querySelector(`#${columnId}`);

        taskData[columnId].forEach((item) => {
            createTaskElement(item.title, item.description, column);
        });
    }
} else {
    document.querySelectorAll(".task").forEach(addTaskEvents);
}

function addDragEvents(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("hover-over");
    });

    column.addEventListener("drop", (e) => {
        e.preventDefault();

        if (dragElement) {
            column.appendChild(dragElement);
            saveTasks();
        }

        column.classList.remove("hover-over");
    });
}

addDragEvents(todo);
addDragEvents(progress);
addDragEvents(done);

toggleModalButton.addEventListener("click", () => {
    modal.classList.add("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});

addTaskButton.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title").value.trim();
    const taskDescription = document.querySelector("#task-description").value.trim();

    if (!taskTitle) {
        alert("Please enter a task title.");
        return;
    }

    createTaskElement(taskTitle, taskDescription, todo);

    document.querySelector("#task-title").value = "";
    document.querySelector("#task-description").value = "";

    modal.classList.remove("active");

    saveTasks();
});

saveTasks();