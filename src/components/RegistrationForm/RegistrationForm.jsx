import css from "./RegistrationForm.module.css";
import { useId } from "react";
import { Link } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "./validationSchema";
import FixedErrorMessage from "./FixedErrorMessage";
export default function RegistrationForm() {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const checkPasswordFieldId = useId();
  const privacyPolicyId = useId();

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
          acceptedTerms: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSumbit}
      >
        <Form className={css.form}>
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
          {/* <ErrorMessage name="username" component="div" className={css.error} /> */}
          <FixedErrorMessage
            name="username"
            className={css.error}
          ></FixedErrorMessage>
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
          <Field
            className={css.inputField}
            id={passwordFieldId}
            type="password"
            name="password"
            placeholder="********"
          ></Field>
          {/* <ErrorMessage name="password" component="div" className={css.error} /> */}
          <FixedErrorMessage
            name="password"
            className={css.error}
          ></FixedErrorMessage>

          <label htmlFor={checkPasswordFieldId} className={css.inputLabel}>
            Repeat your password
          </label>
          <Field
            className={css.inputField}
            id={checkPasswordFieldId}
            type="password"
            name="checkPassword"
            placeholder="********"
          ></Field>
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
          <button type="submit" className={css.submitButton}>
            Create account
          </button>
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
