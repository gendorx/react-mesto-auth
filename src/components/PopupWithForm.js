import Popup from "./Popup";

export default function PopupWithForm(props) {
  const buttonText = props.buttonText || "Сохранить";

  return (
    <Popup
      name={props.name}
      onClose={props.onClose}
      isOpen={props.isOpen}
      container={props.container}
    >
      <h2 className="popup__title">{props.title}</h2>
      <form
        className="form"
        name={`form_${props.name}`}
        onSubmit={props.onSubmit}
      >
        {props.children}
        <button
          className={`popup__submit ${
            props.isLoadingData && "popup__submit_disabled"
          }`}
          type="submit"
          disabled={props.isLoadingData}
        >
          {buttonText}
        </button>
      </form>
    </Popup>
  );
}
