import { useState } from "react";
import { Navigate } from "react-router";

// props: submitText, label, submitForm
export default function Sing(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function submitForm(e) {
    e.preventDefault();
    return props.submitForm(state);
  }

  if (props.isLogged) return <Navigate replace to="/" />;

  return (
    <div className="sign">
      <h2 className="sign__title">{props.label}</h2>

      <form
        className="form form_type_sign"
        name="form_signin"
        onSubmit={submitForm}
      >
        <label
          className="form__field form__field_type_sign"
          htmlFor="signin-name"
        >
          <input
            id="signin-name"
            name="email"
            className="form__input form__input_dark form__input_type_email"
            type="text"
            required
            placeholder="Email"
            minLength="2"
            maxLength="40"
            value={state.email}
            onChange={handleChange}
          />

          <span className="signin-name-error form__input-error"></span>
        </label>

        <label
          className="form__field form__field_type_sign"
          htmlFor="signin-password"
        >
          <input
            id="signin-name"
            name="password"
            className="form__input form__input_dark form__input_type_password"
            type="password"
            required
            placeholder="Пароль"
            minLength="2"
            maxLength="40"
            value={state.password}
            onChange={handleChange}
          />

          <span className="signin-name-error form__input-error"></span>
        </label>

        <button className="sign__submit" type="submit">
          {props.submitText}
        </button>

        {props.children}
      </form>
    </div>
  );
}
