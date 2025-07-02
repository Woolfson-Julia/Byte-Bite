import Modal from "react-modal";
import css from "./BaseModal.module.css";
import IconButton from "../IconButton/IconButton.jsx";

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

    padding: "56px 24px 32px",
    width: "362px",
    maxWidth: "90vw",
    borderRadius: "32px",
    backgroundColor: "#faf3e0",
  },
};

Modal.setAppElement("#root");

export default function BaseModal({
  isOpen,
  onClose,
  title,
  message,
  children,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel={title}
    >
      <IconButton
        onClick={onClose}
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

      <div className={css.actions}>{children}</div>
    </Modal>
  );
}
