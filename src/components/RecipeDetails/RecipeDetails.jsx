import clsx from "clsx";
import css from "./RecipeDetails.module.css";

export default function RecipeDetails({ recipe }) {
  console.log(recipe);
  
  const instruction = recipe.instructions.split(/\n/g);

  return <section className="section">
    <div className={clsx('container', css.container)}>
      <h1 className={css.title}>{recipe.title}</h1>
      <img className={css.image} src={recipe.thumb} alt={recipe.description} />

      <div className={css.wrapper}>
        <div className={css.info_container}>
          <div className={css.info_wrapper}>
            <h2 className={css.subtitle}>General informations</h2>
            <p className={css.text}><span className={css.info_accent_text}>Category:</span> {recipe.category}</p>
            <p className={css.text}><span className={css.info_accent_text}>Cooking time:</span> {recipe.time} minutes</p>
            <p className={css.text}><span className={css.info_accent_text}>Caloric content:</span> Approximately 200 kcal per serving</p>
          </div>

          <button className={css.btn} type="button">
            Save
            <svg width="24" height="24">
              <use href="../src/assets/sprite.svg#icon-genericbookmark-alternative"></use>
            </svg>
          </button>
        </div>

        <div className={css.main_text_wrapper}>
          <div>
            <h2 className={`${css.subtitle} ${css.about_title}`}>About recipe</h2>
            <p className={css.text}>{recipe.description}</p>
          </div>

          <div>
            <h2 className={`${css.subtitle} ${css.about_title}`}>Ingredients:</h2>
            <ul className={css.ingredients_list}>
              {recipe.ingredients.map(el => (
                <li className={css.text} key={el.ingredient._id}>{el.ingredient.name} — {el.measure}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={`${css.subtitle} ${css.instruction_title}`}>Preparation Steps:</h2>
            <ol className={css.instruction_list}>
              {instruction.map((el, idx) => (
                <li className={css.text} key={idx}>{el}</li>
              ))}
            </ol>
          </div>

        </div>
      </div>
    </div>
  </section>;
}
