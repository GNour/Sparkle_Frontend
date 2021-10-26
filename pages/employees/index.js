import MainLayout from "../../components/Layouts/MainLayout";
import PageHeaderWithActions from "../../components/Common/PageHeaderWithActions";
import { Fragment, useContext, useEffect, useState } from "react";
import AllEmployeesLayout from "../../components/Layouts/Employees/AllEmployeesLayout";
import UserCard from "../../components/EmployeesPage/UserCard/UserCard";
import IconButton from "../../components/Common/IconButton";
import { BsFilter } from "react-icons/bs";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import styles from "./Employees.module.scss";
import ActionButtonWithIcon from "../../components/Common/Buttons/ActionButtonWithIcon";
import { useRouter } from "next/router";
import axiosConfig from "../../helpers/axiosConfig";
import { useAuth } from "../../stores/AuthContext";
const MembersPage = (props) => {
  const { user } = useAuth();
  const router = useRouter();

  const handleToggleFilter = (value) => {
    toggledFilter ? setToggledFilter(false) : setToggledFilter(true);
  };

  useEffect(() => {
    axiosConfig
      .get(
        "user/all",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  });

  const handleCreateEmployee = () => {
    console.log("Employee");
  };
  return (
    <Fragment>
      <PageHeaderWithActions
        header="Employees"
        haveNav={false}
        haveSearchBar={true}
        button={
          <ActionButtonWithIcon
            icon={<AiOutlinePlus />}
            text={"Create"}
            action={() => router.push("employees/create")}
          />
        }
      />
      <AllEmployeesLayout>
        <UserCard outerStyle="col" image={"/id_img.jpg"} imageText={"Waiter"} />
        <UserCard outerStyle="col" image={"/id_img.jpg"} imageText={"Waiter"} />
        <UserCard outerStyle="col" image={"/id_img.jpg"} imageText={"Waiter"} />
        <UserCard outerStyle="col" image={"/id_img.jpg"} imageText={"Waiter"} />
        <UserCard outerStyle="col" image={"/id_img.jpg"} imageText={"Waiter"} />
      </AllEmployeesLayout>
    </Fragment>
  );
};

export default MembersPage;

export async function getServerSideProps() {
  return {
    props: {
      employees: {},
    },
  };
}
