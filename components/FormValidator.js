// create a class
class FormValidator {
  // create constructor
  // specify parameters
  constructor(settings, formEl) {
    // log the parameters to the console
    // this._formSelector = settings._formSelector;
    this._inputSelector = settings.inputSelector;
    this._formSelector = settings.formSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  //TODO - implement showInputError
  _showInputError(inputElement, errorMessage) {
    // (1) TODO - implement showInputError
    // (a) copy the showInputError function from scripts/validate.js
    // (b) replace the formElement parameter with this._formEl
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formEl.querySelector(errorElementId);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    // (1) TODO - implement hideInputError
    // (a) copy the hideInputError function from scripts/validate.js
    // (b) replace the formElement parameter with this._formEl
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formEl.querySelector(errorElementId);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    // (1) TODO - implement checkInputValidity
    // (a) copy the checkInputValidity function from scripts/validate.js
    // (b) replace the formElement parameter with this._formEl
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    // (1) TODO - implement toggleButtonState
    // (a) copy the toggleButtonState function from scripts/validate.js
    // (b) replace the formElement parameter with this._formEl
    const inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    // (2) TODO - finish implementing setEventListeners
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  resetValidation() {
    // Clear errors and reset inputs
    // this._inputList.forEach((inputElement) => {
    //   this._hideInputError(inputElement);
    //   inputElement.value = ""; // Reset input value
    // });

    // Disable the submit button
    this._toggleButtonState();
    this._formEl.reset();
  }

  // create a method
  enableValidation() {
    // const formElement = document.querySelector(this._formSelector);
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

// export
export default FormValidator;
// What will this code output?
// The code will output the FormValidator class that can be imported into other files.
