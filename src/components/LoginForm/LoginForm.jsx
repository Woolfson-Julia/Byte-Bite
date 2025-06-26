import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { logIn } from "../../redux/auth/operations";
import { selectError, selectLoading } from "../../redux/auth/selectors";
import Loader from "../Loader/Loader";
import ToastInfo from "../ToastInfo/ToastInfo";
import css from "./LoginForm.module.css";


export default function LoginForm() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values));
    actions.resetForm();
  };

  const UserSchema = Yup.object().shape({
    email: Yup.string()
      .email("Hmm... That doesn't look like a real email")
      .required("Even the phonebook needs your email"),
    password: Yup.string()
      .min(8, "Add a bit more mystery — at least 8 characters")
      .required("Your secret key is missing"),
  });

  return (
    <div className={css.container}>
      <h2 className={css.title}>Log In</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={UserSchema}
      >
        <Form className={css.form} autoComplete="on">
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
              <Field className={css.input} type="password" name="password" />
            </label>
            <ErrorMessage
              className={css.span}
              name="password"
              component="span"
            />
          </div>
          <button className={css.button} type="submit">
            Log In
          </button>
        </Form>
      </Formik>
      <p className={css.text}>Welcome back to your Phonebook</p>
      {isLoading && <Loader />}
      {isError && <ToastInfo />}
    </div>
  );
}
