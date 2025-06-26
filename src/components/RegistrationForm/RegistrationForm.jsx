import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { selectError, selectLoading } from "../../redux/auth/selectors";
import { register } from "../../redux/auth/operations";
import Loader from "../Loader/Loader";
import ToastInfo from "../ToastInfo/ToastInfo";
import css from "./RegistrationForm.module.css";

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  const UserSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "The name must have at least 3 letters")
      .max(50, "That name is too long for the pages of this book")
      .required("The author of the phonebook must have a name"),
    email: Yup.string()
      .email("Hmm... That doesn't look like a real email")
      .required("Even the phonebook needs your email"),
    password: Yup.string()
      .min(8, "Add a bit more mystery — at least 8 characters")
      .required("Your secret key is missing"),
  });

  return (
    <div className={css.container}>
      <h2 className={css.title}>Register</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={UserSchema}
      >
        <Form className={css.form} autoComplete="on">
          <div className={css.containerInput}>
            <label className={css.label}>
              Username
              <Field className={css.input} type="text" name="name" />
            </label>
            <ErrorMessage className={css.span} name="name" component="span" />
          </div>
          <div className={css.containerInput}>
            <label className={css.label}>
              Email
              <Field className={css.input} type="email" name="email" />
            </label>
            <ErrorMessage className={css.span} name="email" component="span" />
          </div>
          <div className={css.containerInput}>
            <label className={css.label}>
              Password
              <Field
                className={css.input}
                type="password"
                name="password"
              />
            </label>
            <ErrorMessage
              className={css.span}
              name="password"
              component="span"
            />
          </div>
          <button className={css.button} type="submit">
            Register
          </button>
        </Form>
      </Formik>
      <p className={css.text}>Your personal Phonebook starts here</p>
      {isLoading && <Loader />}
      {isError && <ToastInfo />}
    </div>
  );
}
