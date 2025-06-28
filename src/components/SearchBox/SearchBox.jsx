import css from "./SearchBox.module.css";


export default function SearchBox() {

  // const dispatch = useDispatch();

  // const filter = useSelector(selectContactDataFilter);

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
        <button type="submit" className={css.btn}>Search</button>
      </div>
    </div>
    </div>
    
  );
}