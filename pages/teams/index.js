import { Fragment } from "react";
import PageHeaderWithActions from "../../components/Common/PageHeaderWithActions";
import MUIDataTable from "mui-datatables";
const TeamsPage = () => {
  const columns = [
    {
      name: "Name",
      options: {
        sort: false,
      },
    },
    {
      name: "Leader",
      options: {
        sort: false,
      },
    },
    {
      name: "Description",
      options: {
        sort: false,
      },
    },
    {
      name: "Employees",
      options: {
        sort: true,
      },
    },
  ];

  const data = [
    ["Joe James", "Test Corp", "Yonkers", 41],
    ["John Walsh", "Test Corp", "Hartford", 5],
    ["Bob Herm", "Test Corp", "Tampa", 6],
    ["James Houston", "Test Corp", "Dallas", 8],
    ["Joe James", "Test Corp", "Yonkers", 41],
    ["John Walsh", "Test Corp", "Hartford", 5],
    ["Joe James", "Test Corp", "Yonkers", 41],
    ["John Walsh", "Test Corp", "Hartford", 5],
    ["Bob Herm", "Test Corp", "Tampa", 6],
    ["James Houston", "Test Corp", "Dallas", 8],
    ["Joe James", "Test Corp", "Yonkers", 41],
    ["John Walsh", "Test Corp", "Hartford", 5],
    ["Joe James", "Test Corp", "Yonkers", 41],
    ["John Walsh", "Test Corp", "Hartford", 5],
    ["Bob Herm", "Test Corp", "Tampa", 6],
    ["James Houston", "Test Corp", "Dallas", 8],
    ["Joe James", "Test Corp", "Yonkers", 41],
    ["John Walsh", "Test Corp", "Hartford", 5],
    ["Joe James", "Test Corp", "Yonkers", 41],
    ["John Walsh", "Test Corp", "Hartford", 5],
    ["Bob Herm", "Test Corp", "Tampa", 6],
    ["James Houston", "Test Corp", "Dallas", 8],
    ["Joe James", "Test Corp", "Yonkers", 41],
    ["John Walsh", "Test Corp", "Hartford", 5],
  ];

  const options = {
    filter: false,
    pagination: true,
    search: false,
    print: false,
    download: false,
  };
  return (
    <Fragment>
      <PageHeaderWithActions header="Teams" />
      <MUIDataTable
        title={"All Teams"}
        data={data}
        columns={columns}
        options={options}
      />
    </Fragment>
  );
};

export default TeamsPage;
