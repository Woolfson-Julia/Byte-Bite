import { Link } from "react-router-dom";
import css from "./NotFound.module.css";

export default function NotFound() {
  return (
    <section style={{ position: "relative", isolation: "isolate" }}>
      <div className={css.container}>
        <div className={css.content}>
          <div className={css.logo}>
            <svg fill="currentColor" aria-hidden="true">
              <use xlinkHref="/sprite.svg#icon-logo" />
            </svg>
          </div>

          <h1 className={css.title}>Tasteorama</h1>

          <div className={css.errorCode}>404</div>

          <h2 className={css.subtitle}>Recipe not found!</h2>
          <p className={css.description}>
            Sorry, an error has occurred. The recipe you are looking for does
            not exist or has been removed.
          </p>

          <div className={css.actions}>
            <Link to="/" className={css.primaryButton}>
              Go home
            </Link>
          </div>

          <div className={css.decorativeElements}>
            <div className={css.ingredient}>🥕</div>
            <div className={css.ingredient}>🍅</div>
            <div className={css.ingredient}>🥬</div>
            <div className={css.ingredient}>🧄</div>
            <div className={css.ingredient}>🥒</div>
            <div className={css.ingredient}>🌶️</div>
            <div className={css.ingredient}>🧅</div>
            <div className={css.ingredient}>🥔</div>
          </div>
        </div>
      </div>
    </section>
  );
}
