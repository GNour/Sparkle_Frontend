import styles from "./Inputs.module.scss";
const TextAreaInput = ({
  externalStyles,
  placeHolder,
  label,
  name,
  handleChange,
  type,
}) => {
  return (
    <div className={`${externalStyles}`}>
      {label ? (
        <label htmlFor={name} className={`form-label ${styles.InputLabel}`}>
          {label}
        </label>
      ) : (
        ""
      )}
      <textarea
        type={type}
        name={name}
        rows={3}
        className={`form-control ${styles.InputField}`}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeHolder}
      />
    </div>
  );
};

export default TextAreaInput;
