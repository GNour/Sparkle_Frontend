import styles from "./Buttons.module.scss";
const ActionButtonWithIcon = ({
  icon,
  text,
  action,
  isSecondary,
  externalStyles,
}) => {
  const handleAction = (e) => {
    action(e.target.innerText);
  };
  return (
    <button
      className={`btn ${
        isSecondary
          ? styles.ActionButtonWithIconSecondary
          : styles.ActionButtonWithIcon
      } ${externalStyles}`}
      onClick={handleAction}
    >
      <div className="d-flex align-items-center justify-content-center">
        {icon ? icon : null}
        {text}
      </div>
    </button>
  );
};

export default ActionButtonWithIcon;
