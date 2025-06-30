import css from "./RegistrationForm.module.css";
import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "./validationSchema";
import { handleSubmit } from "./handleSubmit";
import FixedErrorMessage from "../RegistrationForm/FixedErrorMessage";

import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";
export default function RegistrationForm() {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const checkPasswordFieldId = useId();
  const privacyPolicyId = useId();

  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className={css.registerWrapper}>
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
          acceptedTerms: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleSubmit(values, actions, dispatch)}
      >
        <Form className={css.form}>
          {/* <div className={css.fieldWrapper}> */}
          <label htmlFor={nameFieldId} className={css.inputLabel}>
            Enter your name
          </label>
          <Field
            className={css.inputField}
            id={nameFieldId}
            type="text"
            name="username"
            placeholder="Max"
          ></Field>
          <FixedErrorMessage
            name="username"
            className={css.error}
          ></FixedErrorMessage>
          {/* <ErrorMessage
              name="username"
              component="span"
              className={css.error}
            /> */}
          {/* </div> */}

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
          {/* <ErrorMessage name="email" component="div" className={css.error} /> */}
          <FixedErrorMessage
            name="email"
            className={css.error}
          ></FixedErrorMessage>

          <label htmlFor={passwordFieldId} className={css.inputLabel}>
            Create a strong password
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
          {/* <ErrorMessage name="password" component="div" className={css.error} /> */}
          <FixedErrorMessage
            name="password"
            className={css.error}
          ></FixedErrorMessage>

          <label htmlFor={checkPasswordFieldId} className={css.inputLabel}>
            Repeat your password
          </label>
          <div className={css.passwordWrapper}>
            <Field
              className={css.inputField}
              id={checkPasswordFieldId}
              type={showCheckPassword ? "text" : "password"}
              name="checkPassword"
              placeholder="********"
            ></Field>
            <IconButton
              onClick={() => setShowCheckPassword((prev) => !prev)}
              className={css.toggleButton}
            >
              <svg className={css.eyeSvg}>
                {showCheckPassword ? (
                  <use xlinkHref="/sprite.svg#icon-eye-24px" />
                ) : (
                  <use xlinkHref="/sprite.svg#icon-eye-close-24px" />
                )}
              </svg>
            </IconButton>
          </div>
          {/* <ErrorMessage
            name="checkPassword"
            component="div"
            className={css.error}
          /> */}
          <FixedErrorMessage
            name="checkPassword"
            className={css.error}
          ></FixedErrorMessage>

          <label
            htmlFor={privacyPolicyId}
            className={`${css.inputLabel} ${css.checkBoxLabel}`}
          >
            <Field
              className={css.checkBox}
              type="checkbox"
              name="acceptedTerms"
              id={privacyPolicyId}
            />
            <span className={css.customCheckbox}>
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 3.47059L4.83333 7L10.5 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>
              I agree to the{" "}
              <a href="#" className={css.termsLink}>
                Terms of Service and Privacy Policy
              </a>
            </span>
          </label>
          {/* <ErrorMessage
            name="acceptedTerms"
            component="div"
            className={css.error}
          /> */}

          <FixedErrorMessage
            name="acceptedTerms"
            className={css.error}
          ></FixedErrorMessage>
          <Button
            type="submit"
            variant={`dark-button`}
            className={css.submitButton}
          >
            Create account
          </Button>
          {/* <button type="submit" className={css.submitButton}>
            Create account
          </button> */}
        </Form>
      </Formik>
      <p className={css.loginPrompt}>
        Already have an account?{" "}
        <Link to="/auth/login" className={css.loginLink}>
          Log in
        </Link>
      </p>
    </div>
  );
}
