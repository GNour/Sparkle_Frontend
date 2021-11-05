import { Fragment } from "react";
import PageHeaderWithActions from "../../components/Common/PageHeaderWithActions";
import MUIDataTable from "mui-datatables";
import axiosConfig from "../../helpers/axiosConfig";
const AttendancePage = ({ attendance }) => {
  const columns = [
    {
      name: "Date",
      options: {
        sort: true,
      },
    },
    {
      name: "Name",
      options: {
        sort: true,
      },
    },
    {
      name: "Username",
      options: {
        sort: true,
      },
    },
    {
      name: "Position",
      options: {
        sort: true,
      },
    },
    {
      name: "Status",
      options: {
        sort: true,
      },
    },
  ];

  const data = populateAttendanceData(attendance);
  const options = {
    filter: false,
    pagination: true,
    search: false,
    print: false,
    download: true,
    selectableRows: "none",
  };

  return (
    <Fragment>
      <PageHeaderWithActions header="Attendance" />
      <MUIDataTable
        title={"All Teams"}
        data={data}
        columns={columns}
        options={options}
      />
    </Fragment>
  );
};

const populateAttendanceData = (attendances) => {
  const data = [];
  attendances.forEach((attendance) => {
    data.push([
      new Date(attendance.created_at).toLocaleDateString(),
      attendance.user.first_name + " " + attendance.user.last_name,
      attendance.user.username,
      attendance.user.position,
      attendance.status ? "Checked In" : "Checked Out",
    ]);
  });
  return data;
};

export const getServerSideProps = async () => {
  try {
    const attendance = await axiosConfig.post("iot/attendance", {
      key: process.env.API_KEY,
    });

    return {
      props: {
        attendance: attendance.data,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {},
  };
};
export default AttendancePage;
