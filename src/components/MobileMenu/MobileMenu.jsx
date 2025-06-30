import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

import UserMenu from "../UserMenu/UserMenu.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import css from "./MobileMenu.module.css";

export default function MobileMenu({ onClose }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const handleKeypress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeypress);
    return () => {
      document.removeEventListener("keydown", handleKeypress);
    };
  }, [onClose]);

  return (
    <div className={css.wrapper}>
      <button className={css.closeButton} onClick={onClose}>
        X
      </button>

      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </div>
  );
}
