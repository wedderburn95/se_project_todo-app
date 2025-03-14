class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length;
    console.log("this._completed", this._completed);
    this._total = todos.length;
    // console.log(this._completed);
    // console.log(this._total);
    this._updateText();
  }

  updateCompleted(increment) {
    this._completed += increment ? 1 : -1;
    this._updateText();
  }

  updateTotal(increment) {
    this._total += increment ? 1 : -1;
    this._updateText();
  }

  _updateText() {
    //console.log("this._completed", this._completed);
    console.log("this._total", this._total);
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
