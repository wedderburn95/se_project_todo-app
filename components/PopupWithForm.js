import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._values = {};
    this._inputList.forEach(
      (input) => (this._values[input.name] = input.value)
    );
    return this._values;
  }

  close() {
    super.close();
    this._popupForm.reset(); // Ensure form resets after submission
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
export default PopupWithForm;
