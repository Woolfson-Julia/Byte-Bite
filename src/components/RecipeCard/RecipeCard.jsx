import css from "./RecipeCard.module.css";
import IconButton from "../IconButton/IconButton";
import Button from "../Button/Button";

export default function RecipeCard({ recipe }) {

  const handleBtnMore = (id) => {
    console.log("Recipes ID:", id);
  };

  const handleBtnFav = (id) => {
    console.log("Recipes ID:", id);
  };
  
  return (
    <div className={css.recipe}>
      
      <img src={recipe.thumb} alt={recipe.title} />

      <div className={css.tittleBox}>
        
        <h3 className={css.recipeTittle}>{recipe.title}</h3>

        <div className={css.time}>
        <svg width="24" height="24" stroke="currentColor">
        <use href="/sprite.svg#icon-timeclock-24px" /></svg>
          {recipe.time}
        </div>
        </div>
    
        <p className={css.desc}>{recipe.description}</p>
        <p className={css.cals}>~{recipe.cals}cals</p>
      
        <div className={css.buttonBox}>
  <Button className={css.button} type="button" onClick={() => handleBtnMore(recipe._id)}>
    Learn More
  </Button>
  <IconButton
  variantBtn="lightButtonSvg"
  variantSvg="darkSvg"
  type="button"
  onClick={() => handleBtnFav(recipe._id)}
  className={css.buttonSvg}
>
<svg width="20" height="20" stroke="currentColor">
  <use href="/sprite.svg#icon-add-to-favorite-24px" />
</svg>

</IconButton>
</div>

      </div>
  );
}
