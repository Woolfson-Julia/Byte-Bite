import { BiSolidContact } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import image from "../../img/phonebook-contacts.png";
import css from "./HomePage.module.css";


export default function HomePage() {

const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.containerPage}>
      <div className={css.container}>
        <div className={css.containerInfo}>
          <BiSolidContact size={40} className={css.icon} />
          <h2 className={css.title}>Welcome to Phonebook</h2>
          <p className={css.text}>Join now to manage your phonebook online.</p>
          <p className={css.text}>
            Manage your contacts easily: add, edit, delete, and make calls — all
            in one place. No phone? No problem! Access your contacts anytime,
            anywhere.
          </p>
          <ul className={css.list}>
            <li className={css.item}>A place for names that matter</li>
            <li className={css.item}>Private. Secure. Just yours</li>
          </ul>
        </div>
        <img src={image} alt="example App Phonebook" width={300} />
      </div>
      {!isLoggedIn && (
        <NavLink to="/register" className={css.link}>
          Get started
        </NavLink>
      )}
    </div>
  );
}