import { Link } from "react-router-dom";
import css from "./AuthNav.module.css";

export default function AuthNav({ onLinkClick }) {
  return (
    <div className={css.wrapper}>
      <Link onClick={onLinkClick} className={css.loginBtn}  to="/auth/login">
        Log in
      </Link>
      <Link
        className={css.registerBtn}
        onClick={onLinkClick}
        to="/auth/register"
      >
        Register
      </Link>
    </div>
  );
}
