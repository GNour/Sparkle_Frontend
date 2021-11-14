import styles from "./Buttons.module.scss";
// Button can be Primary, Secondary, or Tertiary.
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
}) => {
  // Incase of submit action, no need to handleAction. The type refer to what is the action the button will do
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
