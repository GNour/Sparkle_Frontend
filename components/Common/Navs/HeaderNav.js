import styles from "./Nav.module.scss";
const HeaderNav = ({ children }) => {
  return (
    <ul
      className={`nav ${styles.HeaderNav} rounded mt-2 mt-sm-0 ms-0 ms-sm-2 w-sm-100`}
      role="tablist"
    >
      {children}
    </ul>
  );
};

export default HeaderNav;
