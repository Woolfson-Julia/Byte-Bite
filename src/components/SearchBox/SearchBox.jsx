import { useSelector, useDispatch } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { changeFilter } from "../../redux/filters/slice";
import { selectContactDataFilter } from "../../redux/filters/selectors";
import css from "./SearchBox.module.css";


export default function SearchBox() {

  const dispatch = useDispatch();

  const filter = useSelector(selectContactDataFilter);

  const handleChange = (event) => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div className={css.container}>
      <p className={css.text}>Find contacts by name or number</p>
      <div className={css.containerInput}>
        <input
          type="text"
          value={filter}
          onChange={handleChange}
          className={css.input}
        />
        <IoSearch className={css.icon} />
      </div>
    </div>
  );
}