/*setup*/
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";


/*save & load*/
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/*render tasks with filters*/
function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks.filter(task => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span>
        ${task.text}
        <span class="priority ${task.priority}">
          ${task.priority}
        </span>
      </span>
      <div class="actions">
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="editTask(${index})">✏</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

/*add task*/
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  tasks.push({
    text: taskInput.value,
    priority: prioritySelect.value,
    completed: false
  });

  saveTasks();
  renderTasks();

  taskInput.value = "";
});

/*actions*/
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task", tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

/*filters*/
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

/*initial render*/
renderTasks();