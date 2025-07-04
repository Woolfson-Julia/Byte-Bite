import css from "./AddRecipeForm.module.css";
import { useRef, useState, useEffect, useMemo } from "react";
import axios from "../../../axiosConfig";
import Button from "../Button/Button";
import { validationSchema } from "./validationSchema";
import { Formik, Form, Field, FieldArray, ErrorMessage, FastField } from "formik";
import toast from "react-hot-toast";
import ToastInfo from "../ToastInfo/ToastInfo";

export default function AddRecipeForm() {
  const imageRef = useRef();
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, ingredientsRes] = await Promise.all([axios.get("/categories"), axios.get("/ingredients")]);
        setCategories(categoriesRes.data.data);
        setIngredients(ingredientsRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
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
  const initialValues = useMemo(
    () => ({
      title: "",
      description: "",
      time: "",
      cals: "",
      // category: categories.length > 0 ? categories[0]._id : "",
      category: "",
      instructions: "",
      ingredientList: [{ id: "", measure: "" }],
      thumb: null,
    }),
    []
  );
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
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("time", Number(values.time));
      formData.append("instructions", values.instructions);
      formData.append("category", values.category);
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
      await axios.post("/recipes/add-recipe", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Recipe added successfully!");
      resetForm();
      setImagePreview(null);
    } catch (error) {
      console.error("Failed to add recipe:", error);
      toast.error("Please add at least 2 ingredients");
    }
  };
  return (
    <section className="section">
      <div className="container">
        <h2 className={css.title}>Add recipe</h2>
        <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
                      <FastField className={css.input} id="title" name="title" type="text" placeholder="Enter the name of your recipe" />
                      <ErrorMessage name="title" className={css.error} component="div"></ErrorMessage>
                    </div>
                    <div className={css.formField}>
                      <label className={css.label} htmlFor="description">
                        Recipe Description
                      </label>
                      <FastField as="textarea" className={css.textarea} id="description" name="description" placeholder="Enter a brief description" />
                      <ErrorMessage name="description" className={css.error} component="div"></ErrorMessage>
                    </div>
                    <div className={css.formField}>
                      <label className={css.label} htmlFor="time">
                        Cooking time in minutes
                      </label>
                      <FastField className={css.input} id="time" name="time" type="number" placeholder="10" />
                      <ErrorMessage name="time" component="div" className={css.error} />
                    </div>
                    <div className={css.group}>
                      <div className={css.formField}>
                        <label className={css.label} htmlFor="cals">
                          Calories
                        </label>
                        <FastField className={css.input} id="cals" name="cals" type="number" placeholder="150" />
                        <ErrorMessage name="cals" component="div" className={css.error} />
                      </div>
                      <div className={css.formField}>
                        <label className={css.label} htmlFor="category">
                          Category
                        </label>
                        <div className={css.selectWrapper}>
                          <Field as="select" className={css.select} id="category" name="category" required>
                            {/* {categories.map((cat) => (
                              <option key={cat._id} value={cat._id}>
                                {cat.name}
                              </option>
                            ))} */}
                            <option value="">Select</option>
                            {categoryOptions}
                          </Field>
                          <svg className={css.selectIcon}>
                            <use href="/sprite.svg#icon-down-24px" />
                          </svg>
                        </div>
                        <ErrorMessage name="category" component="div" className={css.error} />
                      </div>
                    </div>
                  </div>
                  <FieldArray name="ingredientList" className="ingredientList">
                    {({ push, remove }) => (
                      <div className={css.ingredients}>
                        <h3 className={css.subtitle}>Ingredients</h3>
                        {values.ingredientList.map((item, index) => (
                          <div className={css.group} key={index}>
                            <div className={css.formField}>
                              <label className={css.label}>Name</label>
                              <div className={css.selectWrapper}>
                                <Field
                                  as="select"
                                  className={css.select}
                                  name={`ingredientList[${index}].id`}
                                  value={item.id || ""}
                                  onChange={(e) => setFieldValue(`ingredientList[${index}].id`, e.target.value)}
                                  required
                                >
                                  {/* <option value="">Select ingredient</option> */}
                                  {/* {ingredients.map((ing) => (
                                    <option key={ing._id} value={ing._id}>
                                      {ing.name}
                                    </option>
                                  ))} */}
                                  <option value="">Select</option>
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
                                placeholder="100g"
                                name={`ingredientList[${index}].measure`}
                                value={item.measure || ""}
                                onChange={(e) => setFieldValue(`ingredientList[${index}].measure`, e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="lightButton"
                          onClick={() => values.ingredientList.length > 1 && remove(values.ingredientList.length - 1)}
                          className={`${css.button} ${css.removeButton} ${css.smallbutton}`}
                        >
                          Remove last ingredient
                        </Button>
                        <Button type="button" variant="darkButton" onClick={() => push({ id: "", measure: "" })} className={`${css.button} ${css.smallbutton}`}>
                          Add new ingredient
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                  <div className={css.instructions}>
                    <h3 className={css.subtitle}>Instructions</h3>
                    <FastField as="textarea" className={css.textarea} name="instructions" id="instructions" placeholder="Enter instructions" />
                    <ErrorMessage name="instructions" component="div" className={css.error} />
                  </div>
                  <Button type="submit" variant="darkButton" className={`${css.phoneTabletRemove} ${css.button} ${css.lastButton}`}>
                    Publish recipe
                  </Button>
                </div>
                <div className={css.rightside}>
                  <div className={css.uploadWrapper}>
                    <h3 className={css.subtitle}>Upload Photo</h3>
                    <button type="button" className={css.upload} onClick={handleImageClick}>
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className={css.preview} />
                      ) : (
                        <svg className={css.svgPhoto} width="52" height="52">
                          <use href="/sprite.svg#icon-photo" />
                        </svg>
                      )}
                    </button>
                    <input type="file" name="thumb" id="thumb" ref={imageRef} accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageChange(e, setFieldValue)} />
                  </div>
                </div>
              </div>
              <Button type="submit" variant="darkButton" className={`${css.descRemove} ${css.button} ${css.lastButton}`}>
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
