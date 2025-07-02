import { useRef, useState, useEffect } from "react";
import axios from "axios";
import css from "./AddRecipeForm.module.css";

export default function AddRecipeForm() {
  const imageRef = useRef();
  const [ingredientId, setIngredientId] = useState("broccoli");
  const [ingredientMeasure, setIngredientMeasure] = useState("");

  const handleImageClick = () => {
    imageRef.current?.click();
  };

  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, ingredientsRes] = await Promise.all([axios.get("https://byte-bitebd.onrender.com/api/categories"), axios.get("https://byte-bitebd.onrender.com/api/ingredients")]);

        setCategories(categoriesRes.data.data);
        setIngredients(ingredientsRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();

    formData.append("name", form.title.value);
    formData.append("decr", form.description.value);
    formData.append("cookiesTime", form.time.value);
    formData.append("cals", form.calories.value);
    formData.append("category", form.category.value);
    formData.append("instruction", form.instructions.value);

    formData.append(`ingredients[0][id]`, ingredientId);
    formData.append(`ingredients[0][measure]`, ingredientMeasure);

    if (imageRef.current && imageRef.current.files[0]) {
      formData.append("recipeImg", imageRef.current.files[0]);
    }

    try {
      const response = await axios.post("https://byte-bitebd.onrender.com/api/recipes/add-recipe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Recipe added successfully!");
      form.reset();
      setIngredientMeasure("");
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Error sending recipe";
      alert("Error: " + message);
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Add recipe</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.phoneTabletGroup}>
          <div className={css.leftside}>
            <div className={css.general}>
              <h3 className={css.subtitle}>General Information</h3>

              <div className={css.formField}>
                <label className={css.label} htmlFor="title">
                  Recipe Title
                </label>
                <input className={css.input} id="title" name="title" type="text" placeholder="Enter the name of your recipe" required />
              </div>

              <div className={css.formField}>
                <label className={css.label} htmlFor="description">
                  Recipe Description
                </label>
                <textarea className={css.textarea} id="description" name="description" placeholder="Enter a brief description" required></textarea>
              </div>

              <div className={css.formField}>
                <label className={css.label} htmlFor="time">
                  Cooking time in minutes
                </label>
                <input className={css.input} id="time" name="time" type="number" placeholder="10" required />
              </div>

              <div className={css.group}>
                <div className={css.formField}>
                  <label className={css.label} htmlFor="calories">
                    Calories
                  </label>
                  <input className={css.input} id="calories" name="calories" type="number" placeholder="150 cals" />
                </div>

                <div className={css.formField}>
                  <label className={css.label} htmlFor="category">
                    Category
                  </label>
                  <div className={css.selectWrapper}>
                    <select className={css.select} id="category" name="category" required>
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <svg className={css.selectIcon}>
                      <use href="/src/assets/sprite.svg#icon-controlschevron-down-small" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className={css.ingredients}>
              <h3 className={css.subtitle}>Ingredients</h3>
              <div className={css.group}>
                <div className={css.formField}>
                  <label className={css.label}>Name</label>
                  <div className={css.selectWrapper}>
                    <select id="ingredient" name="ingredient" className={css.select} value={ingredientId} onChange={(e) => setIngredientId(e.target.value)} required>
                      <option value="">Select ingredient</option>
                      {ingredients.map((ing) => (
                        <option key={ing._id} value={ing._id}>
                          {ing.name}
                        </option>
                      ))}
                    </select>

                    <svg className={css.selectIcon}>
                      <use href="/src/assets/sprite.svg#icon-controlschevron-down-small2" />
                    </svg>
                  </div>
                </div>

                <div className={css.formField}>
                  <label className={css.label}>Amount</label>
                  <input className={css.input} type="text" placeholder="100g" value={ingredientMeasure} onChange={(e) => setIngredientMeasure(e.target.value)} required />
                </div>
              </div>
              <button className={`${css.button} ${css.removeButton}`}>Remove last ingredient</button>
              <button className={`${css.button} ${css.smallbutton}`}>Add new ingredient</button>
            </div>

            <div className={css.instructions}>
              <h3 className={css.subtitle}>Instructions</h3>
              <textarea className={css.textarea} name="instructions" id="instructions" placeholder="Enter instructions" required></textarea>
            </div>
            <button type="submit" className={`${css.phoneTabletRemove} ${css.button} ${css.lastButton}`}>
              Publish recipe
            </button>
          </div>

          <div className={css.rightside}>
            <h3 className={css.subtitle}>Upload Photo</h3>
            <div type="button" className={css.upload} onClick={handleImageClick}>
              <svg width="52" height="52">
                <use href="/src/assets/sprite.svg#icon-mailfilter" />
              </svg>
            </div>
            <input type="file" name="recipeImg" id="recipeImg" ref={imageRef} accept="image/*" style={{ display: "none" }} />
          </div>
        </div>

        <button type="submit" className={`${css.descRemove} ${css.button} ${css.lastButton}`}>
          Publish recipe
        </button>
      </form>
    </div>
  );
}
