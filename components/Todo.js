class Todo {
  constructor(data, selector, handleCheck) {
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._completed = data.completed;
    this._selector = selector;
    this._handleCheck = handleCheck;
  }

  _setEventListeners() {
    this._checkboxEl.addEventListener("change", () => {
      this.toggleCompletion();
      this._handleCheck(this._completed);
    });
    // () => {this._completed = !this._completed;});

    this._deleteBtnEl.addEventListener("click", this._handleDelete);
    // () => {this._element.remove();});
  }

  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);
  }

  _generateNameEl() {
    this._nameEl = this._element.querySelector(".todo__name");
    this._nameEl.textContent = this._name;
  }

  _generateDateEl() {
    this._dateEl = this._element.querySelector(".todo__date");
    const dueDate = new Date(this._date);
    if (!isNaN(dueDate)) {
      this._dateEl.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _generateCheckboxEl() {
    this._checkboxEl = this._element.querySelector(".todo__completed");
    this._checkboxLabel = this._element.querySelector(".todo__label");
    this._checkboxEl.checked = this._completed;
    this._checkboxEl.id = `todo-${this._id}`;
    this._checkboxLabel.setAttribute("for", `todo-${this._id}`);
    this._deleteBtnEl = this._element.querySelector(".todo__delete-btn");
  }

  toggleCompletion = () => {
    this._completed = !this._completed;
  };

  _handleDelete = () => {
    this._element.remove();

    this._element = null;
  };

  getView() {
    if (!this._element) {
      this._element = this._getTemplate();
      this._generateNameEl();
      this._generateDateEl();
      this._generateCheckboxEl();
      this._setEventListeners();
      return this._element;
    }
  }
}

export default Todo;
