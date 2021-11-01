import { Fragment, useState } from "react";
import PageHeaderWithActions from "../../components/Common/PageHeaderWithActions";
import MUIDataTable from "mui-datatables";
import ActionButtonWithIcon from "../../components/Common/Buttons/ActionButtonWithIcon";
import { AiOutlinePlus } from "react-icons/ai";
import { createTeamModal } from "../../helpers/ModalHelper";
import CustomModal from "../../components/Common/CustomModal";
import axiosConfig from "../../helpers/axiosConfig";
const AttendancePage = ({}) => {
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

  const dummydata = [
    {
      id: 1,
      user_id: 1,
      status: 0,
      created_at: "2021-11-01T19:04:29.000000Z",
      updated_at: "2021-11-01T19:04:29.000000Z",
      user: {
        id: 1,
        username: "admin",
        first_name: "admin",
        last_name: "admin",
        email: "admin@gmail.com",
        phone_number: "+961 78844775",
        profile_picture: "imgs/gsdf/sdf.jpg",
        gender: 0,
        role: "Admin",
        position: null,
        created_at: "2021-11-01T16:25:18.000000Z",
        updated_at: "2021-11-01T16:25:18.000000Z",
        deleted_at: null,
        team_id: null,
      },
    },
    {
      id: 2,
      user_id: 1,
      status: 0,
      created_at: "2021-11-01T19:05:07.000000Z",
      updated_at: "2021-11-01T19:05:07.000000Z",
      user: {
        id: 1,
        username: "admin",
        first_name: "admin",
        last_name: "admin",
        email: "admin@gmail.com",
        phone_number: "+961 78844775",
        profile_picture: "imgs/gsdf/sdf.jpg",
        gender: 0,
        role: "Admin",
        position: null,
        created_at: "2021-11-01T16:25:18.000000Z",
        updated_at: "2021-11-01T16:25:18.000000Z",
        deleted_at: null,
        team_id: null,
      },
    },
    {
      id: 3,
      user_id: 1,
      status: 0,
      created_at: "2021-11-01T19:05:13.000000Z",
      updated_at: "2021-11-01T19:05:13.000000Z",
      user: {
        id: 1,
        username: "admin",
        first_name: "admin",
        last_name: "admin",
        email: "admin@gmail.com",
        phone_number: "+961 78844775",
        profile_picture: "imgs/gsdf/sdf.jpg",
        gender: 0,
        role: "Admin",
        position: "Web Developer",
        created_at: "2021-11-01T16:25:18.000000Z",
        updated_at: "2021-11-01T16:25:18.000000Z",
        deleted_at: null,
        team_id: null,
      },
    },
    {
      id: 4,
      user_id: 1,
      status: 0,
      created_at: "2021-11-01T19:13:52.000000Z",
      updated_at: "2021-11-01T19:13:52.000000Z",
      user: {
        id: 1,
        username: "admin",
        first_name: "admin",
        last_name: "admin",
        email: "admin@gmail.com",
        phone_number: "+961 78844775",
        profile_picture: "imgs/gsdf/sdf.jpg",
        gender: 0,
        role: "Admin",
        position: null,
        created_at: "2021-11-01T16:25:18.000000Z",
        updated_at: "2021-11-01T16:25:18.000000Z",
        deleted_at: null,
        team_id: null,
      },
    },
    {
      id: 5,
      user_id: 1,
      status: 0,
      created_at: "2021-11-01T19:14:51.000000Z",
      updated_at: "2021-11-01T19:14:51.000000Z",
      user: {
        id: 1,
        username: "admin",
        first_name: "admin",
        last_name: "admin",
        email: "admin@gmail.com",
        phone_number: "+961 78844775",
        profile_picture: "imgs/gsdf/sdf.jpg",
        gender: 0,
        role: "Admin",
        position: null,
        created_at: "2021-11-01T16:25:18.000000Z",
        updated_at: "2021-11-01T16:25:18.000000Z",
        deleted_at: null,
        team_id: null,
      },
    },
  ];

  const data = populateAttendanceData(dummydata);
  const options = {
    filter: false,
    pagination: true,
    search: false,
    print: false,
    download: true,
    selectableRows: "none",
  };

  const handleCreateTeam = async (values, { setSubmitting }) => {
    await axiosConfig
      .post("team/create", values)
      .then((res) => {
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
    setSubmitting(false);
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
    const teams = await axiosConfig.post("server/teams", {
      key: process.env.API_KEY,
    });

    const managers = await axiosConfig.post("server/managers", {
      key: process.env.API_KEY,
    });

    return {
      props: {
        teams: teams.data,
        managers: managers.data,
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
