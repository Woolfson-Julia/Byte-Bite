// import { FaUser } from "react-icons/fa6";
// import { FaPhone } from "react-icons/fa";
import css from "./RecipeCard.module.css";
// import { useDispatch } from "react-redux";
// import { setDeleteRecipeId, setEditRecipeId } from "../../redux/recipes/slice";

function RecipeCard({ data }) {
  // const dispatch = useDispatch();

  // const handleDeleteButton = () => {
  //   dispatch(setDeleteRecipeId(data.id));
  // };

  // const handleEditButton = () => {
  //   dispatch(setEditRecipeId(data.id));
  // };

  // console.log(data);

  return (
    <div className={css.recipe}>
      <div className={css.info}>{/* <FaUser /> {data.name} */}</div>
      <div className={css.info}>{/* <FaPhone /> {data.number} */}</div>
      {/* <button onClick={handleDeleteButton}>Delete</button>{" "}
      <button onClick={handleEditButton}>Edit</button> */}
    </div>
  );
}

export default RecipeCard;
