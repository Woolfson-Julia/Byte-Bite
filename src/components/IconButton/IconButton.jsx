import css from "./IconButton.module.css";

export default function IconButton({
  children,
  variantBtn = "dark-button-svg",
  variantSvg = "light-svg",
  disabled = false,
  className = "",
  onClick,
  ...props
}) {
  return (
    <button
      className={`${css[variantBtn]} ${css[variantSvg]} ${
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
