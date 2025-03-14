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

const handleDelete = (evt) => {
  if (evt) {
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

  const todoElement = todo.getView();
  todoSection.addItem(todoElement);

  // Only update total count if it's not an initial render
  // if (!isInitialRender) {
  //   todoCounter.updateTotal(true);
  // }

  // Update counters
  // todoCounter.updateTotal(true);
  // if (data.completed) {
  //   todoCounter.updateCompleted(true);
  // }
};

const todoSection = new Section(
  {
    items: initialTodos,
    renderer: renderTodo,
  },
  ".todos__list"
);
todoSection.renderItems();

//instantiate
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

const addTodoPopup = new PopupWithForm(
  "#add-todo-popup",
  (values) => {
    const todoData = {
      id: uuidv4(),
      ...values,
      completed: false,
    };

    renderTodo(todoData);
    newTodoValidator.resetValidation();
    addTodoPopup.close();

    todoCounter.updateTotal(true);
  },
  newTodoValidator
);

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
