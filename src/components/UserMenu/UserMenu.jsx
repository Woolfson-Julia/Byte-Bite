import { Link } from "react-router-dom";
import css from "./UserMenu.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";

export default function UserMenu() {
  const user = useSelector(selectUser);
  const firstLetter = user.name.split("")[0].toUpperCase();

  return (
    <div className={css.menu}>
      <Link to="/add-recipe">Add Recepy</Link>

      <div className={css.info}>
        <div>{firstLetter}</div>
        <p className={css.name}>{user.name}</p>
        <button type="button">Log out</button>
      </div>
    </div>
  );
}
