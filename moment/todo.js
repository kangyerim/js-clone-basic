const todoForm = document.querySelector(".todoForm"),
      todoInput = todoForm.querySelector("input"),
      todoList = document.querySelector(".todoList");

const TODOS_LOCAL = "todos";
let toDos = [];

function deleteTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  todoList.removeChild(li);
  const cleaned = toDos.filter(function(todo) {
    return todo.id !== parseInt(li.id);
  })
  toDos = cleaned
  saveTodos();
}

function saveTodos() {
  localStorage.setItem(TODOS_LOCAL, JSON.stringify(toDos))
}

function paintTodos(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "delete";
  delBtn.addEventListener("click", deleteTodo);
  const span = document.createElement("span");
  span.innerText = text;
  const newId = toDos.length + 1;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  todoList.appendChild(li);

  const todoObj = {
    id : newId,
    text : text
  }
  toDos.push(todoObj);
  saveTodos();
}

function handleSubmit(event) {
  event.preventDefault();
  let currentValue = todoInput.value;
  paintTodos(currentValue);
  todoInput.value = "";
}

function loadTodos() {
  const loadedToDos = localStorage.getItem(TODOS_LOCAL);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintTodos(toDo.text);
    });
  }
}

function init() {
  loadTodos();
  todoForm.addEventListener("submit", handleSubmit)
}

init();