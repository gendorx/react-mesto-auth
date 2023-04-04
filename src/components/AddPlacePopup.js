import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default class AddPlacePopup extends React.Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      link: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    await this.props.onAddPlace(this.state);
    this.setState({
      name: "",
      link: "",
    });
  }

  handleChangeInput(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({
        name: "",
        link: "",
      });
    }
  }

  render() {
    const { props } = this;

    const buttonText = props.isLoadingData ? "Сохранение..." : "Создать";

    return (
      <PopupWithForm
        title="Новое место"
        name="add-element"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={this.handleSubmit}
        buttonText={buttonText}
        isLoadingData={props.isLoadingData}
      >
        <label className="form__field" htmlFor="addPlace-name">
          <input
            id="addPlace-name"
            name="name"
            className="form__input form__input_type_title-place"
            type="text"
            required
            placeholder="Название"
            minLength="2"
            maxLength="30"
            onChange={this.handleChangeInput}
            value={this.state.name}
          />

          <span className="addPlace-name-error form__input-error"></span>
        </label>

        <label className="form__field" htmlFor="addPlace-link">
          <input
            id="addPlace-link"
            name="link"
            className="form__input form__input_type_url-place"
            type="url"
            required
            placeholder="Ссылка на картинку"
            onChange={this.handleChangeInput}
            value={this.state.link}
          />

          <span className="addPlace-link-error form__input-error"></span>
        </label>
      </PopupWithForm>
    );
  }
}
