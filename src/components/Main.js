import { useContext } from "react";
import ProfilePhoto from "../images/profile-photo.png";

import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__container">
            <div className="profile__photo-container">
              <img
                className="profile__photo"
                src={currentUser.avatar || ProfilePhoto}
                alt="Фотография профиля"
              />
              <div
                onClick={props.onEditAvatar}
                className="profile__photo-edit"
              ></div>
            </div>
            <div className="profile__info">
              <div className="profile__heading-container">
                <h1 className="profile__heading">
                  {currentUser.name || "Загрузка..."}
                </h1>
                <button
                  type="button"
                  className="profile__button button-icon button-icon_type_edit profile__button_action_edit"
                  onClick={props.onEditProfile}
                ></button>
              </div>
              <p className="profile__desc">
                {currentUser.about || "Загрузка..."}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="profile__button button-icon button-icon_type_add profile__button_action_add"
            onClick={props.onAddPlace}
          ></button>
        </section>

        <section className="elements">
          <CurrentUserContext.Provider value={currentUser}>
            {props.cards.length > 0
              ? props.cards.map((card) => (
                  <Card
                    key={card._id}
                    card={card}
                    onCardClick={props.onCardClick}
                    onCardDelete={props.onCardDelete}
                    onCardLike={props.onCardLike}
                  />
                ))
              : "Немного подождите, пока загрузятся данные..."}
          </CurrentUserContext.Provider>
        </section>
      </main>
    </>
  );
}
