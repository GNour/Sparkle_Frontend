import PageHeaderWithActions from "../../components/Common/PageHeaderWithActions";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import ActionButtonWithIcon from "../../components/Common/Buttons/ActionButtonWithIcon";
import { Fragment, useEffect, useState } from "react";
import EmployeeLayout from "../../components/Layouts/Employees/EmployeeLayout";
import UserCard from "../../components/EmployeesPage/UserCard/UserCard";
import Infolist from "../../components/Common/Infolist";
import { AiFillHome } from "react-icons/ai";
import { MdEmergency } from "react-icons/md";
import ScrollableContainer from "../../components/Common/ScrollableContainer";
import NoteCard from "../../components/Common/Cards/NoteCard";
import CustomModal from "../../components/Common/CustomModal";
import TextInput from "../../components/Common/Inputs/TextInput";
import TextAreaInput from "../../components/Common/Inputs/TextAreaInput";
import SelectInput from "../../components/Common/Inputs/SelectInput";
import { Form, Formik } from "formik";

const MemberPage = () => {
  const [showMoreUserDetails, setShowMoreUserDetails] = useState(false);
  const [userNotes, setUserNotes] = useState([]);
  const [user, setUser] = useState([]);
  const [isModalOpened, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modal, setModal] = useState(<div></div>);

  const handleOpen = (value, id) => {
    setModalType(value);
    setIsModalOpen(true);
    console.log(modalType, id);
  };

  const handleAddNote = (values, { setSubmitting }) => {
    setUserNotes([values, ...userNotes]);
    setIsModalOpen(false);
    setSubmitting(false);
  };

  const handleSuspendAccount = (values, { setSubmitting }) => {
    if (values.username == "@" + user.username) {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }
  };

  useEffect(() => {
    if (modalType == 1) {
      setModal(
        <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Create Note</h4>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{
                  title: "",
                  description: "",
                  isPositive: null,
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleAddNote(values, { setSubmitting });
                }}
              >
                <Form>
                  <TextInput
                    key="title"
                    placeholder="Note Title"
                    label="Note Title"
                    externalStyles="mb-3"
                    name="title"
                    type="text"
                  />

                  <TextAreaInput
                    key="description"
                    placeholder="Note Description"
                    label="Note Description"
                    externalStyles="mb-3"
                    name="description"
                    type="text"
                  />
                  <SelectInput
                    label="Positive ?"
                    externalStyles="mb-3"
                    name="isPositive"
                  >
                    <option defaultValue>Choose if it is positive note</option>
                    <option value="1">Positive</option>
                    <option value="0">Negative</option>
                  </SelectInput>
                  <div className="modal-footer">
                    <ActionButtonWithIcon
                      text="Close"
                      isSecondary
                      action={handleClose}
                    />
                    <ActionButtonWithIcon
                      text="Create"
                      type="submit"
                      action={"submit"}
                    />
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      );
    } else if (modalType == 0) {
      setModal(
        <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Are you sure?</h4>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{
                  id: user.id,
                  username: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleSuspendAccount(values, { setSubmitting });
                }}
              >
                <Form>
                  <TextInput
                    key="username"
                    placeholder={`Confirm by writing @${user.username}`}
                    label={`Suspend @${user.username}`}
                    externalStyles="mb-3"
                    name="username"
                    type="text"
                  />
                  <div className="modal-footer">
                    <ActionButtonWithIcon
                      text="Close"
                      isSecondary
                      action={handleClose}
                    />
                    <ActionButtonWithIcon
                      text="Confirm"
                      type="submit"
                      action={"submit"}
                    />
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      );
    }
  }, [modalType]);
  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(async () => {
    const user = {
      id: 1,
      username: "admin",
      first_name: "Ghyath",
      last_name: "Noureddine",
      email: "admin@gmail.com",
      phone_number: "+961 78844775",
      profile_picture: "imgs/gsdf/sdf.jpg",
      gender: 0,
      created_at: "2021-10-22T22:11:22.000000Z",
      updated_at: "2021-10-22T22:11:22.000000Z",
      deleted_at: null,
      team_id: null,
      team: null,
      tasks: [
        {
          id: 1,
          name: "Yadira Breitenberg",
          description:
            "Quo fugiat ad laboriosam laboriosam pariatur in blanditiis. Saepe aut quos cupiditate quas beatae.",
          created_by: 1,
          taskable_type: "App\\Models\\Course",
          taskable_id: 1,
          assigned: 2,
          created_at: "2021-10-22T22:11:23.000000Z",
          updated_at: "2021-10-22T22:40:52.000000Z",
          deleted_at: null,
          user_task: {
            user_id: 1,
            task_id: 1,
            deadline: "2021-10-12 00:00:00",
            completed: 0,
            created_at: "2021-10-22T22:32:31.000000Z",
            updated_at: "2021-10-22T22:46:08.000000Z",
          },
        },
      ],
      courses: [
        {
          id: 1,
          name: "Prof. Aurelie Lind",
          description:
            "Esse sint rerum id. Id aut ratione quia. Rem harum ipsa voluptates totam.",
          created_by: 1,
          created_at: "2021-10-22T22:11:23.000000Z",
          updated_at: "2021-10-22T22:11:23.000000Z",
          deleted_at: null,
          user_course: {
            user_id: 1,
            course_id: 1,
            completed: 0,
            grade: 0,
            created_at: "2021-10-22T23:33:56.000000Z",
            updated_at: "2021-10-22T23:33:56.000000Z",
          },
        },
      ],
      notes: [
        {
          id: 2,
          title: "Positive",
          description: "test description",
          user_id: 1,
          positive: 1,
          created_at: "2021-10-22T23:43:58.000000Z",
          updated_at: "2021-10-22T23:43:58.000000Z",
        },
        {
          id: 3,
          title: "Negative",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad dicta error quia eveniet quibusdam laborum quod necessitatibus molestiae aspernatur consectetur temporibus, commodi, maiores dolores, sequi officiis qui ratione sed a?",
          user_id: 1,
          positive: 0,
          created_at: "2021-10-22T23:43:58.000000Z",
          updated_at: "2021-10-22T23:43:58.000000Z",
        },
        {
          id: 4,
          title: "Test Title",
          description: "Freestyling",
          user_id: 1,
          positive: 1,
          created_at: "2021-10-22T23:43:58.000000Z",
          updated_at: "2021-10-22T23:43:58.000000Z",
        },
        {
          id: 5,
          title: "FIRE",
          description: "He made a fire in the kitchen",
          user_id: 1,
          positive: 0,
          created_at: "2021-10-22T23:43:58.000000Z",
          updated_at: "2021-10-22T23:43:58.000000Z",
        },
      ],
    };

    setUserNotes(user.notes);
    setUser(user);
  }, []);

  const handleCardClick = () => {
    setShowMoreUserDetails(showMoreUserDetails ? false : true);
  };

  return (
    <Fragment>
      <PageHeaderWithActions
        header={user.first_name + " " + user.last_name}
        button={
          <ActionButtonWithIcon
            icon={<AiOutlineClose />}
            text={"Suspend"}
            type={0}
            action={handleOpen}
          />
        }
      />
      <EmployeeLayout>
        <div className="col-xl-7 col-lg-7 order-2 order-md-1"></div>
        <div className="col-xl-5 order-1 p-2 order-md-2 col-lg-5 rounded custom-container">
          <div>
            <UserCard
              outerStyle="col"
              image={"/id_img.jpg"}
              imageText={"Waiter"}
              action={handleCardClick}
            />
            {showMoreUserDetails ? (
              <div>
                <Infolist
                  title={"More Contact"}
                  list={[
                    { icon: <AiFillHome />, text: "07410111" },
                    { icon: <MdEmergency />, text: "+961 70908090" },
                  ]}
                  externalStyles="m-1"
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
            externalStyles="mh-350 overflow-y-scroll order-1 order-md-2 rounded custom-container-sub"
            header="Notes"
            button={
              <ActionButtonWithIcon
                icon={<AiOutlinePlus />}
                action={handleOpen}
                type={1}
                externalStyles="float-end"
              />
            }
          >
            {userNotes.map((note) => {
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
