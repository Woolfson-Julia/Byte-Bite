import clsx from "clsx";
import { useEffect,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecipeToFav, removeRecipeFromFav } from "../../redux/recipes/operations";
import { selectRecipesError } from "../../redux/recipes/selectors";
import toast, { Toaster } from "react-hot-toast";
import css from "./RecipeDetails.module.css";

import Button from "../Button/Button";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useNavigate } from "react-router-dom";

export default function RecipeDetails({ recipe }) {
  const dispatch = useDispatch();
  const error = useSelector(selectRecipesError);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  
  const instruction = recipe.instructions.split(/\n/g);

  const handleButtonClick = async () => {
    
    if(!isLoggedIn) {
      navigate('/auth/login', { replace: true })
      return;
    }

    if(recipe.isFavorite) {
      dispatch(removeRecipeFromFav(recipe._id));
    } else {
      dispatch(addRecipeToFav(recipe._id));
    }
  }
  
  useEffect(() => {
    if(error) {
      toast.error("Something went wrong... Please try again");
    }
  }, [error]);

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
            {recipe.cals && <p className={css.text}><span className={css.info_accent_text}>Caloric content:</span> Approximately {recipe.cals} kcal per serving</p>}
          </div>

          {recipe.isFavorite ? (
            <Button variant="darkButton" className={css.btn} onClick={handleButtonClick}>
              Saved
              <svg className={css.icon_saved} width="24" height="24">
                <use href="/sprite.svg#icon-add-to-favorite-24px"></use>
              </svg>
            </Button>
          )
          :
          (
            <Button variant="darkButton" className={css.btn} onClick={handleButtonClick}>
              Save
              <svg width="24" height="24">
                <use href="/sprite.svg#icon-add-to-favorite-24px"></use>
              </svg>
            </Button>
          )}
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
    <Toaster />
  </section>;
}
