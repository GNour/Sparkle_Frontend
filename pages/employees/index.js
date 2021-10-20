import MainLayout from "../../components/Layouts/MainLayout";
import PageHeader from "../../components/Common/PageHeader";
import PageHeaderWithActions from "../../components/Common/PageHeaderWithActions";
import { Fragment, useState } from "react";
import AllEmployeesLayout from "../../components/Layouts/Employees/AllEmployeesLayout";
import UserCard from "../../components/EmployeesPage/UserCard/UserCard";
import IconButton from "../../components/Common/IconButton";
import { BsFilter } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./Employees.module.scss";
const MembersPage = () => {
  const [toggledFilter, setToggledFilter] = useState(false);

  const handleToggleFilter = (value) => {
    toggledFilter ? setToggledFilter(false) : setToggledFilter(true);
  };
  return (
    <Fragment>
      <PageHeaderWithActions
        header="Employees"
        haveNav={false}
        haveSearchBar={true}
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
        <UserCard outerStyle="col" />
        <UserCard outerStyle="col" />
        <UserCard outerStyle="col" />
        <UserCard outerStyle="col" />
        <UserCard outerStyle="col" />
      </AllEmployeesLayout>
    </Fragment>
  );
};

export default MembersPage;
