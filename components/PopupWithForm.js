import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, formValidator) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._formValidator = formValidator; // Store the Validator
  }

  _getInputValues() {
    querySelectorAll(".popup__input");
    this._values = {};
    this._inputList.forEach(
      (input) => (this._values[input.name] = input.value)
    );
    return this._values;
  }

  close() {
    this._popupForm.reset(); // Ensure form resets after submission
    if (this._formValidator) {
      this._formValidator.resetValidation(); // Reset validation is called safely
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
      this._popupForm.reset();
      this._formValidator.resetValidation();
    });
  }
}
export default PopupWithForm;
