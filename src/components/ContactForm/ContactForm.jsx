import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addContact } from '../../redux/contacts/operations.js';
import ToastInfo from "../ToastInfo/ToastInfo.jsx";
import css from "./ContactForm.module.css";

export default function ContactForm() {
  
  const dispatch = useDispatch();
  const fieldId = nanoid();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

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
  
  return (
    <>
      <Formik
        initialValues={{ name: "", number: "" }}
        onSubmit={handleSubmit}
        validationSchema={UserSchema}
      >
        <Form className={css.form}>
          <div className={css.container}>
            <label className={css.text} htmlFor={`${fieldId}-name`}>
              Name
            </label>
            <Field
              type="text"
              name="name"
              id={`${fieldId}-name`}
              className={css.input}
            />
            <ErrorMessage className={css.span} name="name" component="span" />
          </div>
          <div className={css.container}>
            <label className={css.text} htmlFor={`${fieldId}-number`}>
              Number
            </label>
            <Field
              type="tel"
              name="number"
              id={`${fieldId}-number`}
              className={css.input}
            />
            <ErrorMessage className={css.span} name="number" component="span" />
          </div>
          <button className={css.button} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
      <ToastInfo />
    </>
  );
}
