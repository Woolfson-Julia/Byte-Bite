import { useEffect } from "react";
import Logo from "../Logo/Logo.jsx";
import IconButton from "../IconButton/IconButton.jsx";
import NavPanel from "../NavPanel/NavPanel.jsx";
import css from "./MobileMenu.module.css";

export default function MobileMenu({ onClose }) {
  useEffect(() => {
    const handleKeypress = (e) => {
      if (e.key === "Escape") {
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
      <div className="container">
        <div className={css.topBar}>
          <Logo />
          <IconButton
            onClick={onClose}
            variantBtn="none"
            variantSvg="none"
            className={css.btnSvg}
            type="button"
            aria-label="Close mobile menu"
          >
            <svg className={css.icon} width="32" height="32">
              <use href="/sprite.svg#icon-close" />
            </svg>
          </IconButton>
        </div>

        <NavPanel onLinkClick={onClose} />
      </div>
    </div>
  );
}
