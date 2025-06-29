import css from "./Footer.module.css";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";

export default function Footer() {
  const handleClick = () => {
    console.log("Добавить нажато");
  };

  return (
    <>
      <Button
        variant="dark-button"
        onClick={handleClick}
        className={css.btn}
        type="button"
      >
        Search
      </Button>
      <Button
        variant="light-button"
        type="submit"
        className={css.btnSecond}
        disabled
      >
        Learn more
      </Button>
      <IconButton
        variant="dark-svg"
        onClick={handleClick}
        className={css.btnSvg}
        type="button"
      >
        <svg>
          <use href="/sprite.svg#icon-add-to-favorite-24px" />
        </svg>
      </IconButton>
    </>
  );
}
