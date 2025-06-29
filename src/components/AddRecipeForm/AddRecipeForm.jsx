import css from "./AddRecipeForm.module.css";

export default function AddRecipeForm() {
  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>Add recipe</h2>
        <form className={css.form}>
          <div className={css.leftside}>
            <div className={css.general}>
              <h3 className={css.subtitle}>General Information</h3>

              <div className={css.formField}>
                <label className={css.label} htmlFor="title">
                  Recipe Title
                </label>
                <input className={css.input} id="title" name="title" type="text" placeholder="Enter the name of your recipe" />
              </div>

              <div className={css.formField}>
                <label className={css.label} htmlFor="description">
                  Recipe Description
                </label>
                <textarea className={css.textarea} id="description" name="description" placeholder="Enter a brief description of your recipe"></textarea>
              </div>

              <div className={css.formField}>
                <label className={css.label} htmlFor="time">
                  Cooking time in minutes
                </label>
                <input className={css.input} id="time" name="time" type="number" placeholder="10" />
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
                  <select id="category" name="category" className={css.select}>
                    <option value="soup">Soup</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={css.ingredients}>
              <h3 className={css.subtitle}>Ingredients</h3>
              <div className={css.group}>
                <div className={css.formField}>
                  <label className={css.label}>Name</label>
                  <select htmlFor="ingredients" id="category" name="category" className={css.select}>
                    <option value="broccoli">Broccoli</option>
                    <option value="carrot">Carrot</option>
                    <option value="chicken">Chicken</option>
                  </select>
                </div>
                <div className={css.formField}>
                  <label className={css.label}>Amount</label>
                  <input className={css.input} type="text" placeholder="100g" />
                </div>
              </div>
              <button className={`${css.button} ${css.removeButton}`}>Remove last ingredient</button>
              <button className={`${css.button} ${css.smallbutton}`}>Add new ingredient</button>
            </div>
            <div className={css.instructions}>
              <h3 className={css.subtitle}>Instructions</h3>
              <textarea className={css.textarea} name="instructions" id="instructions" placeholder="Enter a text"></textarea>
              <button className={`${css.button} ${css.lastButton}`}>Publish recipe</button>
            </div>
          </div>
          <div className={css.rightside}>
            <h3 className={css.subtitle}>Upload Photo</h3>
            <button type="button" className={css.upload}>
              <svg width="52" height="52">
                <use href="/src/assets/sprite.svg#icon-photo" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
