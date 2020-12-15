const todoForm = document.querySelector(".todoForm"),
      todoInput = todoForm.querySelector("input"),
      todoList = document.querySelector(".todoList");

const TODOS_LOCAL = "todos";

function paintTodos(text) {
  console.log(text)
}

function handleSubmit(event) {
  event.preventDefault();
  const value = todoInput.value;
  paintTodos(value);
  value = "";
}

function loadTodos() {
  const todos = localStorage.getItem(TODOS_LOCAL);
  if(todos !== null) {}
}

function init() {
  loadTodos();
  todoForm.addEventListener("submit", handleSubmit)
}

init();