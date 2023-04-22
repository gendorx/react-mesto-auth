import HeaderLogo from "../images/header-logo.svg";
import { Link, useLocation } from "react-router-dom";

import burgerIcon from "../images/icon-burger.svg";
import closeIcon from "../images/icon-close.svg";

export default function Header(props) {
  const location = useLocation();

  const headerMobileClasses = ["header__mobile"];
  const burgerButtonClasses = [
    "button-icon button-icon_no-border header__burger-button",
  ];
  if (!props.isMobileOpen) {
    headerMobileClasses.push("header__mobile_hidden");
  } else {
    burgerButtonClasses.push("header__burger-button_small")
  }

  return (
    <header className="header">
      {location.pathname === "/" && (
        <div className={headerMobileClasses.join(" ")}>
          <p className="header__email">{props.userEmail}</p>
          <button className="header__sign-out" onClick={props.onSignOut}>
            Выйти
          </button>
        </div>
      )}

      <div className="header__container">
        <img className="header__logo" src={HeaderLogo} alt="Местро" />

        <div className="header__right">
          {location.pathname === "/sign-in" && (
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          )}

          {location.pathname === "/sign-up" && (
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          )}

          {location.pathname === "/" && (
            <div className="header__user-info">
              <p className="header__email">{props.userEmail}</p>
              <button className="header__sign-out" onClick={props.onSignOut}>
                Выйти
              </button>
            </div>
          )}

          {location.pathname === "/" && (
            <button
              className={burgerButtonClasses.join(" ")}
              style={{
                backgroundImage: `url("${
                  props.isMobileOpen ? closeIcon : burgerIcon
                }")`,
              }}
              onClick={() => props.toogleMobileMenu()}
            ></button>
          )}
        </div>
      </div>
    </header>
  );
}
