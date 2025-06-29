import css from "./RegistrationForm.module.css";
import { useId, useState } from "react";
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

  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);

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

          <div className={css.passwordWrapper}>
            <Field
              className={css.inputField}
              id={passwordFieldId}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="********"
            ></Field>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={css.toggleButton}
              aria-label="Toggle password visibility"
            >
              {/* {showPassword ? "🙈" : "👁️"} */}

              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4107 12.4874C9.59629 12.8656 8.69231 13.1118 7.74048 13.1118C4.15598 13.1118 1.25017 9.62068 1.25017 8.73362C1.25017 8.2308 2.18382 6.89131 3.64549 5.82521M13.452 10.1367C13.9487 9.53913 14.2308 9.00999 14.2308 8.73362C14.2308 7.84656 11.325 4.35549 7.74048 4.35549C9.31767 4.35549 10.5962 5.62382 10.5962 7.1884M7.74046 10.0213C6.16328 10.0213 4.88472 8.75297 4.88472 7.1884M14.75 4.35557C12.7732 2.7195 10.4653 1.7802 8.0001 1.7802C7.11158 1.7802 6.2435 1.90222 5.40397 2.13492M1.25017 4.35557C1.43341 4.20392 1.6195 4.05825 1.8083 3.91876M1.25 0.75L13.7856 13.4061"
                  stroke="black"
                  strokeLinecap="round"
                />
              </svg>
            </button>
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
            <button
              type="button"
              onClick={() => setShowCheckPassword((prev) => !prev)}
              className={css.toggleButton}
              aria-label="Toggle check password visibility"
            >
              {/* {showPassword ? "🙈" : "👁️"} */}

              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4107 12.4874C9.59629 12.8656 8.69231 13.1118 7.74048 13.1118C4.15598 13.1118 1.25017 9.62068 1.25017 8.73362C1.25017 8.2308 2.18382 6.89131 3.64549 5.82521M13.452 10.1367C13.9487 9.53913 14.2308 9.00999 14.2308 8.73362C14.2308 7.84656 11.325 4.35549 7.74048 4.35549C9.31767 4.35549 10.5962 5.62382 10.5962 7.1884M7.74046 10.0213C6.16328 10.0213 4.88472 8.75297 4.88472 7.1884M14.75 4.35557C12.7732 2.7195 10.4653 1.7802 8.0001 1.7802C7.11158 1.7802 6.2435 1.90222 5.40397 2.13492M1.25017 4.35557C1.43341 4.20392 1.6195 4.05825 1.8083 3.91876M1.25 0.75L13.7856 13.4061"
                  stroke="black"
                  strokeLinecap="round"
                />
              </svg>
            </button>
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
