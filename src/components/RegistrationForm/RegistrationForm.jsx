import css from "./RegistrationForm.module.css";
import { useId } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function RegistrationForm() {
  const nameFieldId = useId();

  const handleSumbit = (values, actions) => {
    console.log("Form data:", values);
    actions.resetForm();
  };
  return (
    <div className={css.loginWrapper}>
      <h1 className={css.heading}>Register</h1>
      <p className={css.description}>
        Join our community of culinary enthusiasts, save your favorite recipes,
        and share your cooking creations
      </p>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          checkPassword: "",
        }}
        onSubmit={handleSumbit}
      >
        <Form className={css.form}>
          <label htmlFor={nameFieldId}>Name</label>

          <Field
            className={css.inputField}
            id={nameFieldId}
            type="text"
            name="username"
            placeholder="Max"
          ></Field>
          <Field
            className={css.inputField}
            type="email"
            name="email"
            placeholder="email@gmail.com"
          ></Field>
          <Field
            className={css.inputField}
            type="password"
            name="password"
            placeholder="********"
          ></Field>
          <Field
            className={css.inputField}
            type="password"
            name="checkPassword"
            placeholder="********"
          ></Field>

          <button type="submit" className={css.submitButton}>
            Create account
          </button>
        </Form>
      </Formik>
    </div>
  );
}
