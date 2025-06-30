import { useState } from "react";
import css from "./Header.module.css";
import Logo from "../Logo/Logo.jsx";
import NavDesktop from "../NavDesktop/NavDesktop.jsx";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="container">
      <div className={css.logoWrapper}>
        <Logo />
      </div>

      <div className={css.navDesktop}>
        <NavDesktop />
      </div>

      <div className={css.burgerMenu}>
        {isMobileMenuOpen ? (
          <MobileMenu onClose={closeMobileMenu} />
        ) : (
          <button type="button" onClick={openMobileMenu}>
            Burger
          </button>
        )}
      </div>
    </header>
  );
}
