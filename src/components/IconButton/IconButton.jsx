import css from "./IconButton.module.css";

export default function IconButton({
  children,
  variantBtn = "lightButtonSvg",
  variantSvg = "darkSvg",
  type = "button",
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
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
