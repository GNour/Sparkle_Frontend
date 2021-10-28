import styles from "./Buttons.module.scss";
const ActionButtonWithIcon = ({
  icon,
  text,
  action,
  id,
  isSecondary,
  isTertiary,
  externalStyles,
  type,
  buttonType,
  isDisabled,
  ...props
}) => {
  // Incase of submit action, no need to handleAction...
  let handleAction = () => {};
  if (typeof action === "function") {
    handleAction = (e) => {
      action(type, e.target.id);
    };
  }

  return (
    <button
      type={buttonType}
      disabled={isDisabled}
      props
      className={`btn ${
        isSecondary
          ? styles.ActionButtonWithIconSecondary
          : isTertiary
          ? styles.ActionButtonWithIconTertiary
          : styles.ActionButtonWithIcon
      }  ${externalStyles}`}
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
