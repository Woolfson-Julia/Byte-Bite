/* eslint-disable react/no-unescaped-entities */
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import Modal from "@mui/material/Modal";
import css from "./ModalChange.module.css"; 

export default function ModalDelete({
  open,
  onClose,
  onClick,
  contactName,
  contactNumber,
  contactId,
}) {
  
  const UserSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "The name must have at least 3 letters")
      .max(50, "That name is too long")
      .required("The owner of the contact must have a name"),
    number: Yup.string()
      .min(3, "Number must have at least 3 digits for saved")
      .max(50, "That's too long - max 50 characters allowed")
      .required("Every contact needs a number, right?"),
  });
  const fieldId = nanoid();

  return (
    <Modal open={open} onClose={onClose}>
      <div className={css.boxModal}>
        <h3>Edit contact</h3>
        <p className={css.text}>
          You can edit contact's information below. When you're finished, just
          hit "Save".
        </p>
        <Formik
          initialValues={{
            id: contactId,
            name: contactName,
            number: contactNumber,
          }}
          enableReinitialize
          onSubmit={onClick}
          validationSchema={UserSchema}
        >
          <Form className={css.form} autoComplete="off">
            <div className={css.containerForm}>
              <div className={css.containerInput}>
                <label className={css.text} htmlFor={`${fieldId}-name`}>
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id={`${fieldId}-name`}
                  className={css.input}
                />
                <ErrorMessage
                  className={css.span}
                  name="name"
                  component="span"
                />
              </div>
              <div className={css.containerInput}>
                <label className={css.text} htmlFor={`${fieldId}-number`}>
                  Number
                </label>
                <Field
                  type="tel"
                  name="number"
                  id={`${fieldId}-number`}
                  className={css.input}
                />
                <ErrorMessage
                  className={css.span}
                  name="number"
                  component="span"
                />
              </div>
            </div>
            <div className={css.containerButton}>
              <button className={css.button} type="submit">
                Save
              </button>
              <button className={css.button} type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
}
