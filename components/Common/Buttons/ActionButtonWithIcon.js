import styles from "./Buttons.module.scss";
const ActionButtonWithIcon = ({ icon, text, action, isSecondary }) => {
  const handleAction = (e) => {
    action(e.target.innerText);
  };
  return (
    <button
      className={`btn ${
        isSecondary
          ? styles.ActionButtonWithIconSecondary
          : styles.ActionButtonWithIcon
      }`}
      onClick={handleAction}
    >
      {icon ? icon : ""}
      {text}
    </button>
  );
};

export default ActionButtonWithIcon;
