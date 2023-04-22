import Popup from "./Popup";
import SuccessIcon from "../images/icon-success.svg";
import FailIcon from "../images/icon-fail.svg";

export default function InfoTooltip(props) {
  return (
    <Popup
      name={"tooltip"}
      onClose={props.onClose}
      isOpen={props.isOpen}
      container="tooltip"
    >
      <div className="popup__tooltip">
        <img
          src={props.isSuccess ? SuccessIcon : FailIcon}
          className="popup__tooltip-image"
          alt={props.isSuccess ? "Успех" : "Провал"}
        />

        <p className="popup__tooltip-message">
          {props.isSuccess ? props.successText : props.failText}
        </p>
      </div>
    </Popup>
  );
}
