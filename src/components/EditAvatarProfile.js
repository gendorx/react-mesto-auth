import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default class EditAvatarProfile extends React.Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);

    this.inputUrl = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onUpdateAvatar({
      avatar: this.inputUrl.current.value,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.inputUrl.current.value = ""
    }
  }

  render() {
    const buttonText = this.props.isLoadingData ? "Сохранение..." : "Сохранить"

    return (
      <PopupWithForm 
        title="Обновить аватар"
        name="edit-photo"
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onSubmit={this.handleSubmit}
        buttonText={buttonText}
        isLoadingData={this.props.isLoadingData}
      >
        <label className="form__field" htmlFor="editPhotoProfile-avatar">
          <input
            id="editProfile-avatar"
            name="avatar"
            className="form__input form__input_type_url"
            type="url"
            required
            placeholder="Ссылка на фотографию"
            ref={this.inputUrl}
          />

          <span className="editProfile-avatar-error form__input-error"></span>
        </label>
      </PopupWithForm>
    );
  }
}
