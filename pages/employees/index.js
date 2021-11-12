import PageHeaderWithActions from "../../components/Common/PageHeaderWithActions";
import { Fragment, useState } from "react";
import AllEmployeesLayout from "../../components/Layouts/Employees/AllEmployeesLayout";
import UserCard from "../../components/EmployeesPage/UserCard/UserCard";
import { AiOutlinePlus } from "react-icons/ai";
import ActionButtonWithIcon from "../../components/Common/Buttons/ActionButtonWithIcon";
import { useRouter } from "next/router";
import axiosConfig from "../../helpers/axiosConfig";
import useSWR from "swr";
const MembersPage = (props) => {
  const router = useRouter();
  const [fetchedEmployees, setFetchedEmployees] = useState([]);

  const handleSearch = (value) => {
    let temp = [];
    if (value.length == 0) {
      setFetchedEmployees([]);
    } else {
      data.forEach((employee) => {
        let name = (
          employee.first_name +
          " " +
          employee.last_name
        ).toLowerCase();
        if (name.includes(value.toLowerCase())) {
          temp.push(employee);
        }
      });
    }
    setFetchedEmployees(temp);
  };

  // Fetch data with SWR
  const fetcher = (url) =>
    axiosConfig.get(url).then((res) => {
      return res.data;
    });
  const { data, error } = useSWR("user/all", fetcher);
  // const showSkeleton = error || loading;

  return (
    <Fragment>
      <PageHeaderWithActions
        header="Employees"
        haveNav={false}
        haveSearchBar={true}
        handleSearchBarAction={handleSearch}
        button={
          <ActionButtonWithIcon
            icon={<AiOutlinePlus />}
            text={"Create"}
            action={() => router.push("employees/create")}
          />
        }
      />

      <AllEmployeesLayout>
        {fetchedEmployees &&
          fetchedEmployees.map((employee) => {
            return (
              <UserCard
                key={"SEARCH" + employee.id}
                id={employee.id}
                image={`http://3.144.31.214/images/${employee.profile_picture}`}
                imageText={employee.position}
                action={() => router.push("/employees/" + employee.id)}
                name={employee.first_name + " " + employee.last_name}
                username={employee.username}
                phone={employee.phone_number}
                email={employee.email}
              />
            );
          })}
        {data &&
          data.map((employee) => {
            return (
              <UserCard
                key={employee.id}
                id={employee.id}
                image={`http://3.144.31.214/images/${employee.profile_picture}`}
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
