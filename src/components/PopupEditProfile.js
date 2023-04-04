import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default class EditProfilePopup extends React.Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      about: "",
    };

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onUpdateUser({
      name: this.state.name,
      about: this.state.about,
    });
  }

  handleChangeInput(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({
        name: this.context.name,
        about: this.context.about,
      });
    }
  }

  render() {
    const buttonText = this.props.isLoadingData ? "Сохранение..." : "Сохранить";

    return (
      <PopupWithForm
        title="Редактировать профиль"
        name="editor-profile"
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onSubmit={this.handleSubmit}
        buttonText={buttonText}
        isLoadingData={this.props.isLoadingData}
      >
        <label className="form__field" htmlFor="editProfile-name">
          <input
            id="editProfile-name"
            name="name"
            className="form__input form__input_type_name"
            type="text"
            required
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            value={this.state.name}
            onChange={this.handleChangeInput}
          />

          <span className="editProfile-name-error form__input-error"></span>
        </label>

        <label className="form__field" htmlFor="editProfile-about">
          <input
            id="editProfile-about"
            name="about"
            className="form__input form__input_type_desc"
            type="text"
            required
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            value={this.state.about}
            onChange={this.handleChangeInput}
          />

          <span className="editProfile-about-error form__input-error"></span>
        </label>
      </PopupWithForm>
    );
  }
}
