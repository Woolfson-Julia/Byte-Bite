import css from "./LoginForm.module.css";

import { Formik, Form, Field } from "formik";
import { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useAsyncError } from "react-router-dom";

import { selectLoading } from "../../redux/auth/selectors";
import Loader from "../Loader/Loader";

import { validationSchema } from "./validationSchema";
import { handleSubmit } from "./handleSubmit";
import FixedErrorMessage from "../RegistrationForm/FixedErrorMessage";

import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";
import ToastInfo from "../ToastInfo/ToastInfo";

export default function LoginForm() {
  const isLoading = useSelector(selectLoading);
  const [showPassword, setShowPassword] = useState(false);

  const emailFieldId = useId();
  const passwordFieldId = useId();
  const dispatch = useDispatch();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={css.loginWrapper}>
          <h1 className={css.heading}>Login</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values, actions) =>
              handleSubmit(values, actions, dispatch)
            }
            validationSchema={validationSchema}
          >
            <Form className={css.form}>
              <label htmlFor={emailFieldId} className={css.inputLabel}>
                Enter your email address
              </label>
              <Field
                className={css.inputField}
                id={emailFieldId}
                type="email"
                name="email"
                placeholder="email@gmail.com"
              ></Field>
              <FixedErrorMessage
                name="email"
                className={css.error}
              ></FixedErrorMessage>

              <label htmlFor={passwordFieldId} className={css.inputLabel}>
                Enter your password
              </label>
              <div className={css.passwordWrapper}>
                <Field
                  className={css.inputField}
                  id={passwordFieldId}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                ></Field>
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={css.toggleButton}
                  type="button"
                  variantBtn="none"
                  variantSvg="none"
                >
                  <svg className={css.eyeSvg}>
                    {showPassword ? (
                      <use xlinkHref="/sprite.svg#icon-eye-24px" />
                    ) : (
                      <use xlinkHref="/sprite.svg#icon-eye-close-24px" />
                    )}
                  </svg>
                </IconButton>
              </div>

              <FixedErrorMessage
                name="password"
                className={css.error}
              ></FixedErrorMessage>

              <Button
                type="submit"
                variant={`darkButton`}
                className={css.submitButton}
              >
                Login
              </Button>
            </Form>
          </Formik>
          <p className={css.registerPrompt}>
            Don’t have an account?{" "}
            <Link to="/auth/register" className={css.registerLink}>
              Register
            </Link>
          </p>
        </div>
      )}
      <ToastInfo />
    </>
  );
}
