import React from "react";
import { api } from "../utils/constants";
import { handleApiResponse } from "../utils/utils";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./PopupEditProfile";
import EditAvatarProfile from "./EditAvatarProfile";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";

const popupsClosedAll = {
  isEditProfilePopupOpen: false,
  isAddPlacePopupOpen: false,
  isEditAvatarPopupOpen: false,
  isImagePopupOpened: false,
  isConfirmPopup: false,
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...popupsClosedAll,
      isLoadingData: false,
      selectedCard: {},
      currentUser: {},
      cards: [],
    };

    this.handleEditAvatarClick = this.handleEditAvatarClick.bind(this);
    this.handleAddPlaceClick = this.handleAddPlaceClick.bind(this);
    this.handleEditProfileClick = this.handleEditProfileClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
    this.handleUpdateAvatar = this.handleUpdateAvatar.bind(this);
    this.handleCardLike = this.handleCardLike.bind(this);
    this.handleCardDelete = this.handleCardDelete.bind(this);
    this.handleAddPlaceSubmit = this.handleAddPlaceSubmit.bind(this);
    this.handleCardDeleteReq = this.handleCardDeleteReq.bind(this);

    this.closeAllPopups = this.closeAllPopups.bind(this);
  }

  handleEditAvatarClick() {
    this.setNewState({ isEditAvatarPopupOpen: true });
  }

  handleEditProfileClick() {
    this.setNewState({ isEditProfilePopupOpen: true });
  }

  handleAddPlaceClick() {
    this.setNewState({ isAddPlacePopupOpen: true });
  }

  setNewState(state) {
    this.setState({
      ...this.state,
      ...state,
    });
  }

  renderLoading(state) {
    this.setNewState({
      isLoadingData: state,
    });
  }

  async handleUpdateUser(info) {
    this.renderLoading(true);
    const newState = { isLoadingData: false, ...popupsClosedAll };

    try {
      newState.currentUser = await api.setUserInfo(info);
    } catch (err) {
      handleApiResponse(err);
    } finally {
      this.setNewState(newState);
    }
  }

  async handleUpdateAvatar({ avatar }) {
    this.renderLoading(true);
    const newState = { isLoadingData: false, ...popupsClosedAll };

    try {
      newState.currentUser = await api.setProfilePhoto(avatar);
    } catch (err) {
      handleApiResponse(err);
    } finally {
      this.setNewState(newState);
    }
  }

  async handleAddPlaceSubmit(item) {
    this.renderLoading(true);
    const newState = { isLoadingData: false, ...popupsClosedAll };

    try {
      newState.cards = [await api.addCard(item), ...this.state.cards];
    } catch (err) {
      handleApiResponse(err);
    } finally {
      this.setNewState(newState);
    }
  }

  handleCardClick(card) {
    this.setNewState({
      isImagePopupOpened: true,
      selectedCard: card,
    });
  }

  async handleCardLike(card) {
    try {
      let response;
      const isLiked = card.likes.some(
        (a) => a._id === this.state.currentUser._id
      );

      if (isLiked) {
        response = await api.removeLikeCard(card._id);
      } else {
        response = await api.addLikeCard(card._id);
      }

      this.setNewState({
        cards: this.state.cards.map((currentCard) =>
          currentCard._id === card._id ? response : currentCard
        ),
      });
    } catch (err) {
      handleApiResponse(err);
    }
  }

  handleCardDeleteReq(card) {
    this.setNewState({
      isConfirmPopup: true,
      selectedCard: card,
    });
  }

  async handleCardDelete() {
    const { selectedCard: card } = this.state;
    const newState = { isConfirmPopup: false, selectedCard: {} };

    try {
      await api.removeCard(card._id);
      newState.cards = this.state.cards.filter((a) => a._id !== card._id);
    } catch (err) {
      handleApiResponse(err);
    } finally {
      this.setNewState(newState);
    }
  }

  closeAllPopups() {
    this.setState({
      ...this.state,
      ...popupsClosedAll,
    });
  }

  async componentDidMount() {
    try {
      const [userData, cards] = await Promise.all([
        api.getProfileInfo(),
        api.getInitialCards(),
      ]);

      this.setNewState({ currentUser: userData, cards });
    } catch (err) {
      handleApiResponse(err);
    }
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Header />
        <Main
          onEditProfile={this.handleEditProfileClick}
          onAddPlace={this.handleAddPlaceClick}
          onEditAvatar={this.handleEditAvatarClick}
          onCardClick={this.handleCardClick}
          onCardLike={this.handleCardLike}
          onCardDelete={this.handleCardDeleteReq}
          cards={this.state.cards}
        />
        <Footer />

        <EditProfilePopup
          isOpen={this.state.isEditProfilePopupOpen}
          onClose={this.closeAllPopups}
          onUpdateUser={this.handleUpdateUser}
          isLoadingData={this.state.isLoadingData}
        />

        <EditAvatarProfile
          isOpen={this.state.isEditAvatarPopupOpen}
          onClose={this.closeAllPopups}
          onUpdateAvatar={this.handleUpdateAvatar}
          isLoadingData={this.state.isLoadingData}
        />

        <AddPlacePopup
          isOpen={this.state.isAddPlacePopupOpen}
          onClose={this.closeAllPopups}
          onAddPlace={this.handleAddPlaceSubmit}
          isLoadingData={this.state.isLoadingData}
        />

        <ConfirmPopup
          isOpen={this.state.isConfirmPopup}
          onClose={this.closeAllPopups}
          onSubmit={this.handleCardDelete}
        />

        <ImagePopup
          isOpen={this.state.isImagePopupOpened}
          onClose={this.closeAllPopups}
          card={this.state.selectedCard}
        />
      </CurrentUserContext.Provider>
    );
  }
}
