import css from "./Button.module.css";

export default function Button({
  children,
  variant = "lightButton",
  disabled = false,
  className = "",
  onClick,
  ...props
}) {
  return (
    <button
      className={`${css.button} ${css[variant]} ${
        disabled ? css.disabled : ""
      } ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
