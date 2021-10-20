import styles from "./Inputs.module.scss";
const SelectInput = ({
  externalStyles,
  placeHolder,
  label,
  name,
  handleChange,
  children,
  isMultiple,
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
      <select
        name={name}
        multiple={isMultiple ? true : false}
        className={`form-select ${styles.InputField}`}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeHolder}
      >
        {children}
      </select>
    </div>
  );
};

export default SelectInput;
