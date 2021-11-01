import { Fragment } from "react";
import PageHeader from "../components/Common/PageHeader";
import axiosConfig from "../helpers/axiosConfig";
import ChartContainer from "../components/Common/ChartContainer";
import { Pie, Doughnut } from "react-chartjs-2";

const IndexPage = ({ data, router }) => {
  const getTasksCount = () => {
    let count = 0;
    data.tasks?.forEach((data) => {
      count += data.total;
    });
    return count;
  };

  if (!data) return <div>Loading...</div>;

  const tasksStatsData = {
    labels: ["Assigned", "Unassigned", "Finished"],
    datasets: [
      {
        label: "Tasks Statistics",
        data: [
          data && data.tasks && data.tasks[0] && data.tasks[0].total,
          data && data.tasks && data.tasks[1] && data.tasks[1].total,
          data && data.tasks && data.tasks[2] && data.tasks[2].total,
        ],
        backgroundColor: [
          "rgba(73,180,240,80)",
          "rgba(255, 24, 67, 1)",
          "rgba(126, 185, 63, 1)",
        ],
      },
    ],
  };

  const generalStats = {
    labels: [
      "Today's Attendance",
      "Courses",
      "Todos",
      "Employees",
      "Teams",
      "Messages",
    ],
    datasets: [
      {
        label: "General Statistics",
        data: [
          data && data.attendance,
          data && data.courses,
          data && data.todos,
          data && data.employees,
          data && data.teams,
          data && data.messages,
        ],
        backgroundColor: [
          "rgba(73,180,240,80)",
          "rgba(255, 24, 67, 1)",
          "rgba(126, 185, 63, 1)",
          "rgba(126, 85, 63, 1)",
          "rgba(126, 15, 63, 1)",
          "rgba(132, 12, 130, 1)",
        ],
      },
    ],
  };

  return (
    <Fragment>
      <PageHeader header="Dashboard" />
      <div className="row g-3 gy-5 py-3 row-deck">
        <div className="col-12 col-sm-8">
          <ChartContainer
            externalStyles="custom-container rounded p-2 mb-2"
            header="General Stats"
          >
            <Doughnut
              data={generalStats}
              width={500}
              height={300}
              options={{ maintainAspectRatio: false }}
              redraw={false}
            />
          </ChartContainer>
        </div>
        <div className="col-12 col-sm-4">
          <ChartContainer
            externalStyles="custom-container rounded p-2 mb-2"
            header="Tasks"
          >
            <Pie
              data={tasksStatsData}
              width={500}
              height={300}
              options={{ maintainAspectRatio: false }}
              redraw={false}
            />
          </ChartContainer>
        </div>
      </div>
    </Fragment>
  );
};

export const getServerSideProps = async () => {
  try {
    const teams = await axiosConfig.post("server/dashboard", {
      key: process.env.API_KEY,
    });

    return {
      props: {
        data: teams.data,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {},
  };
};

export default IndexPage;
