export default function Popup(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div
        className={`popup__container ${
          props.container && `popup__container_type_${props.container}`
        }`}
      >
        <button
          className="popup__close button-icon button-icon_type_close"
          onClick={props.onClose}
        ></button>
        {props.children}
      </div>
    </div>
  );
}
