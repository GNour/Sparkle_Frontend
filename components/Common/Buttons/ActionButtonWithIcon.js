import styles from "./Buttons.module.scss";
const ActionButtonWithIcon = ({
  icon,
  text,
  action,
  id,
  isSecondary,
  externalStyles,
}) => {
  const handleAction = (e) => {
    console.log(e);
    action(e.target.innerText, e.target.id);
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
      <div id={id} className="d-flex align-items-center justify-content-center">
        {icon ? icon : null}
        {text}
      </div>
    </button>
  );
};

export default ActionButtonWithIcon;
