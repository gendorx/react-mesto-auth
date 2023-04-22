import Sign from "./Sign";

export default function Login(props) {
  return <Sign label="Вход" submitForm={props.onSubmit} submitText="Войти" isLogged={props.isLogged} />;
}
