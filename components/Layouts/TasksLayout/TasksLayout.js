import { Fragment, useState } from "react";
import PageHeaderWithActions from "../../Common/PageHeaderWithActions";
import CustomModal from "../../Common/CustomModal";
import TextInput from "../../Common/Inputs/TextInput";
import TextAreaInput from "../../Common/Inputs/TextAreaInput";
import SelectInput from "../../Common/Inputs/SelectInput";
import ActionButtonWithIcon from "../../Common/Buttons/ActionButtonWithIcon";
import { AiOutlinePlus } from "react-icons/ai";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
const TasksLayout = ({ children }) => {
  const router = useRouter();
  const [isModalOpened, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleOpen = (value) => {
    setModalType(value);
    setIsModalOpen(true);
    console.log(modalType);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateCourse = () => {};

  const handleCreateTask = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <Fragment>
      <PageHeaderWithActions
        header="Tasks"
        button={
          <div>
            <ActionButtonWithIcon
              icon={<AiOutlinePlus />}
              text={"Create task"}
              externalStyles="me-1"
              action={handleOpen}
            />
            <ActionButtonWithIcon
              icon={<AiOutlinePlus />}
              text={"Create Course"}
              action={() => router.push("courses/create")}
            />
          </div>
        }
      />
      <div className="row g-3 gy-5 py-3 row-deck">{children}</div>
      <CustomModal isModalOpened={isModalOpened} modalClose={handleClose}>
        <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Create Task</h4>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{
                  title: "",
                  description: "",
                  type: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleCreateTask(values, { setSubmitting });
                }}
              >
                <Form>
                  <TextInput
                    key="title"
                    placeholder="Task Title"
                    label="Task Title"
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
                    label="Task type"
                    externalStyles="mb-3"
                    name="type"
                  >
                    <option value="todo" defaultValue>
                      Todo
                    </option>
                    <option value="Course">Course</option>
                  </SelectInput>

                  <div className="modal-footer">
                    <ActionButtonWithIcon
                      text="Close"
                      isSecondary
                      action={handleClose}
                    />
                    <ActionButtonWithIcon text="Create" />
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </CustomModal>
    </Fragment>
  );
};

export default TasksLayout;
