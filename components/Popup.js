class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_visible");

    document.addEventListener("keydown", this._handleEscapeClose);

    this._popupElement.addEventListener("mousedown", this._handleOverlayClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");

    document.removeEventListener("keydown", this._handleEscapeClose);

    this._popupElement.removeEventListener(
      "mousedown",
      this._handleOverlayClose
    );
  }

  _handleEscapeClose(evt) {
    // if (evt.key === "Escape") {
    this.close();
    // }
  }

  _handleOverlayClose(evt) {
    if (evt.target === this._popupElement) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseBtn.addEventListener("click", () => {
      this.close();
    });
  }
}

export default Popup;
