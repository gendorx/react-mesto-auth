import HeaderLogo from "../images/header-logo.svg";

const Header = () => {
  return (
    <header className="header">
      <img className="header__logo" src={HeaderLogo} alt="Местро" />
    </header>
  );
};

export default Header;
