import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import BaseModal from "../BaseModal/BaseModal";
import Button from "../Button/Button.jsx";
import css from "./LogoutModal.module.css";

export default function LogoutModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logOut());
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Are you shure?"
      message="We will miss you!"
    >
      <>
        <Button
          variant="lightButton"
          className={css.cancelBtn}
          onClick={handleLogout}
        >
          Cancel
        </Button>
        <Button
          variant="darkButton"
          className={css.logoutBtn}
          onClick={onClose}
        >
          Log out
        </Button>
      </>
    </BaseModal>
  );
}
