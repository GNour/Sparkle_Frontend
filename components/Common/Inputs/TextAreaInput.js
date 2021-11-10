import styles from "./Inputs.module.scss";
import { useField } from "formik";
const TextAreaInput = ({ externalStyles, label, type, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={`${externalStyles}`}>
      {label ? (
        <label
          htmlFor={props.id || props.name}
          className={`form-label ${styles.InputLabel}`}
        >
          {label}
        </label>
      ) : (
        ""
      )}
      <textarea
        {...field}
        {...props}
        type={type}
        rows={3}
        className={`form-control ${styles.InputField}`}
      />
      {meta.touched && meta.error ? (
        <div className="text-danger error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextAreaInput;
