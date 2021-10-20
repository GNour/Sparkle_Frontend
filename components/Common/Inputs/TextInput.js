import styles from "./Inputs.module.scss";
const TextInput = ({
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
      <input
        type={type}
        name={name}
        className={`form-control ${styles.InputField}`}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeHolder}
      />
    </div>
  );
};

export default TextInput;
