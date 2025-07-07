import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";
import clsx from "clsx";

export default function AuthNav({ onLinkClick }) {

  return (
    <div className={css.wrapper}>
      <NavLink
        onClick={onLinkClick}
        className={(props) =>
          clsx(css.loginBtn, css.link, props.isActive && css.active)
        }
        to="/auth/login"
      >
        Log in
      </NavLink>
      <NavLink
        className={css.registerBtn}
        onClick={onLinkClick}
        to="/auth/register"
      >
        Register
      </NavLink>
    </div>
  );
}
