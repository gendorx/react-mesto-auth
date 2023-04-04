import { Component } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export class Card extends Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);

    this.cardClick = this.cardClick.bind(this);
    this.handleCardLike = this.handleCardLike.bind(this);
    this.handleCardDelete = this.handleCardDelete.bind(this);
  }

  handleCardLike() {
    this.props.onCardLike(this.props.card);
  }

  handleCardDelete() {
    this.props.onCardDelete(this.props.card);
  }

  cardClick() {
    this.props.onCardClick(this.props.card);
  }

  render() {
    const { card } = this.props;
    const classNamesLikeButton = ["element__like"];
    const isMyCard = card.owner._id === this.context._id;
    const isLiked = card.likes.some(
      (a) => a._id === this.context._id
    );

    if (isLiked) classNamesLikeButton.push("element__like_active");

    return (
      <article className="element">
        {isMyCard && (
          <button
            onClick={this.handleCardDelete}
            className="element__delete button-icon button-icon_type_delete"
          ></button>
        )}
        <img
          src={card.link}
          alt={card.name}
          className="element__image"
          onClick={this.cardClick}
        />
        <div className="element__group">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like-group">
            <button
              type="button"
              className={classNamesLikeButton.join(" ")}
              onClick={this.handleCardLike}
            ></button>
            <span className="element__likes-count">{card.likes.length}</span>
          </div>
        </div>
      </article>
    );
  }
}
