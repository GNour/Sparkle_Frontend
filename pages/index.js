import { Fragment } from "react";
import PageHeader from "../components/Common/PageHeader";
import axiosConfig from "../helpers/axiosConfig";
import ChartContainer from "../components/Common/ChartContainer";
import { Pie, Bar } from "react-chartjs-2";
import Loader from "react-loader-spinner";
const IndexPage = ({ data, router }) => {
  console.log(data);
  const getTasksCount = () => {
    let count = 0;
    data.tasks?.forEach((data) => {
      count += data.total;
    });
    return count;
  };

  if (!data)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Loader
          type="Puff"
          color="#355ea0"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    );

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

  const todosStats = {
    labels: ["All", "Monthly", "Today"],
    datasets: [
      {
        label: "Todos Statistics",
        data: [
          data && data.todos && data.todos[0],
          data && data.todos && data.todos[1],
          data && data.todos && data.todos[2],
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
        label: "Overall stats",
        data: [
          data && data.attendance,
          data && data.courses,
          data && data.todos[0],
          data && data.users,
          data && data.teams,
          data && data.messages[0],
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

  const barOptions = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Overall Statistics",
      },
    },
  };

  return (
    <Fragment>
      <PageHeader header="Dashboard" />
      <div className="row g-3 gy-5 py-3 row-deck">
        <div className="col-12 col-sm-8">
          <ChartContainer externalStyles="custom-container rounded p-2 mb-2">
            <Bar data={generalStats} options={barOptions} redraw={false} />
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
          <ChartContainer
            externalStyles="custom-container rounded p-2 mb-2"
            header="Todos"
          >
            <Pie
              data={todosStats}
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
