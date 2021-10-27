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
import { ProtectRoute, useAuth } from "../../stores/AuthContext";
import Cookies from "js-cookie";

const MembersPage = (props) => {
  const { user } = useAuth();
  const router = useRouter();
  const [fetchedEmployees, setFetchedEmployees] = useState([]);
  const handleToggleFilter = (value) => {
    toggledFilter ? setToggledFilter(false) : setToggledFilter(true);
  };

  useEffect(() => {
    const getEmployees = async () => {
      await axiosConfig
        .get("user/all")
        .then((response) => {
          console.log(response.data);
          setFetchedEmployees(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getEmployees();
  }, []);

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
        {fetchedEmployees.map((employee) => {
          return (
            <UserCard
              key={employee.id}
              id={employee.id}
              image={`http://localhost:8000/images/default.png`}
              imageText={employee.position}
              action={() => router.push("/employees/" + employee.id)}
              name={employee.first_name + " " + employee.last_name}
              username={employee.username}
              phone={employee.phone_number}
              email={employee.email}
            />
          );
        })}
      </AllEmployeesLayout>
    </Fragment>
  );
};

export default MembersPage;
