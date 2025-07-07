import { useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery.js";
import Logo from "../Logo/Logo.jsx";
import NavPanel from "../NavPanel/NavPanel.jsx";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";
import IconButton from "../IconButton/IconButton.jsx";
import css from "./Header.module.css";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767.98px)");

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className={css.header}>
        <div className={`container ${css.wrapper}`}>
          <Logo />

          {isMobile ? (
            <IconButton
              onClick={openMobileMenu}
              className={css.btnSvg}
              variantBtn="none"
              variantSvg="none"
              type="button"
              aria-label="Open mobile menu"
            >
              <svg className={css.icon} width="32" height="32">
                <use href="/sprite.svg#icon-burger-24px" />
              </svg>
            </IconButton>
          ) : (
            <div className={css.desktopTabletNav}>
              <NavPanel />
            </div>
          )}
        </div>
        {isMobile && isMobileMenuOpen && (
          <MobileMenu onClose={closeMobileMenu} />
        )}
      </header>
    </>
  );
}
