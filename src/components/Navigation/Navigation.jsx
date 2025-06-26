import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import clsx from "clsx";
import css from "./Navigation.module.css";

export default function Navigation() {

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const getLinkStyles = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <nav className={css.nav}>
      <NavLink to="/" className={getLinkStyles}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={getLinkStyles}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
}