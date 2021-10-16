import styles from "./SideBar.module.scss";
const SideBarActionButton = ({ isCollapsed, icon, subIcon, text, action }) => {
  return (
    <div className={styles.SideBarActionContainer} onClick={() => action()}>
      <span className={styles.SideBarActionIconWrapper}>
        {isCollapsed ? icon : subIcon ? subIcon : icon}
      </span>
      <span className={styles.SideBarActionContent}>
        {isCollapsed ? "" : text}
      </span>
    </div>
  );
};

export default SideBarActionButton;
