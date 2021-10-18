import styles from "./Nav.module.scss";
const HeaderNav = ({ children }) => {
  return (
    <ul
      className={`nav ${styles.HeaderNav} rounded ms-3 prtab-set w-sm-100`}
      role="tablist"
    >
      {children}
    </ul>
  );
};

export default HeaderNav;
