import { Component } from "react";
import { api, auth } from "../utils/constants";
import { handleApiResponse } from "../utils/utils";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./PopupEditProfile";
import EditAvatarProfile from "./EditAvatarProfile";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import InfoTooltipPopup from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";

const popupsClosedAll = {
  isEditProfilePopupOpen: false,
  isAddPlacePopupOpen: false,
  isEditAvatarPopupOpen: false,
  isImagePopupOpened: false,
  isConfirmPopup: false,
  isInfoTooltipPopup: false,
};

const methodsBind = [
  "handleEditAvatarClick",
  "handleAddPlaceClick",
  "handleEditProfileClick",
  "handleCardClick",
  "handleUpdateUser",
  "handleUpdateAvatar",
  "handleCardLike",
  "handleCardDelete",
  "handleAddPlaceSubmit",
  "handleCardDeleteReq",
  "onLogin",
  "closeAllPopups",
  "onRegister",
  "onSignOut",
  "toogleMobileMenu",
];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...popupsClosedAll,
      isLoadingData: false,
      selectedCard: {},
      currentUser: {},
      userEmail: "",
      cards: [],
      isSuccess: false,
      isLogged: !!this.getToken(),
      isMobileMenuOpened: false,
    };

    methodsBind.forEach((m) => {
      this[m] = this[m].bind(this);
    });
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
      newState.currentUser = await api.setUserInfo(info, this.getToken());
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
      newState.currentUser = await api.setProfilePhoto(avatar, this.getToken());
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
      newState.cards = [
        await api.addCard(item, this.getToken()),
        ...this.state.cards,
      ];
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
        response = await api.removeLikeCard(card._id, this.getToken());
      } else {
        response = await api.addLikeCard(card._id, this.getToken());
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
      await api.removeCard(card._id, this.getToken());
      newState.cards = this.state.cards.filter((a) => a._id !== card._id);
    } catch (err) {
      handleApiResponse(err);
    } finally {
      this.setNewState(newState);
    }
  }

  getToken() {
    return localStorage.getItem("jwt");
  }

  setToken(token) {
    return localStorage.setItem("jwt", token);
  }

  async onLogin(ctx) {
    try {
      const { token } = await auth.authorize(ctx);
      this.setToken(token);
      this.setNewState({
        isLogged: true,
        userEmail: ctx.email,
      });
    } catch (err) {
      handleApiResponse(err);
    }
  }

  async onRegister(ctx) {
    const newState = { isInfoTooltipPopup: true };

    try {
      await auth.register(ctx);
      newState["isSuccess"] = true;
    } catch (err) {
      newState["isSuccess"] = false;
    } finally {
      return this.setNewState(newState);
    }
  }

  onSignOut() {
    this.setNewState({
      isLogged: false,
      userEmail: "",
    });

    localStorage.removeItem("jwt");
  }

  closeAllPopups() {
    this.setState({
      ...this.state,
      ...popupsClosedAll,
    });
  }

  toogleMobileMenu() {
    return this.setNewState({
      isMobileMenuOpened: !this.state.isMobileMenuOpened,
    });
  }

  async checkToken() {
    const token = this.getToken();
    if (!token) return;

    try {
      const ctx = await auth.checkToken(token);

      if (!ctx) {
        return this.setNewState({
          isLogged: false,
        });
      }

      this.setNewState({
        isLogged: true,
        userEmail: ctx.data.email,
      });

      return true;
    } catch (err) {
      handleApiResponse(err);
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.isLogged !== this.state.isLogged && !prevState.isLogged) {
      this.getServerData();
    }
  }

  async getServerData() {
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

  async componentDidMount() {
    try {
      const isCorrect = await this.checkToken();
      if (!isCorrect) return;
      await this.getServerData();
    } catch (err) {
      handleApiResponse(err);
    }
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Header
          userEmail={this.state.userEmail}
          onSignOut={this.onSignOut}
          isMobileOpen={this.state.isMobileMenuOpened}
          toogleMobileMenu={this.toogleMobileMenu}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isLogged={this.state.isLogged}
                component={Main}
                onEditProfile={this.handleEditProfileClick}
                onAddPlace={this.handleAddPlaceClick}
                onEditAvatar={this.handleEditAvatarClick}
                onCardClick={this.handleCardClick}
                onCardLike={this.handleCardLike}
                onCardDelete={this.handleCardDeleteReq}
                cards={this.state.cards}
              />
            }
          />

          <Route
            path="/sign-in"
            element={
              <Login onSubmit={this.onLogin} isLogged={this.state.isLogged} />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                onSubmit={this.onRegister}
                isLogged={this.state.isLogged}
              />
            }
          />
        </Routes>
        {this.state.isLogged && <Footer />}

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

        <InfoTooltipPopup
          isOpen={this.state.isInfoTooltipPopup}
          onClose={this.closeAllPopups}
          isSuccess={this.state.isSuccess}
          successText="Вы успешно зарегистрировались!"
          failText="Что-то пошло не так! Попробуйте ещё раз."
        />
      </CurrentUserContext.Provider>
    );
  }
}
