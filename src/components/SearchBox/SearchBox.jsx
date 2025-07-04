import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { fetchRecipes } from "../../redux/recipes/operations";
import css from "./SearchBox.module.css";
import Button from "../Button/Button";

export default function SearchBox() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(changeFilter(searchValue));
    dispatch(fetchRecipes());
  };

  return (
    <div>
      <div className={css.wrapper}>
        <div className={`${css.container} container`}>
          <h1 className={css.text}>Plan, Cook, and Share Your Flavors</h1>

          <form onSubmit={handleFormSubmit} className={css.containerInput}>
            <input
              type="text"
              className={css.input}
              placeholder="Search recipes"
              value={searchValue}
              onChange={handleInputChange}
            />
            <Button type="submit" className={css.btn}>
              Search
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
