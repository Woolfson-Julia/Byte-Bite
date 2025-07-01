import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(16, "Name cannot be longer than 16 characters")
    .required("Name is required"),

  email: Yup.string()
    .min(5, "Email must be at least 5 characters")
    .email("Please enter a valid email")
    .max(128, "Email cannot be longer than 128 characters")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot be longer than 128 characters")
    .required("Password is required"),

  checkPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),

  acceptedTerms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});
