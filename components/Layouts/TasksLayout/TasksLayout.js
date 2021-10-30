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
import axiosConfig from "../../../helpers/axiosConfig";
import { useSWRConfig } from "swr";
import { useAuth } from "../../../stores/AuthContext";
const TasksLayout = ({ children, taskableCourses }) => {
  const { user } = useAuth();
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [isModalOpened, setIsModalOpen] = useState(false);

  const handleOpen = (value) => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateTask = async (values, { setSubmitting }) => {
    const res = await axiosConfig
      .post("task/create", values)
      .then(() => {
        setSubmitting(false);
        setIsModalOpen(false);
        mutate("task/all");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <PageHeaderWithActions
        header="Tasks"
        button={
          user.role == "Admin" ? (
            <div>
              <ActionButtonWithIcon
                icon={<AiOutlinePlus />}
                text={"Create task"}
                externalStyles="me-1"
                action={handleOpen}
              />
            </div>
          ) : null
        }
      />
      <div className="row g-3 gy-5 py-3 row-deck">{children}</div>
      <CustomModal isModalOpened={isModalOpened} modalClose={handleClose}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-md">
          <Formik
            initialValues={{
              name: "",
              description: "",
              taskable_type: "todo",
              taskable_id: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleCreateTask(values, { setSubmitting });
            }}
          >
            {(form) => {
              return (
                <Form className="modal-content">
                  <div className="modal-header">
                    <h4>Create Task</h4>
                  </div>
                  <div className="modal-body">
                    <TextInput
                      key="title"
                      placeholder="Task Title"
                      label="Task Title"
                      externalStyles="mb-3"
                      name="name"
                      type="text"
                    />

                    <TextAreaInput
                      key="description"
                      placeholder="Task Description"
                      label="Task Description"
                      externalStyles="mb-3"
                      name="description"
                      type="text"
                    />
                    <SelectInput
                      label="Task type"
                      externalStyles="mb-3"
                      name="taskable_type"
                    >
                      <option value="todo" defaultValue>
                        Todo
                      </option>
                      <option value="course">Course</option>
                    </SelectInput>
                    {form.values.taskable_type == "todo" ? null : (
                      <div>
                        <SelectInput
                          name="taskable_id"
                          label="Select course"
                          externalStyles="mb-3"
                        >
                          <option>Choose Course</option>
                          {taskableCourses.map((course) => {
                            return (
                              <option key={course.id} value={course.id}>
                                {course.name}
                              </option>
                            );
                          })}
                        </SelectInput>
                      </div>
                    )}
                  </div>
                  <div className="modal-footer">
                    <ActionButtonWithIcon
                      text="Close"
                      isSecondary
                      action={handleClose}
                    />
                    <ActionButtonWithIcon text="Create" buttonType="submit" />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </CustomModal>
    </Fragment>
  );
};

export default TasksLayout;
