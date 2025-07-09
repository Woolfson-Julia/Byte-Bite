import css from "./AddRecipeForm.module.css";
import { useRef, useState, useMemo, useEffect } from "react";
import axios from "../../../axiosConfig";
import Button from "../Button/Button";
import { validationSchema } from "./validationSchema";
import { Formik, Form, Field, ErrorMessage, FastField } from "formik";
import toast from "react-hot-toast";
import ToastInfo from "../ToastInfo/ToastInfo";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCategories,
  selectIngredients,
} from "../../redux/filters/selectors";
import {
  fetchCategories,
  fetchIngredients,
} from "../../redux/filters/operations";

const initialValues = {
  title: "",
  description: "",
  time: "",
  cals: "",
  category: "",
  instructions: "",
  ingredientList: [],
  currentIngredient: { id: "", measure: "" },
  thumb: null,
};

export default function AddRecipeForm() {
  const imageRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);

  const categoryOptions = useMemo(() => {
    return categories.map((cat) => (
      <option key={cat._id} value={cat._id}>
        {cat.name}
      </option>
    ));
  }, [categories]);

  const ingredientOptions = useMemo(() => {
    return ingredients.map((ing) => (
      <option key={ing._id} value={ing._id}>
        {ing.name}
      </option>
    ));
  }, [ingredients]);

  const handleImageClick = () => {
    imageRef.current?.click();
  };

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFieldValue("thumb", file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("time", Number(values.time));
      formData.append("instructions", values.instructions);
      // formData.append("category", values.category);
      const selectedCategory = categories.find(
        (cat) => cat._id === values.category
      );
      formData.append("category", selectedCategory?.name || "");
      if (values.cals) {
        formData.append("cals", Number(values.cals));
      }
      values.ingredientList.forEach((item, i) => {
        formData.append(`ingredients[${i}][id]`, item.id);
        formData.append(`ingredients[${i}][measure]`, item.measure);
      });
      if (values.thumb) {
        formData.append("thumb", values.thumb);
      }
      // await axios.post("/recipes", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      const response = await axios.post("/recipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Recipe added successfully!");
      resetForm();
      setImagePreview(null);
      //redirection to the new recipe detailes
      const recipeId = response.data.data.recipes._id;
      navigate(`/recipes/${recipeId}`);
    } catch (error) {
      console.error("Failed to add recipe:", error);
      toast.error(
        "Oops! Something went wrong. Please review your inputs and try again."
      );
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className={css.title}>Add recipe</h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className={css.form}>
              <div className={css.phoneTabletGroup}>
                <div className={css.leftside}>
                  <div className={css.general}>
                    <h3 className={css.subtitle}>General Information</h3>
                    <div className={css.formField}>
                      <label className={css.label} htmlFor="title">
                        Recipe Title
                      </label>
                      <FastField
                        className={css.input}
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Enter the name of your recipe"
                      />
                      <ErrorMessage
                        name="title"
                        className={css.error}
                        component="div"
                      />
                    </div>
                    <div className={css.formField}>
                      <label className={css.label} htmlFor="description">
                        Recipe Description
                      </label>
                      <FastField
                        as="textarea"
                        className={css.textarea}
                        id="description"
                        name="description"
                        placeholder="Enter a brief description"
                      />
                      <ErrorMessage
                        name="description"
                        className={css.error}
                        component="div"
                      />
                    </div>
                    <div className={css.formField}>
                      <label className={css.label} htmlFor="time">
                        Cooking time in minutes
                      </label>
                      <FastField
                        className={css.input}
                        id="time"
                        name="time"
                        type="number"
                        placeholder="10"
                      />
                      <ErrorMessage
                        name="time"
                        component="div"
                        className={css.error}
                      />
                    </div>
                    <div className={css.group}>
                      <div className={css.formField}>
                        <label className={css.label} htmlFor="cals">
                          Calories
                        </label>
                        <FastField
                          className={css.input}
                          id="cals"
                          name="cals"
                          type="number"
                          placeholder="150"
                        />
                        <ErrorMessage
                          name="cals"
                          component="div"
                          className={css.error}
                        />
                      </div>
                      <div className={css.formField}>
                        <label className={css.label} htmlFor="category">
                          Category
                        </label>
                        <div className={css.selectWrapper}>
                          <Field
                            as="select"
                            className={css.select}
                            id="category"
                            name="category"
                            // required
                          >
                            <option value="">-- Select a category --</option>
                            {categoryOptions}
                          </Field>
                          <svg className={css.selectIcon}>
                            <use href="/sprite.svg#icon-down-24px" />
                          </svg>
                        </div>
                        <ErrorMessage
                          name="category"
                          component="div"
                          className={css.error}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={css.ingredients}>
                    <h3 className={css.subtitle}>Ingredients</h3>
                    <div className={css.group}>
                      <div className={css.formField}>
                        <label className={css.label}>Name</label>
                        <div className={css.selectWrapper}>
                          <Field
                            as="select"
                            className={css.select}
                            name="currentIngredient.id"
                          >
                            <option value="">-- Select an ingredient --</option>
                            {ingredientOptions}
                          </Field>
                          <svg className={css.selectIcon}>
                            <use href="/sprite.svg#icon-down-24px" />
                          </svg>
                        </div>
                      </div>
                      <div className={css.formField}>
                        <label className={css.label}>Amount</label>
                        <Field
                          className={css.input}
                          type="text"
                          name="currentIngredient.measure"
                          placeholder="100g"
                        />
                      </div>
                    </div>
                    <ErrorMessage
                      name="ingredientList"
                      component="div"
                      className={css.errorIngredient}
                    />
                    <Button
                      type="button"
                      variant="darkButton"
                      className={`${css.button} ${css.smallbutton}`}
                      onClick={() => {
                        const { id, measure } = values.currentIngredient;
                        if (!id || !measure) {
                          toast.error("Please select ingredient and amount.");
                          return;
                        }
                        const exists = values.ingredientList.some(
                          (i) => i.id === id
                        );
                        if (exists) {
                          toast.error("This ingredient is already added.");
                          return;
                        }
                        setFieldValue("ingredientList", [
                          ...values.ingredientList,
                          { id, measure },
                        ]);
                        setFieldValue("currentIngredient", {
                          id: "",
                          measure: "",
                        });
                      }}
                    >
                      Add ingredient
                    </Button>

                    {values.ingredientList.length > 0 && (
                      <div className={css.addedIngredients}>
                        <table className={css.ingredientTable}>
                          <thead>
                            <tr className={css.tr}>
                              <th className={`${css.tableHeader} ${css.name}`}>
                                Name:
                              </th>
                              <th
                                className={`${css.tableHeader} ${css.amount}`}
                              >
                                Amount:
                              </th>
                              <th
                                className={`${css.tableHeader} ${css.action}`}
                              ></th>
                            </tr>
                          </thead>
                          <tbody className={css.tbody}>
                            {values.ingredientList.map((item, idx) => {
                              const ingredient = ingredients.find(
                                (ing) => ing._id === item.id
                              );
                              return (
                                <tr key={idx} className={css.tableRow}>
                                  <td className={css.tableCell}>
                                    {ingredient ? ingredient.name : "Unknown"}
                                  </td>
                                  <td className={css.tableCell}>
                                    {item.measure}
                                  </td>
                                  <td className={css.tableCell}>
                                    <button
                                      type="button"
                                      style={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                      }}
                                      className={css.button}
                                      onClick={() => {
                                        const updated =
                                          values.ingredientList.filter(
                                            (_, i) => i !== idx
                                          );
                                        setFieldValue(
                                          "ingredientList",
                                          updated
                                        );
                                      }}
                                    >
                                      <svg
                                        className={css.svgPhoto}
                                        width="24"
                                        height="24"
                                      >
                                        <use href="/sprite.svg#icon-delete-24px" />
                                      </svg>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className={css.instructions}>
                    <h3 className={css.subtitle}>Instructions</h3>
                    <FastField
                      as="textarea"
                      className={css.textarea}
                      name="instructions"
                      id="instructions"
                      placeholder="Enter instructions"
                    />
                    <ErrorMessage
                      name="instructions"
                      component="div"
                      className={css.error}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="darkButton"
                    className={`${css.phoneTabletRemove} ${css.button} ${css.lastButton}`}
                  >
                    Publish recipe
                  </Button>
                </div>

                <div className={css.rightside}>
                  <div className={css.uploadWrapper}>
                    <h3 className={css.subtitle}>Upload Photo</h3>
                    <button
                      type="button"
                      className={css.upload}
                      onClick={handleImageClick}
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className={css.preview}
                        />
                      ) : (
                        <svg className={css.svgPhoto} width="52" height="52">
                          <use href="/sprite.svg#icon-photo" />
                        </svg>
                      )}
                    </button>
                    <input
                      type="file"
                      name="thumb"
                      id="thumb"
                      ref={imageRef}
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                    />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                variant="darkButton"
                className={`${css.descRemove} ${css.button} ${css.lastButton}`}
              >
                Publish recipe
              </Button>
            </Form>
          )}
        </Formik>
        <ToastInfo />
      </div>
    </section>
  );
}
