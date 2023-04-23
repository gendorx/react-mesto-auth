import PopupWithForm from "./PopupWithForm";

export default function ConfirmPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit();
  }

  return (
    <PopupWithForm
      name="confirm"
      title={"Вы уверены?"}
      buttonText={"Да"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      container="confirm"
    />
  );
}
