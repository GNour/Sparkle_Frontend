import MainLayout from "../../components/Layouts/MainLayout";
import PageHeaderWithActions from "../../components/Common/PageHeaderWithActions";
import { Fragment, useState } from "react";
import AllEmployeesLayout from "../../components/Layouts/Employees/AllEmployeesLayout";
import UserCard from "../../components/EmployeesPage/UserCard/UserCard";
import IconButton from "../../components/Common/IconButton";
import { BsFilter } from "react-icons/bs";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import styles from "./Employees.module.scss";
import ActionButtonWithIcon from "../../components/Common/Buttons/ActionButtonWithIcon";
import { useRouter } from "next/router";
const MembersPage = () => {
  const router = useRouter();
  const [toggledFilter, setToggledFilter] = useState(false);

  const handleToggleFilter = (value) => {
    toggledFilter ? setToggledFilter(false) : setToggledFilter(true);
  };

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
      <div>
        <IconButton
          styles={styles.filterButton}
          icon={<BsFilter />}
          action={handleToggleFilter}
          subIcon={<AiOutlineClose />}
          isSub={toggledFilter}
          text="Filters"
        />
      </div>
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
