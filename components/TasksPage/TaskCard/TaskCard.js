import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { BsPersonCheckFill, BsTrash } from "react-icons/bs";
import { MdAssignmentInd } from "react-icons/md";
import IconText from "../../Common/IconText";
import InfoActionsFooter from "../../Common/InfoActionsFooter";
import InfoBody from "../../Common/InfoBody";
import styles from "./TaskCard.module.scss";
const TaskCard = ({
  task,
  handleActionButton,
  handleRemoveAction,
  handlePopoverContent,
  userRole,
}) => {
  if (userRole == "Staff") {
    return (
      <div className={`${styles.TaskCardContainer}`}>
        <InfoBody
          cornerText={`${task.user_task.deadline}`}
          title={task.name}
          subTitle={`@${task.created_by.username}`}
          body={`${task.description}`}
        />
        {getCardFooterEmployee(
          task,
          task.taskable_type,
          task.id,
          handleActionButton
        )}
      </div>
    );
  }

  const taskStats = getTaskStats(task.users);
  const taskStatsProgress = Math.floor(
    (taskStats?.completedUsers.length / taskStats?.uncompletedUsers.length) *
      100
  );

  return (
    <div
      className={`${styles.TaskCardContainer}`}
      onClick={(e) => handlePopoverContent(e)}
      style={{
        borderImage: `linear-gradient(90deg, green ${
          taskStatsProgress ? taskStatsProgress : 0
        }%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%) 1`,
      }}
    >
      <InfoBody
        cornerText={`${
          task.users.length != 0
            ? `deadline: ${task.users[0].details.deadline}`
            : ""
        }`}
        title={task.name}
        subTitle={`@${task.created_by.username}`}
        body={`${task.description}`}
      />
      {getCardFooterAdmin(
        task,
        task.assigned,
        task.id,
        handleActionButton,
        handleRemoveAction,
        taskStats
      )}
    </div>
  );
};

const getCardFooterEmployee = ({}, type, id, action) => {
  if (type == "todo") {
    return (
      <InfoActionsFooter
        actions={[
          <Button
            key={"Complete" + id}
            id={id}
            size="small"
            variant="outlined"
            startIcon={<AiOutlineCheck />}
            onClick={action}
          >
            Complete
          </Button>,
        ]}
      />
    );
  }
  if (type == "course") {
    return (
      <InfoActionsFooter
        actions={[
          <Button
            key={"Start" + id}
            id={id}
            size="small"
            variant="outlined"
            startIcon={<AiOutlineCheck />}
            onClick={action}
          >
            Start
          </Button>,
        ]}
      />
    );
  }
};

const getCardFooterAdmin = (
  task,
  status,
  id,
  handleActionButton,
  handleRemoveAction,
  stats
) => {
  if (status == 1) {
    return (
      <InfoActionsFooter
        icons={[
          <IconText
            key="completed"
            icon={<MdAssignmentInd />}
            style="me-2"
            text={stats?.completedUsers.length}
          />,
          <IconText
            key="uncompleted"
            icon={<BsPersonCheckFill />}
            style="me-2"
            text={stats?.uncompletedUsers.length}
          />,
        ]}
        actions={[
          <Button
            key={id}
            id={id}
            size="small"
            variant="outlined"
            startIcon={<AiOutlineClose />}
            onClick={handleActionButton}
          >
            Unassign
          </Button>,
        ]}
      />
    );
  } else if (status == 0) {
    return (
      <InfoActionsFooter
        actions={[
          <Button
            key={"Assign" + id}
            id={id}
            size="small"
            variant="outlined"
            startIcon={<AiOutlinePlus />}
            onClick={handleActionButton}
          >
            Assign
          </Button>,
        ]}
      />
    );
  } else if (status == 2) {
    return (
      <InfoActionsFooter
        icons={[
          <IconText
            key="uncompleted"
            icon={<BsPersonCheckFill />}
            style="me-2"
            text="25"
          />,
        ]}
        actions={[
          <Button
            key={"Ressagin" + id}
            id={id}
            size="small"
            variant="outlined"
            startIcon={<AiOutlinePlus />}
            onClick={handleActionButton}
          >
            Reassign
          </Button>,
          <Button
            key={"Remove" + id}
            id={id}
            size="small"
            variant="outlined"
            startIcon={<BsTrash />}
            onClick={handleRemoveAction}
          >
            Remove
          </Button>,
        ]}
      />
    );
  }
};

const getTaskStats = (users) => {
  if (users.length == 0) return;
  let completedUsers = [];
  let uncompletedUsers = [];
  users.forEach((user) => {
    if (user.details.completed == 1) {
      completedUsers.push(user.username);
    } else {
      uncompletedUsers.push(user.username);
    }
  });
  return { completedUsers, uncompletedUsers };
};
export default TaskCard;
