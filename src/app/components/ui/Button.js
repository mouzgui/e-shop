import { theme } from "../../utils/theme";
const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => (
  <button
    className={`${theme.components.button} ${
      variant === "primary"
        ? theme.colors.primary
        : variant === "secondary"
        ? theme.colors.secondary
        : "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50"
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
