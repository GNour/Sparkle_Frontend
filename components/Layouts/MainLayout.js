import SideBar from "../Common/SideBar/SideBar";
import styles from "./MainLayout.module.scss";
import { useRouter } from "next/router";
import BackButton from "../Common/BackButton";
const MainLayout = ({ children }) => {
  const { asPath } = useRouter();
  return (
    <div
      className={`theme-default vh-100 ${styles.MainLayout} overflow-hidden`}
    >
      {asPath.endsWith("create") || asPath.endsWith("login") ? null : (
        <div className={`${styles.MainLayoutSideBar}`}>
          <SideBar />
        </div>
      )}

      <main className="ps-lg-2 pe-lg-4 mt-2 w-100 py-5 py-md-0 vh-100 overflow-y-scroll pe-md-4 ps-md-2">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
