import { Fragment } from "react";
import PageHeaderWithActions from "../../components/Common/PageHeaderWithActions";
import TasksLayoutAdmin from "../../components/Layouts/TasksLayout/TasksLayoutAdmin";
import TaskCard from "../../components/Common/Cards/TaskCard/TaskCard";
const TasksPage = () => {
  const dummyTask = {
    name: "Table Cleaning",
    description: "Clean all tables on the first floor",
    created_by: {
      first_name: "John",
      last_name: "Doe",
      username: "johnny",
    },
    taskable: "Course",
    status: 2,
    taskable_id: 1,
  };
  return (
    <Fragment>
      <PageHeaderWithActions
        header="Tasks"
        haveNav={["All", "Assigned", "Unassinged", "Latest"]}
      />
      <TasksLayoutAdmin>
        <TaskCard task={dummyTask} />
      </TasksLayoutAdmin>
    </Fragment>
  );
};

export default TasksPage;
