import css from "./LoginForm.module.css";

import { Formik, Form, Field } from "formik";

export default function LoginForm() {
  console.log("login page");
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
      }}
      onSubmit={() => {}}
    >
      <Form>
        <Field></Field>
      </Form>
    </Formik>
  );
}
