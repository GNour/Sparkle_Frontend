import { Fragment } from "react";
import UserCard from "../Common/Cards/UserCard/UserCard";
import SideBar from "../Common/SideBar/SideBar";
import styles from "./MainLayout.module.scss";
const MainLayout = ({ children }) => {
  return (
    <div className={`theme-default ${styles.MainLayout}`}>
      <SideBar />
      <main className="px-lg-4 mt-5 py-5 py-md-0 px-md-4 w-100">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
