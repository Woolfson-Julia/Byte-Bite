import css from "./IconButton.module.css";

export default function IconButton({
  children,
  variant = "dark-svg",
  disabled = false,
  className = "",
  onClick,
  ...props
}) {
  return (
    <button
      className={`${css[variant]} ${
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
