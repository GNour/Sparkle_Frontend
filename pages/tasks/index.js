import { Fragment, useState } from "react";
import TasksLayout from "../../components/Layouts/TasksLayout/TasksLayout";
import TaskCard from "../../components/TasksPage/TaskCard/TaskCard";
import ColoumnContainer from "../../components/Common/ColoumnContainer";
import { Popover, Typography } from "@material-ui/core";

const TasksPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverContent, setPopoverConter] = useState("Nothing to show");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const dummyTaskAssigned = {
    name: "Table Cleaning",
    description: "Clean all tables on the first floor",
    created_by: {
      first_name: "John",
      last_name: "Doe",
      username: "johnny",
    },
    taskable: "Course",
    status: 1,
    taskable_id: 1,
    completed: {
      first_name: "complete",
      last_name: "complete",
      username: "johnny",
    },
    assignedto: {
      first_name: "John",
      last_name: "Doe",
      username: "johnny",
    },
  };
  const dummyTaskUnassigned = {
    name: "Table Cleaning",
    description: "Clean all tables on the first floor",
    created_by: {
      first_name: "John",
      last_name: "Doe",
      username: "johnny",
    },
    taskable: "Course",
    status: 0,
    taskable_id: 1,
  };
  const dummyTaskFinished = {
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
      <TasksLayout>
        <ColoumnContainer title="Assigned">
          <TaskCard
            task={dummyTaskAssigned}
            handlePopoverContent={setPopoverConter}
            handleClick={handleClick}
          />
          <TaskCard
            task={dummyTaskAssigned}
            handlePopoverContent={setPopoverConter}
            handleClick={handleClick}
          />
          <TaskCard
            task={dummyTaskAssigned}
            handlePopoverContent={setPopoverConter}
            handleClick={handleClick}
          />
        </ColoumnContainer>
        <ColoumnContainer title="Unassigned">
          <TaskCard task={dummyTaskUnassigned} />
          <TaskCard task={dummyTaskUnassigned} />
          <TaskCard task={dummyTaskUnassigned} />
        </ColoumnContainer>
        <ColoumnContainer title="Finished">
          <TaskCard task={dummyTaskFinished} />
          <TaskCard task={dummyTaskFinished} />
          <TaskCard task={dummyTaskFinished} />
        </ColoumnContainer>
      </TasksLayout>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className="p-3">{popoverContent}</Typography>
      </Popover>
    </Fragment>
  );
};

export default TasksPage;
