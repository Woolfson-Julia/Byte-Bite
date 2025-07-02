import { useState } from "react";
// import css from "./Header.module.css";
import LogoutModal from "../LogoutModal/LogoutModal.jsx";

export default function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <button type="button" onClick={openModal}>
        Logout
      </button>

      <LogoutModal isOpen={modalIsOpen} onClose={closeModal} />
    </>
  );
}
