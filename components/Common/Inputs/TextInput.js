import { useField } from "formik";
import styles from "./Inputs.module.scss";
const TextInput = ({
  externalStyles,
  externalLabelStyles,
  label,
  type,
  ...props
}) => {
  // Formik state
  const [field, meta] = useField(props);
  return (
    <div className={`${externalStyles}`}>
      {label ? (
        <label
          htmlFor={props.id || props.name}
          className={`form-label ${externalLabelStyles} ${styles.InputLabel}`}
        >
          {label}
        </label>
      ) : (
        ""
      )}
      <input
        type={type}
        autoComplete="off"
        className={`form-control ${styles.InputField}`}
        {...field}
        {...props}
      />
      {/* Yup Validation div */}
      {meta.touched && meta.error ? (
        <div className="text-danger error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextInput;
