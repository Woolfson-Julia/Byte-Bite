import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .min(5, "Email must be at least 5 characters")
    .email("Please enter a valid email")
    .max(128, "Email cannot be longer than 128 characters")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot be longer than 128 characters")
    .required("Password is required"),
});
