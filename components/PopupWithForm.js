import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handlForsubmit) {
    super(popupSelector);
    this._handlForsubmit = handlForsubmit;
    this._form = this._popupElement.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formVlues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handlForsubmit(this._getInputValues());
      this._close();
    });
  }
}
export default PopupWithForm;
