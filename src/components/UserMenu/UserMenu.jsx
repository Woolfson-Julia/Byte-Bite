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
    // onLinkClick();
    if (typeof onLinkClick === "function") {
      onLinkClick();
    }
  };

  return (
    <div className={css.menu}>
      <Link className={css.addRecipeBtn} onClick={onLinkClick} to="/add-recipe">
        Add Recepy
      </Link>

      <div className={css.info}>
        <div className={css.nameDiv}>
          <p className={css.firstLetter}>{firstLetter}</p>
          <p className={css.name}>{user.name}</p>
        </div>
        <svg className={css.iconLine} width="1" height="39">
          <use href="/sprite.svg#icon-line" />
        </svg>
        <IconButton
          onClick={handleLogout}
          className={css.btnSvg}
          variantBtn="none"
          variantSvg="none"
          type="button"
          aria-label="Log out"
        >
          <svg className={css.icon} width="24" height="24">
            <use href="/sprite.svg#icon-logout-24px" />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
