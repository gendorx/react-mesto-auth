export default function ImagePopup(props) {
  const classNames = ["popup", "popup_type_view-image"];

  if (props.isOpen) classNames.push("popup_opened");

  return (
    <div className={classNames.join(" ")}>
      <figure className="popup__image-container">
        <button className="popup__close button-icon button-icon_type_close" onClick={props.onClose}></button>
        <img className="popup__big-picture" src={props.card.link} alt="#" />
        <figcaption className="popup__picture-desc">{props.card.name}</figcaption>
      </figure>
    </div>
  );
}
