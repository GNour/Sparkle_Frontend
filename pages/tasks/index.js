import { Fragment, useEffect, useState } from "react";
import TasksLayout from "../../components/Layouts/TasksLayout/TasksLayout";
import TaskCard from "../../components/TasksPage/TaskCard/TaskCard";
import ColoumnContainer from "../../components/Common/ColoumnContainer";
import { Popover, Typography } from "@material-ui/core";
import axiosConfig from "../../helpers/axiosConfig";
import { useAuth } from "../../stores/AuthContext";
import useSWR, { mutate } from "swr";
import CustomModal from "../../components/Common/CustomModal";
import {
  unassignTaskModal,
  assignTaskModal,
  removeTaskModal,
} from "../../helpers/ModalHelper";
import { useRouter } from "next/router";
import PageHeaderWithActions from "../../components/Common/PageHeaderWithActions";
import ActionButtonWithIcon from "../../components/Common/Buttons/ActionButtonWithIcon";
import { AiOutlinePlus } from "react-icons/ai";
import Loader from "react-loader-spinner";
const TasksPage = ({ taskableCourses, teams }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  console.log(taskableCourses, teams);

  useEffect(() => {
    mutate("server/teams");
    mutate("server/courses");
  }, []);

  // States for modal, Confirmation modal and Add note modal
  const [isModalOpened, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modal, setModal] = useState(<div></div>);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const fetcher = (url) =>
    axiosConfig
      .get(url)
      .then((res) => res.data)
      .catch((err) => {
        err;
      });
  const { data, error } = useSWR("task/all", fetcher);

  if (user.role == "Staff" && data) {
    console.log(data);
  } else if (user.role == "Manager" && data) {
  }

  // TaskCard Popover
  const open = Boolean(anchorEl);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverContent, setPopoverContent] = useState("Nothing to show");
  const handleCardClick = (event) => {
    console.log(event);
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  if (error) return <div>{error}</div>;
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

  const handleAssignTask = (id) => {
    setModal(assignTaskModal(teams, handleModalClose, confirmAssignTask, id));
    setIsModalOpen(true);
  };

  const confirmAssignTask = async (values, { setSubmitting }) => {
    const data = {
      users: values.users,
      teams: values.teams,
      deadline: new Date(values.deadline).toISOString().split("T")[0],
    };
    console.log(data);
    await axiosConfig
      .put("task/assign/" + values.id, data)
      .then((res) => {
        setSubmitting(false);
        mutate("task/all");
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));

    setSubmitting(false);
  };

  const handleUnassignTask = (id) => {
    setModal(unassignTaskModal(id, handleModalClose, confirmUnassignTask, id));
    setIsModalOpen(true);
  };

  const confirmUnassignTask = async (values, { setSubmitting }) => {
    await axiosConfig
      .put("task/unassign/" + values.id)
      .then((res) => {
        setSubmitting(false);
        mutate("task/all");
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));

    setSubmitting(false);
  };

  const handleRemoveTask = (id) => {
    setModal(removeTaskModal(id, handleModalClose, confirmRemoveTask, id));
    setIsModalOpen(true);
  };

  const confirmRemoveTask = async (values, { setSubmitting }) => {
    await axiosConfig
      .delete("task/delete/" + values.id)
      .then((res) => {
        setSubmitting(false);
        mutate("task/all");
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleCompleteTodo = async (id) => {
    const res = await axiosConfig
      .put("task/complete/" + id)
      .then((res) => {
        mutate("task/all");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFinishTask = async (id) => {
    const res = await axiosConfig
      .put("task/finish/" + id)
      .then((res) => {
        mutate("task/all");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStartCourse = async (id, taskId) => {
    await axiosConfig
      .put("course/take/" + id)
      .then((res) => router.push("courses/" + id + "?tid=" + taskId));
  };

  if (error) return <div>{error}</div>;
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
  return (
    <Fragment>
      <TasksLayout
        taskableCourses={taskableCourses}
        header={data && data.length == 0 ? "No Tasks... Hooray" : "Tasks"}
      >
        <ColoumnContainer title={user.role == "Manager" ? "Assigned" : "Todos"}>
          {user.role == "Manager"
            ? data &&
              data[1] &&
              data[1].map((task) => {
                return (
                  <TaskCard
                    key={"Assigned" + task.id}
                    task={task}
                    userRole={user.role}
                    handlePopoverContent={handleCardClick}
                    handleFinishAction={(e) => {
                      e.stopPropagation();
                      handleFinishTask(task.id);
                    }}
                    handleActionButton={(e) => {
                      e.stopPropagation();
                      handleUnassignTask(task.id);
                    }}
                  />
                );
              })
            : data &&
              data.todo &&
              data.todo.map((task) => {
                return (
                  <TaskCard
                    key={"Todos" + task.id}
                    task={task}
                    userRole={user.role}
                    handlePopoverContent={handleCardClick}
                    handleActionButton={(e) => {
                      e.stopPropagation();
                      handleCompleteTodo(task.id);
                    }}
                  />
                );
              })}
        </ColoumnContainer>
        <ColoumnContainer
          title={user.role == "Manager" ? "Unassigned" : "Courses"}
        >
          {user.role == "Manager"
            ? data &&
              data[0] &&
              data[0].map((task) => {
                return (
                  <TaskCard
                    key={"Unassigned" + task.id}
                    task={task}
                    userRole={user.role}
                    handlePopoverContent={handleCardClick}
                    handleActionButton={(e) => {
                      e.stopPropagation();
                      handleAssignTask(task.id);
                    }}
                  />
                );
              })
            : data &&
              data.course &&
              data.course.map((task) => {
                return (
                  <TaskCard
                    key={"Courses" + task.id}
                    task={task}
                    userRole={user.role}
                    handlePopoverContent={handleCardClick}
                    handleActionButton={() =>
                      handleStartCourse(task.taskable_id, task.id)
                    }
                  />
                );
              })}
        </ColoumnContainer>
        <ColoumnContainer
          title={user.role == "Manager" ? "Finished" : "Upcoming Deadlines"}
        >
          {user.role == "Manager"
            ? data &&
              data[2] &&
              data[2].map((task) => {
                return (
                  <TaskCard
                    key={"Finished" + task.id}
                    task={task}
                    userRole={user.role}
                    handlePopoverContent={handleCardClick}
                    handleRemoveAction={(e) => {
                      e.stopPropagation();
                      handleRemoveTask(task.id);
                    }}
                    handleActionButton={(e) => {
                      e.stopPropagation();
                      handleAssignTask(task.id);
                    }}
                  />
                );
              })
            : getUpcomingTasks(
                data.todo && data.course && [...data.todo, ...data.course]
              ).map((task) => {
                return (
                  <TaskCard
                    key={"Urgent" + task.id}
                    task={task}
                    userRole={user.role}
                    handlePopoverContent={handleCardClick}
                    handleActionButton={
                      task.taskable_type == "todo"
                        ? () => handleCompleteTodo(task.id)
                        : () => handleStartCourse(task.id)
                    }
                  />
                );
              })}
        </ColoumnContainer>
      </TasksLayout>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
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
      <CustomModal isModalOpened={isModalOpened} modalClose={handleModalClose}>
        {modal}
      </CustomModal>
    </Fragment>
  );
};

const getUpcomingTasks = (tasks) => {
  const temp = [];
  tasks &&
    tasks.length > 0 &&
    tasks.forEach((task) => {
      if (
        Math.ceil(
          (new Date(task.user_task.deadline).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        ) < 2
      ) {
        temp.push(task);
      }
    });

  return temp;
};

export const getServerSideProps = async () => {
  try {
    const res = await axiosConfig.post("server/courses", {
      key: process.env.API_KEY,
    });

    const teams = await axiosConfig.post("server/teams", {
      key: process.env.API_KEY,
    });

    return {
      props: {
        taskableCourses: res.data,
        teams: teams.data,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {},
  };
};

export default TasksPage;
