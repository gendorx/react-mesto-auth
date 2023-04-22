import Sign from "./Sign";
import { Link } from "react-router-dom";

export default function Register(props) {
  return (
    <Sign
      label="Регистрация"
      submitText="Зарегистрироваться"
      submitForm={props.onSubmit}
      isLogged={props.isLogged}
    >
      <p className="sign__aside">
        Уже зарегистрированы?&nbsp;
        <Link className="sign__aside-link" to="/sign-in">Войти</Link>
      </p>
    </Sign>
  );
}
