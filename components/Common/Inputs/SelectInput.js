import styles from "./Inputs.module.scss";
import { useField } from "formik";
const SelectInput = ({
  externalStyles,
  label,
  children,
  isMultiple,
  ...props
}) => {
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
      <select
        {...field}
        {...props}
        multiple={isMultiple ? true : false}
        className={`form-select ${styles.InputField}`}
      >
        {children}
      </select>
      {meta.touched && meta.error ? (
        <div className="text-danger error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default SelectInput;
