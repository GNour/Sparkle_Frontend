import SideBar from "../Common/SideBar/SideBar";
import styles from "./MainLayout.module.scss";
import { useRouter } from "next/router";
import BackButton from "../Common/BackButton";
const MainLayout = ({ children }) => {
  const { asPath } = useRouter();
  return (
    <div className={`theme-default ${styles.MainLayout}`}>
      {asPath.endsWith("create") || asPath.endsWith("login") ? null : (
        <SideBar />
      )}
      <main className="px-lg-4 mt-5 py-5 py-md-0 px-md-4 w-100">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
