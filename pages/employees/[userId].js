import PageHeaderWithActions from "../../components/Common/PageHeaderWithActions";
import { AiOutlineClose, AiOutlinePlus, AiOutlineTeam } from "react-icons/ai";
import { BsFillCalendarDateFill } from "react-icons/bs";
import ActionButtonWithIcon from "../../components/Common/Buttons/ActionButtonWithIcon";
import { Fragment, useEffect, useState } from "react";
import EmployeeLayout from "../../components/Layouts/Employees/EmployeeLayout";
import UserCard from "../../components/EmployeesPage/UserCard/UserCard";
import Infolist from "../../components/Common/Infolist";
import ScrollableContainer from "../../components/Common/ScrollableContainer";
import NoteCard from "../../components/Common/Cards/NoteCard";
import CustomModal from "../../components/Common/CustomModal";
import { Pie } from "react-chartjs-2";
import ChartContainer from "../../components/Common/ChartContainer";
import Loader from "react-loader-spinner";
import {
  getTasksStats,
  getNotesStats,
  getCoursesStats,
} from "../../helpers/UserStatsHelpers";
import {
  createNoteModal,
  suspendAccountModal,
} from "../../helpers/ModalHelper";
import { useRouter } from "next/router";
import { useAuth } from "../../stores/AuthContext";
import useSWR, { mutate } from "swr";
import axiosConfig from "../../helpers/axiosConfig";
const MemberPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { user: loggedInUser } = useAuth();

  const [showMoreUserDetails, setShowMoreUserDetails] = useState(false);
  const handleCardClick = () => {
    setShowMoreUserDetails(showMoreUserDetails ? false : true);
  };

  const [userNotes, setUserNotes] = useState([]);

  // States for charts - Notes, Tasks, Courses. Helpers in helpers/UserStatsHelpers.js
  const [userNotesStats, setUserNotesStats] = useState([]);
  const [userCoursesStats, setUserCoursesStats] = useState([]);
  const [userTasksStats, setUserTasksStats] = useState([]);

  const fetcher = (url) =>
    axiosConfig
      .get(url)
      .then((res) => res.data)
      .catch((err) => {
        err;
      });
  const { data, error } = useSWR("user/show/" + userId, fetcher);

  const notesStatsData = {
    labels: ["Negative", "Positive"],
    datasets: [
      {
        label: "User Notes Statistics",
        data: userNotesStats,
        backgroundColor: ["rgba(255, 24, 67, 1)", "rgba(126, 185, 63, 1)"],
      },
    ],
  };

  const tasksStatsData = {
    labels: ["Finished", "Finished After Deadline", "Unfinished", "Missed"],
    datasets: [
      {
        label: "User Tasks Statistics",
        data: userTasksStats,
        backgroundColor: [
          "rgba(126, 185, 63, 1)",
          "rgba(219,196,64,86)",
          "rgba(73,180,240,80)",
          "rgba(255, 24, 67, 1)",
        ],
      },
    ],
  };

  const coursesStatsData = {
    labels: ["A", "B", "C", "D", "F"],
    datasets: [
      {
        label: "User Course Statistics",
        data: userCoursesStats,
        backgroundColor: [
          "rgba(126, 185, 63, 1)",
          "rgba(73,180,240,80)",
          "rgba(73,180,150,80)",
          "rgba(219,196,64,86)",
          "rgba(255, 24, 67, 1)",
        ],
      },
    ],
  };

  // States for modal, Confirmation modal and Add note modal
  const [isModalOpened, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modal, setModal] = useState(<div></div>);

  const handleOpen = (value, id) => {
    setModalType(value);
    setIsModalOpen(true);
  };

  const handleAddNote = async (values) => {
    const res = await axiosConfig
      .post("user/note/add", {
        ...values,
        user_id: data.id,
      })
      .then((res) => {
        mutate("user/show/" + userId);
        setIsModalOpen(false);
      });
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (modalType == 1) {
      setModal(createNoteModal(userId, handleClose, handleAddNote));
    } else if (modalType == 0) {
      setModal(
        suspendAccountModal(
          userId,
          data.username,
          handleClose,
          handleSuspendAccount
        )
      );
    }
  }, [modalType]);

  const handleSuspendAccount = async (values, { setSubmitting }) => {
    if (values.username == "@" + data.username) {
      await axiosConfig.delete("user/delete/" + values.id).then((res) => {
        setSubmitting(false);
        setIsModalOpen(false);
        router.replace("/employees");
      });
    }
  };

  useEffect(() => {
    if (data) {
      setUserNotesStats(getNotesStats(data.notes));
      setUserTasksStats(getTasksStats(data.tasks));
      setUserCoursesStats(getCoursesStats(data.courses));
      setUserNotes(data.notes);
    }
  }, [data]);

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
      <PageHeaderWithActions
        header={data.username + " Dashboard"}
        button={
          loggedInUser.role == "Manager" ? (
            <ActionButtonWithIcon
              icon={<AiOutlineClose />}
              text={"Suspend"}
              type={0}
              action={handleOpen}
            />
          ) : null
        }
      />
      <EmployeeLayout>
        <div className="col-xl-7 col-lg-7 order-2 order-md-1">
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
            header="Courses"
          >
            <Pie
              data={coursesStatsData}
              width={500}
              height={300}
              options={{ maintainAspectRatio: false }}
              redraw={false}
            />
          </ChartContainer>
        </div>
        <div className="col-xl-5 order-1 p-2 order-md-2 col-lg-5 h-auto rounded custom-container">
          <div>
            <UserCard
              key={data.id}
              id={data.id}
              image={`http://3.144.31.214/images/${data.profile_picture}`}
              imageText={data.position}
              name={data.first_name + " " + data.last_name}
              username={data.username}
              phone={data.phone_number}
              email={data.email}
              action={handleCardClick}
            />
            {showMoreUserDetails ? (
              <div>
                <Infolist
                  title={"More Info"}
                  list={[
                    { icon: <AiOutlineTeam />, text: data.team.name },
                    {
                      icon: <BsFillCalendarDateFill />,
                      text: new Date(data.created_at).toLocaleDateString(),
                    },
                  ]}
                  externalStyles="m-1 rounded custom-container-sub p-1"
                />
                <div className="text-center text-muted text-sm m-1">
                  Click user card to hide more details
                </div>
              </div>
            ) : (
              <div className="text-center text-muted text-sm m-1">
                Click user card to show more details
              </div>
            )}
            <hr />
          </div>
          <ScrollableContainer
            externalStyles="mh-450 overflow-y-scroll order-1 order-md-2 rounded custom-container-sub"
            header="Feedbacks"
            button={
              loggedInUser.role == "Manager" ? (
                <ActionButtonWithIcon
                  icon={<AiOutlinePlus />}
                  action={handleOpen}
                  type={1}
                  externalStyles="float-end"
                />
              ) : null
            }
          >
            {data.notes.length == 0 ? (
              <p className="d-flex justify-content-center text-muted">
                No feedback yet
              </p>
            ) : (
              <div>
                <Pie
                  width={150}
                  height={120}
                  options={{ maintainAspectRatio: false }}
                  data={notesStatsData}
                  redraw={true}
                />
              </div>
            )}

            {data.notes.length > 0 &&
              data.notes.map((note) => {
                return (
                  <NoteCard
                    key={note.id}
                    title={note.title}
                    isPositive={note.positive}
                    description={note.description}
                  />
                );
              })}
          </ScrollableContainer>
        </div>
      </EmployeeLayout>
      <CustomModal isModalOpened={isModalOpened} modalClose={handleClose}>
        {modal}
      </CustomModal>
    </Fragment>
  );
};

export default MemberPage;
