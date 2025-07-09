import css from "./RegistrationForm.module.css";

import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectLoading, selectError } from "../../redux/auth/selectors";

import { validationSchema } from "./validationSchema";
import { register } from "../../redux/auth/operations";
import FixedErrorMessage from "../RegistrationForm/FixedErrorMessage";

import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";
import ToastInfo from "../ToastInfo/ToastInfo";
import Loader from "../Loader/Loader";

export default function RegistrationForm() {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const checkPasswordFieldId = useId();
  const privacyPolicyId = useId();

  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);

  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  const handleSubmit = (values, actions) => {
    const { name, email, password } = values;
    const valuesToSend = {
      name,
      email,
      password,
    };
    dispatch(register(valuesToSend));
    actions.resetForm();
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${css.container} container`}>
          <div className={css.registerWrapper}>
            <h1 className={css.heading}>Register</h1>
            <p className={css.description}>
              Join our community of culinary enthusiasts, save your favorite
              recipes, and share your cooking creations
            </p>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                checkPassword: "",
                acceptedTerms: false,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
            >
              <Form className={css.form}>
                <label htmlFor={nameFieldId} className={css.inputLabel}>
                  Enter your name
                </label>
                <Field
                  className={css.inputField}
                  id={nameFieldId}
                  type="text"
                  name="name"
                  placeholder="Max"
                ></Field>
                <FixedErrorMessage
                  name="name"
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

                <label
                  htmlFor={checkPasswordFieldId}
                  className={css.inputLabel}
                >
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
                    variantBtn="none"
                    variantSvg="none"
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

                <FixedErrorMessage
                  name="checkPassword"
                  className={css.error}
                ></FixedErrorMessage>
                <div className={css.wrapperCheck}>
                  <label
                    htmlFor={privacyPolicyId}
                    className={`${css.inputLabel} ${css.checkBoxLabel}`}
                  >
                    <Field
                      as="input"
                      className={css.checkBox}
                      type="checkbox"
                      name="acceptedTerms"
                      id={privacyPolicyId}
                    />
                    <span className={css.customCheckbox}>
                      <svg className={css.checkmark}>
                        <use xlinkHref="/sprite.svg#icon-check"></use>
                      </svg>
                    </span>
                    <span>
                      I agree to the{" "}
                      <a href="#" className={css.termsLink}>
                        Terms of Service and Privacy Policy
                      </a>
                    </span>
                  </label>
                  <FixedErrorMessage
                    name="acceptedTerms"
                    className={css.errorCheck}
                  ></FixedErrorMessage>
                </div>
                <Button
                  type="submit"
                  variant={`darkButton`}
                  className={css.submitButton}
                >
                  Create account
                </Button>
              </Form>
            </Formik>
            <p className={css.loginPrompt}>
              Already have an account?{" "}
              <Link to="/auth/login" className={css.loginLink}>
                Log in
              </Link>
            </p>
          </div>
        </div>
      )}
      {isError && <ToastInfo />}
    </>
  );
}
