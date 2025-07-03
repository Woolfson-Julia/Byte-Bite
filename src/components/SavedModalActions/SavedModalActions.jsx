import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modal/slice";
import css from "./SavedModalActions.module.css";

export default function SavedModalActions() {
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeModal());

  return (
    <Link to="/profile/favorites" className={css.darkBtn} onClick={handleClose}>
      Go to My profile
    </Link>
  );
}
