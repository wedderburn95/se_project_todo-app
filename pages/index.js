import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
// import from FormValidator.js
import FormValidator from "../components/FormValidator.js";

// console.log(initialTodos);
// console.log(validationConfig);

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
// const todoTemplate = document.querySelector("#todo-template"); To Remove
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  document.addEventListener("keydown", closeOnEscape);
  modal.addEventListener("mousedown", closeOnOverlay);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", closeOnEscape);
  modal.removeEventListener("mousedown", closeOnOverlay);
};

function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".popup_visible");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function closeOnOverlay(evt) {
  if (evt.target.classList.contains("popup_visible")) {
    closeModal(evt.target);
  }
}

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;

  //To be removed:

  // todoNameEl.textContent = data.name;
  // todoCheckboxEl.checked = data.completed;

  // // Apply id and for attributes.
  // // The id will initially be undefined for new todos.
  // todoCheckboxEl.id = `todo-${data.id}`;
  // todoLabel.setAttribute("for", `todo-${data.id}`);

  // // If a due date has been set, parsing this it with `new Date` will return a
  // // number. If so, we display a string version of the due date in the todo.

  // todoDeleteBtn.addEventListener("click", () => {
  //   todoElement.remove();
  // });
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4(); //This id variable will create new id's for any added Todo item.
  const values = { name, date, id }; //  Add the new id as an argument to values
  const todo = generateTodo(values); // Now anytime a new card is created a unique id will be crated as well
  todosList.append(todo);
  closeModal(addTodoPopup);
  addTodoForm.reset();
  newTodoValidator.resetValidation();
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

//instantiate
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
