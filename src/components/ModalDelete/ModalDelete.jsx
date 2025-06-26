import Modal from "@mui/material/Modal";
import css from "./ModalDelete.module.css"; 

export default function ModalDelete ({ open, onClose, onClick }) {
  
  return (
    <Modal open={open} onClose={onClose}>
      <div className={css.boxModal}>
        <h3>Delete contact</h3>
        <p className={css.text}>
          Are you sure you want to remove this contact? This action cannot be
          undone.
        </p>
        <div className={css.containerButton}>
          <button className={css.button} type="button" onClick={onClick}>
            Delete
          </button>
          <button className={css.button} type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}