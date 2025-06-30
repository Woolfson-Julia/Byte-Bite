import { useFormikContext } from "formik";

export default function FixedErrorMessage({ name, className }) {
  const { errors } = useFormikContext();
  const errorText = errors[name] || "\u00A0";

  return (
    <div className={className} aria-live="polite">
      {errorText}
    </div>
  );
}
//component for fixed height of an error, so the form does not jump
