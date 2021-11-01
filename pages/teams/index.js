import { Fragment, useState } from "react";
import PageHeaderWithActions from "../../components/Common/PageHeaderWithActions";
import MUIDataTable from "mui-datatables";
import ActionButtonWithIcon from "../../components/Common/Buttons/ActionButtonWithIcon";
import { AiOutlinePlus } from "react-icons/ai";
import { createTeamModal } from "../../helpers/ModalHelper";
import CustomModal from "../../components/Common/CustomModal";
import axiosConfig from "../../helpers/axiosConfig";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
const TeamsPage = ({ teams, managers }) => {
  const [isModalOpened, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

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

  const data = populateTeamData(teams);
  const expandableData = populateEmployeesUsername(teams);
  const options = {
    filter: false,
    pagination: true,
    search: false,
    selectableRows: "none",
    print: false,
    download: false,
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    isRowExpandable: (dataIndex, expandedRows) => {
      if (dataIndex === 3 || dataIndex === 4) return false;

      if (
        expandedRows.data.length > 4 &&
        expandedRows.data.filter((d) => d.dataIndex === dataIndex).length === 0
      )
        return false;
      return true;
    },
    rowsExpanded: [0, 1],
    renderExpandableRow: (rowData, rowMeta) => {
      const colSpan = rowData.length + 1;
      return (
        <TableRow>
          <TableCell colSpan={colSpan}>
            {console.log()}
            {expandableData[rowMeta.rowIndex][0].map((x, i) => {
              return (
                <p
                  key={"x" + x}
                  className="d-flex justify-content-center text-muted"
                >
                  {x}
                </p>
              );
            })}
          </TableCell>
        </TableRow>
      );
    },
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
      <PageHeaderWithActions
        header="Teams"
        button={
          <ActionButtonWithIcon
            icon={<AiOutlinePlus />}
            text={"Create"}
            action={() => {
              handleModalOpen();
            }}
          />
        }
      />
      <MUIDataTable
        title={"All Teams"}
        data={data}
        columns={columns}
        options={options}
      />
      <CustomModal isModalOpened={isModalOpened} modalClose={handleClose}>
        {createTeamModal(handleClose, handleCreateTeam, managers)}
      </CustomModal>
    </Fragment>
  );
};

const populateTeamData = (teams) => {
  const data = [];
  teams.forEach((team) => {
    data.push([
      team.name,
      team.leader.username,
      team.description,
      team.members.length,
    ]);
  });

  return data;
};
const populateEmployeesUsername = (teams) => {
  const data = [];
  teams.forEach((team) => {
    let membersUsername = [];
    team.members.forEach((member) => {
      membersUsername.push(member.username);
    });
    data.push([membersUsername]);
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
export default TeamsPage;
