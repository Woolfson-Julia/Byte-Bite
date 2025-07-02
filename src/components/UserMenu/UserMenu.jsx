import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";
import { logOut } from "../../redux/auth/operations.js";
import css from "./UserMenu.module.css";
import IconButton from "../IconButton/IconButton.jsx";

export default function UserMenu({ onLinkClick }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const firstLetter = user.name.split("")[0].toUpperCase();

  // тимчасово поки не створили модалку
  const handleLogout = () => {
    dispatch(logOut());
    onLinkClick();
  };

  return (
    <div className={css.menu}>
      <Link className={css.addRecipeBtn} onClick={onLinkClick} to="/add-recipe">
        Add Recepy
      </Link>

      <div className={css.info}>
        <div>{firstLetter}</div>
        <p className={css.name}>{user.name}</p>
        <IconButton
          onClick={handleLogout}
          className={css.btnSvg}
          type="button"
          aria-label="Log out"
        >
          <svg className={css.icon} width="24" height="24">
            <use href="/sprite.svg#icon-logout-32px" />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
