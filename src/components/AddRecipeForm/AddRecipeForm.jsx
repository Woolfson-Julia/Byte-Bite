import { useRef, useState, useEffect } from "react";
import axios from "axios";
import css from "./AddRecipeForm.module.css";

export default function AddRecipeForm() {
  const imageRef = useRef();

  const [ingredientList, setIngredientList] = useState([{ id: "broccoli", measure: "" }]);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);

  const [imagePreview, setImagePreview] = useState(null);

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

  const handleAddIngredient = () => {
    setIngredientList([...ingredientList, { id: "", measure: "" }]);
  };

  const handleRemoveIngredient = () => {
    if (ingredientList.length > 1) {
      setIngredientList(ingredientList.slice(0, -1));
    }
  };

  const handleImageClick = () => {
    imageRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();

    formData.append("title", form.title.value);
    formData.append("description", form.description.value);
    formData.append("time", Number(form.time.value));
    formData.append("instructions", form.instructions.value);

    ingredientList.forEach((item, i) => {
      formData.append(`ingredients[${i}][id]`, item.id);
      formData.append(`ingredients[${i}][measure]`, item.measure);
    });

    formData.append("category", form.category.value);
    if (form.calories.value) {
      formData.append("cals", Number(form.calories.value));
    }

    const recipeImageFile = imageRef.current?.files[0];

    if (recipeImageFile) {
      formData.append("recipeImg", recipeImageFile);
    }

    try {
      const response = await axios.post("https://byte-bitebd.onrender.com/api/recipes/add-recipe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Recipe added successfully!");
      form.reset();
      setIngredientList([{ id: "broccoli", measure: "" }]);
      setImagePreview(null);
    } catch (error) {
      console.error("Axios error full:", error);
      console.error("Error response:", error.response);

      if (error.response?.data?.data) {
        console.error("Validation errors:", error.response.data.data);
      }

      const message = error.response?.data?.message || JSON.stringify(error.response?.data) || error.message || "Unknown error sending recipe";
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

              {ingredientList.map((item, index) => (
                <div className={css.group} key={index}>
                  <div className={css.formField}>
                    <label className={css.label}>Name</label>
                    <div className={css.selectWrapper}>
                      <select
                        className={css.select}
                        value={item.id}
                        onChange={(e) => {
                          const updated = [...ingredientList];
                          updated[index].id = e.target.value;
                          setIngredientList(updated);
                        }}
                        required
                      >
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
                    <input
                      className={css.input}
                      type="text"
                      placeholder="100g"
                      value={item.measure}
                      onChange={(e) => {
                        const updated = [...ingredientList];
                        updated[index].measure = e.target.value;
                        setIngredientList(updated);
                      }}
                      required
                    />
                  </div>
                </div>
              ))}

              <button type="button" onClick={handleRemoveIngredient} className={`${css.button} ${css.removeButton}`}>
                Remove last ingredient
              </button>
              <button type="button" onClick={handleAddIngredient} className={`${css.button} ${css.smallbutton}`}>
                Add new ingredient
              </button>
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
            <div type="button" className={css.upload} onClick={handleImageClick} style={{ cursor: "pointer" }}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className={css.preview} />
              ) : (
                <svg width="52" height="52">
                  <use href="/src/assets/sprite.svg#icon-mailfilter" />
                </svg>
              )}
            </div>
            <input type="file" name="recipeImg" id="recipeImg" ref={imageRef} accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
          </div>
        </div>

        <button type="submit" className={`${css.descRemove} ${css.button} ${css.lastButton}`}>
          Publish recipe
        </button>
      </form>
    </div>
  );
}
