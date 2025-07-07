import css from "./Footer.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Logo from "../Logo/Logo";

export default function Footer() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  const isAuthPage = location.pathname.startsWith("/auth");

  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.inner}>
          <Logo className={css.logo} />

          <p className={css.copy}>
            © 2025 CookingCompanion. All rights reserved.
          </p>

          <nav className={css.nav}>
            <NavLink to="/" className={css.link}>
              Recipes
            </NavLink>

            {/* Рендеримо "Account" тільки, якщо користувач НЕ залогінений і НЕ на сторінці логіну/реєстрації */}
            {!isLoggedIn && !isAuthPage && (
              <NavLink to="/auth/login" className={css.link}>
                Account
              </NavLink>
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}
