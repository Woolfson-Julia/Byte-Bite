import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modal/slice";
import css from "./NotAuthModalActions.module.css";

export default function NotAuthModalActions() {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());

  return (
    <div className={css.actions}>
      <Link
        to="auth/login"
        className={`${css.btn} ${css.lightBtn}`}
        onClick={handleClose}
      >
        Log in
      </Link>
      <Link
        to="auth/register"
        className={`${css.btn} ${css.darkBtn}`}
        onClick={handleClose}
      >
        Register
      </Link>
    </div>
  );
}
