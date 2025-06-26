import { useDispatch } from "react-redux";
import { useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUser } from "react-icons/fa6";
import { Tooltip } from "@mui/material";
import { changeContact, deleteContact } from "../../redux/contacts/operations";
import ToastInfo from "../ToastInfo/ToastInfo";
import ModalDelete from "../ModalDelete/ModalDelete";
import ModalChange from "../ModalChange/ModalChange";
import css from "./Contact.module.css";

export default function Contact({ data: { id, name, number } }) {

  const dispatch = useDispatch();

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalChange, setOpenModalChange] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  const handleChange = (values, actions) => {
    dispatch(changeContact(values));
    setOpenModalChange(false);
    actions.resetForm();
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };
  const handleCloseModalChange = () => {
    setOpenModalChange(false);
  };
  const handleOpenModalDelete = () => {
    setOpenModalDelete(true);
  };
  const handleOpenModalChange = () => {
    setOpenModalChange(true);
  };

  return (
    <div className={css.container}>
      <div className={css.user}>
        <Tooltip title={name} placement="top-start">
          <p className={css.textName}>
            <FaUser className={css.icon} />
            {name}
          </p>
        </Tooltip>
        <a className={css.text} href={`tel:${number}`}>
          <BsFillTelephoneFill className={css.icon} />
          {number}
        </a>
      </div>
      <div className={css.containerButton}>
        <button className={css.button} onClick={handleOpenModalChange}>
          <AiOutlineEdit className={css.iconButton} size="20" />
        </button>
        <button
          className={css.button}
          type="button"
          onClick={handleOpenModalDelete}
        >
          <AiOutlineDelete className={css.iconButton} size="20" />
        </button>
      </div>
      <ToastInfo />
      <ModalDelete
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        onClick={handleDelete}
      />
      <ModalChange
        open={openModalChange}
        onClose={handleCloseModalChange}
        onClick={handleChange}
        contactName={name}
        contactNumber={number}
        contactId={id}
      />
    </div>
  );
}
