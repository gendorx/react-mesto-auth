import React from "react";

export default class PopupWithForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleEscClose = this.handleEscClose.bind(this);
  }

  handleEscClose(evt) {
    if (evt.key === "Escape") return this.props.onClose();
  }

  render() {
    const buttonText = this.props.buttonText || "Сохранить";

    return (
      <div
        className={`popup popup_type_${this.props.name} ${
          this.props.isOpen && "popup_opened"
        }`}
      >
        <div className="popup__container">
          <button
            className="popup__close button-icon button-icon_type_close"
            onClick={this.props.onClose}
          ></button>
          <h2 className="popup__title">{this.props.title}</h2>
          <form
            className="form"
            name={`form_${this.props.name}`}
            onSubmit={this.props.onSubmit}
          >
            {this.props.children}
            <button
              className={`popup__submit ${
                this.props.isLoadingData && "popup__submit_disabled"
              }`}
              type="submit"
              disabled={this.props.isLoadingData}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
