import { Fragment } from "react";
import UserCard from "../Common/Cards/UserCard/UserCard";
import SideBar from "../Common/SideBar/SideBar";
const MainLayout = () => {
  return (
    <Fragment>
      <SideBar />
      <UserCard></UserCard>
    </Fragment>
  );
};

export default MainLayout;
