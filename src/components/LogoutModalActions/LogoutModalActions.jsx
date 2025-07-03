import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { closeModal } from "../../redux/modal/slice";
import Button from "../Button/Button";
import css from "./LogoutModalActions.module.css";

export default function LogoutModalActions() {
  const dispatch = useDispatch();

  const handleCancel = () => dispatch(closeModal());
  const handleLogout = () => {
    dispatch(logOut());
    dispatch(closeModal());
  };

  return (
    <div className={css.actions}>
      <Button variant="lightButton" className={css.btn} onClick={handleCancel}>
        Cancel
      </Button>
      <Button
        variant="darkButton"
        className={`${css.btn} ${css.logoutBtn}`}
        onClick={handleLogout}
      >
        Log out
      </Button>
    </div>
  );
}
