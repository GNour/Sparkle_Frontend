import { Fragment } from "react";
import PageHeaderWithActions from "../../Common/PageHeaderWithActions";
const TasksLayout = ({ children }) => {
  return (
    <Fragment>
      <PageHeaderWithActions
        header="Tasks"
        haveNav={["All", "Courses", "Todos"]}
        haveSubNav={["Assigned", "Unassinged", "Latest"]}
      />
      <div className="row g-3 gy-5 py-3 row-deck">{children}</div>
    </Fragment>
  );
};

export default TasksLayout;
