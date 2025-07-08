import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsModalOpen,
  selectModalType,
} from "../../redux/modal/selectors.js";
import { closeModal } from "../../redux/modal/slice.js";
import IconButton from "../IconButton/IconButton.jsx";
import css from "./BaseModal.module.css";
import NotAuthModalActions from "../NotAuthModalActions/NotAuthModalActions.jsx";
import LogoutModalActions from "../LogoutModalActions/LogoutModalActions.jsx";
import SavedModalActions from "../SavedModalActions/SavedModalActions.jsx";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: "10",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",

    border: "none",
    padding: "0",
    borderRadius: "32px",
    backgroundColor: "#faf3e0",
  },
};

// Modal.setAppElement("#root");

export default function BaseModal() {
  const isOpen = useSelector(selectIsModalOpen);
  const modalType = useSelector(selectModalType);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeModal());

  let title = "";
  let message = "";
  let content = null;
  let additionalClass = "";

  switch (modalType) {
    case "not-auth":
      title = "Error while saving";
      message = "To save this recipe, you need to authorize first";
      content = <NotAuthModalActions />;
      break;

    case "logout":
      title = "Are you sure?";
      message = "We will miss you!";
      content = <LogoutModalActions />;
      break;

    case "saved":
      title = "Done! Recipe saved";
      message = "You can find recipe in your profile";
      content = <SavedModalActions />;
      additionalClass = css.savedContent;
      break;

    default:
      return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={customStyles}
      contentLabel={title}
    >
      <div className={`${css.modalContent} ${additionalClass}`}>
        <IconButton
          onClick={handleClose}
          className={css.closeBtn}
          aria-label="Close modal"
          type="button"
        >
          <svg className={css.icon} width="24" height="24">
            <use href="/sprite.svg#icon-close-24px" />
          </svg>
        </IconButton>

        {title && <h2 className={css.title}>{title}</h2>}
        {message && <p className={css.message}>{message}</p>}

        {content}
      </div>
    </Modal>
  );
}
