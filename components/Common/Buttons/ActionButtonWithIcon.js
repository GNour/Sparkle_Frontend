import styles from "./Buttons.module.scss";
const ActionButtonWithIcon = ({ icon, text, action }) => {
  return (
    <button
      className={`btn ${styles.ActionButtonWithIcon} btn-dark`}
      onClick={() => action()}
    >
      {icon ? icon : ""}
      {text}
    </button>
  );
};

export default ActionButtonWithIcon;
