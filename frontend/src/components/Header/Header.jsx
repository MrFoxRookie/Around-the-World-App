import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuButton from "../../images/header__information-button.svg";

function Header({ userEmail, onSignOut }) {
  const location = useLocation();
  const [showInformation, setShowInformation] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  const toggleMenu = () => {
    if (!isAuthPage) setShowInformation((prev) => !prev);
  };

  useEffect(() => {
    if (isAuthPage) return;

    const handleResize = () => {
      setScreenSize(window.innerWidth);
      if (window.innerWidth > 610) {
        setShowInformation(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isAuthPage]);

  let subtitle = "";
  let linkChange = "";
  let email = "";

  if (location.pathname === "/signin") {
    subtitle = "Regístrate";
    linkChange = "/signup";
  } else if (location.pathname === "/signup") {
    subtitle = "Iniciar sesión";
    linkChange = "/signin";
  } else if (location.pathname === "/") {
    subtitle = "Cerrar sesión";
    linkChange = "/signin";
    email = userEmail;
  }

  return (
    <header className="header">
      {!isAuthPage && showInformation && screenSize <= 610 && (
        <div className="header__options-container">
          {email && <h2 className="header__email">{email}</h2>}
          <Link
            to={linkChange}
            className="header__link"
            onClick={location.pathname === "/" ? onSignOut : null}
          >
            {subtitle}
          </Link>
        </div>
      )}

      <div className="header__default-container">
        <h1 className="header__title">
          Around<sup className="header-sup">The World</sup>
        </h1>

        {!isAuthPage && screenSize <= 610 && (
          <button className="header__menu-button" onClick={toggleMenu}>
            <img src={MenuButton} alt="Botón menú" />
          </button>
        )}

        {!isAuthPage && screenSize > 610 && (
          <div className="header__user-options">
            {email && <h2 className="header__email">{email}</h2>}
            <Link
              to={linkChange}
              className="header__link"
              onClick={location.pathname === "/" ? onSignOut : null}
            >
              {subtitle}
            </Link>
          </div>
        )}

        {isAuthPage && (
          <div className="header__auth-options">
            <Link to={linkChange} className="header__link">
              {subtitle}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
