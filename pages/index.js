import { v4 as uuidv4 } from "https://jspm.dev/uuid";
// console.log("UUID Test:", uuidv4());
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
// import from FormValidator.js
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import Popup from "../components/Popup.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector("#add-todo-form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
// const todoTemplate = document.querySelector("#todo-template"); To Remove
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const handleDelete = (bool) => {
  if (bool) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
};

// The logic in this function should all be handled in the Todo class.
const renderTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    (isCompleted) => {
      todoCounter.updateCompleted(isCompleted);
    },
    handleDelete
  );

  return todo.getView();
};

const todoSection = new Section(
  {
    items: initialTodos,
    renderer: (data) => {
      const todoElement = renderTodo(data);
      todoSection.addItem(todoElement);
    },
  },
  ".todos__list"
);
todoSection.renderItems();

const addTodoPopup = new PopupWithForm("#add-todo-popup", (values) => {
  const name = addTodoForm.name.value;
  const dateInput = addTodoForm.date.value;
  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const id = uuidv4();
  // const values = { name, date, id };
  renderTodo({ ...values, id: uuidv4() });
  newTodoValidator.resetValidation();
  addTodoPopup.close();
  addTodoForm.reset();
});
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// This will eliminate duplicate code and improve maintainability.
const addRenderTodo = (data) => {
  const todoElement = renderTodo(data);
  todoSection.addItem(todoElement);
  // todosList.addItem(todo);
  //update the counter
  todoCounter.updateTotal(true);
  if (data.completed) {
    todoCounter.updateCompleted(true);
  }
};

// Render initial todos using the new function( I commented this call out because it was duplicating the initial todos. I kept todoSection.renderItems(); in the Section class because it is needed to render the initial todos.)
// initialTodos.forEach(renderTodo);

//instantiate
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
