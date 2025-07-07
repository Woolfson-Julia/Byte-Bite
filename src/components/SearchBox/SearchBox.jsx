import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { toast } from "react-hot-toast";
import { changeFilter } from "../../redux/filters/slice";
// import { fetchRecipesWithFilters } from "../../redux/recipes/operations";

import css from "./SearchBox.module.css";
import Button from "../Button/Button";

const validationSchema = Yup.object({
  searchQuery: Yup.string().trim().max(64, "Maximum 64 characters allowed"),
});

export default function SearchBox() {
  const dispatch = useDispatch();

  // const handleSubmit = async (values, { resetForm }) => {
  //   const trimmedQuery = values.searchQuery.trim();

  //   dispatch(changeFilter(trimmedQuery));
  //   const resultAction = await dispatch(
  //     fetchRecipesWithFilters({ title: trimmedQuery })
  //   );

  //   if (fetchRecipesWithFilters.fulfilled.match(resultAction)) {
  //     if (resultAction.payload.length === 0) {
  //       toast.error(`No recipes found for "${trimmedQuery}"`);
  //       return;
  //     }
  //     resetForm();
  //   } else {
  //     toast.error(resultAction.payload || "Error fetching recipes");
  //   }
  // };
  const handleSubmit = async (values, { resetForm }) => {
    const trimmedQuery = values.searchQuery.trim();

    dispatch(changeFilter(trimmedQuery));
    resetForm();
  };

  return (
    <div>
      <div className={css.wrapper}>
        <div className={`${css.container} container`}>
          <h1 className={css.text}>Plan, Cook, and Share Your Flavors</h1>

          <Formik
            initialValues={{ searchQuery: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors, touched }) => (
              <Form className={css.containerInput}>
                <Field
                  type="text"
                  name="searchQuery"
                  placeholder="Search recipes"
                  className={`${css.input} ${
                    errors.searchQuery && touched.searchQuery
                      ? css.inputError
                      : ""
                  }`}
                />
                <ErrorMessage name="searchQuery">
                  {(msg) => <div className={css.error}>{msg}</div>}
                </ErrorMessage>

                <Button type="submit" className={css.btn}>
                  Search
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
