import * as Yup from "yup";

export const validationSchema = Yup.object({
  title: Yup.string()
    .max(64, "Maximum length is 64 characters")
    .required("This field is required"),
  description: Yup.string()
    .max(200, "Maximum length is 200 characters")
    .required("This field is required"),
  time: Yup.number()
    .integer("Please enter an integer")
    .min(1, "Minimum time is 1 minute")
    .max(360, "Maximum time is 360 minutes")
    .required("This field is required"),
  cals: Yup.number()
    .integer("Please enter an integer")
    .min(1, "Minimum calories is 1")
    .max(10000, "Maximum calories is 10,000")
    .nullable()
    .notRequired(),
  category: Yup.string().required("Please select a category"),
  instructions: Yup.string()
    .max(1200, "Maximum length is 1200 characters")
    .required("This field is required"),
  
  ingredientList: Yup.array()
    .of(
      Yup.object({
        id: Yup.string().required("Please select an ingredient"),
        measure: Yup.string().required("Please enter the amount"),
      })
    )
    .min(2, "Please add at least 2 ingredients")
    .required("Please select a ingredient"),
});