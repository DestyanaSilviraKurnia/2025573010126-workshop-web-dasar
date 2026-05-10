const todoInput = document.getElementById("todo-input");
const priorityInput = document.getElementById("priority-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const errorMsg = document.getElementById("error-msg");
const counter = document.getElementById("counter");
const clearCompletedBtn = document.getElementById("clear-completed");

let todos = JSON.parse(localStorage.getItem("myTodos")) || [];
let currentFilter = "semua";

// Inisialisasi
function init() {
  render();
  addBtn.addEventListener("click", addTodo);
  clearCompletedBtn.addEventListener("click", clearCompleted);

  // Filter logic
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelector(".filter-btn.active").classList.remove("active");
      e.target.classList.add("active");
      currentFilter = e.target.dataset.filter;
      render();
    });
  });
}

// Tambah Tugas & Validasi
function addTodo() {
  const text = todoInput.value.trim();
  const priority = priorityInput.value;

  if (text.length < 3 || text.length > 100) {
    errorMsg.innerText = "Teks harus 3-100 karakter!";
    return;
  }

  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false,
    priority: priority,
  };

  todos.push(newTodo);
  saveAndRender();
  todoInput.value = "";
  errorMsg.innerText = "";
}

// Render Tampilan
function render() {
  todoList.innerHTML = "";

  const filteredTodos = todos.filter((t) => {
    if (currentFilter === "aktif") return !t.completed;
    if (currentFilter === "selesai") return t.completed;
    return true;
  });

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    li.draggable = true;
    li.dataset.id = todo.id;

    li.innerHTML = `
            <input type="checkbox" ${todo.completed ? "checked" : ""} onchange="toggleTodo(${todo.id})">
            <span class="priority-badge ${todo.priority}">${todo.priority}</span>
            <span class="todo-text" ondblclick="editTodo(${todo.id})">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">&times;</button>
        `;

    // Event Drag & Drop
    li.addEventListener("dragstart", () => li.classList.add("dragging"));
    li.addEventListener("dragend", () => li.classList.remove("dragging"));

    todoList.appendChild(li);
  });

  // Drag over logic
  todoList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    const siblings = [
      ...todoList.querySelectorAll(".todo-item:not(.dragging)"),
    ];
    const nextSibling = siblings.find(
      (sibling) => e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2,
    );
    todoList.insertBefore(draggingItem, nextSibling);
  });

  updateCounter();
}

// Fitur Edit (Double Click)
window.editTodo = function (id) {
  const todo = todos.find((t) => t.id === id);
  const newText = prompt("Ubah tugas:", todo.text);
  if (newText && newText.length >= 3) {
    todo.text = newText;
    saveAndRender();
  }
};

window.toggleTodo = (id) => {
  const todo = todos.find((t) => t.id === id);
  todo.completed = !todo.completed;
  saveAndRender();
};

window.deleteTodo = (id) => {
  todos = todos.filter((t) => t.id !== id);
  saveAndRender();
};

function clearCompleted() {
  todos = todos.filter((t) => !t.completed);
  saveAndRender();
}

function updateCounter() {
  const remaining = todos.filter((t) => !t.completed).length;
  counter.innerText = `${remaining} tugas tersisa`;
}

function saveAndRender() {
  localStorage.setItem("myTodos", JSON.stringify(todos));
  render();
}

init();
