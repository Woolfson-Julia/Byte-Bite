import css from "./Logo.module.css";

export default function Logo() {
  return (
    <a className={css.link} href="/">
      <svg className={css.icon} width="165" height="46">
        <use href="/sprite.svg#icon-logo" />
      </svg>
    </a>
  );
}
