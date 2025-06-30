import css from "./SearchBox.module.css";
import Button from "../Button/Button"


export default function SearchBox() {

  // const dispatch = useDispatch();

  // const filter = useSelector(selectRecipesFilter);

  // const handleChange = (event) => {
  //   dispatch(changeFilter(event.target.value));
  // };

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
      <h1 className={css.text}>Plan, Cook, and Share Your Flavors</h1>
      <div className={css.containerInput}>
        <input
          type="text"
          className={css.input}
          placeholder="Search recipes"
        />
       <Button className={css.btn}>Search</Button>
      </div>
    </div>
    </div>
    
  );
}