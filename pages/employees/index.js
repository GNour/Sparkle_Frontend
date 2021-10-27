import PageHeaderWithActions from "../../components/Common/PageHeaderWithActions";
import { Fragment, useEffect, useState } from "react";
import AllEmployeesLayout from "../../components/Layouts/Employees/AllEmployeesLayout";
import UserCard from "../../components/EmployeesPage/UserCard/UserCard";
import { AiOutlinePlus } from "react-icons/ai";
import ActionButtonWithIcon from "../../components/Common/Buttons/ActionButtonWithIcon";
import { useRouter } from "next/router";
import axiosConfig from "../../helpers/axiosConfig";
import { useAuth } from "../../stores/AuthContext";
import useSWR from "swr";
const MembersPage = (props) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [fetchedEmployees, setFetchedEmployees] = useState([]);
  const handleToggleFilter = (value) => {
    toggledFilter ? setToggledFilter(false) : setToggledFilter(true);
  };

  // Fetch data with SWR
  const fetcher = (url) => axiosConfig.get(url).then((res) => res.data);
  const { data, error } = useSWR("user/all", fetcher);
  // const showSkeleton = error || loading;

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
        {data &&
          data.map((employee) => {
            return (
              <UserCard
                key={employee.id}
                id={employee.id}
                image={`http://localhost:8000/images/${employee.profile_picture}`}
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
