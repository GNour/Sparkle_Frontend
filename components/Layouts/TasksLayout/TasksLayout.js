import { Fragment, useState } from "react";
import PageHeaderWithActions from "../../Common/PageHeaderWithActions";
import CustomModal from "../../Common/CustomModal";
import TextInput from "../../Common/Inputs/TextInput";
import TextAreaInput from "../../Common/Inputs/TextAreaInput";
import SelectInput from "../../Common/Inputs/SelectInput";
import ActionButtonWithIcon from "../../Common/Buttons/ActionButtonWithIcon";
import { AiOutlinePlus } from "react-icons/ai";
const TasksLayout = ({ children }) => {
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
  return (
    <Fragment>
      <PageHeaderWithActions
        header="Tasks"
        haveNav={["All", "Courses", "Todos"]}
        button={
          <ActionButtonWithIcon
            icon={<AiOutlinePlus />}
            text={"Create"}
            action={handleOpen}
          />
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
              <TextInput
                placeHolder="Task Title"
                label="Task Title"
                externalStyles="mb-3"
                name="title"
                type="text"
                handleChange={(value) => console.log(value)}
              />
              <TextAreaInput
                placeHolder="Task Description"
                label="Task Title"
                externalStyles="mb-3"
                name="title"
                type="text"
                handleChange={(value) => console.log(value)}
              />
              <SelectInput
                label="Choose Task Type"
                externalStyles="mb-3"
                name="title"
                handleChange={(value) => console.log(value)}
              >
                <option defaultValue>Select</option>
                <option value="1">Hello</option>
                <option value="2">World</option>
                <option value="3">!</option>
              </SelectInput>
            </div>
            <div className="modal-footer">
              <ActionButtonWithIcon
                text="Close"
                isSecondary
                action={handleClose}
              />
              <ActionButtonWithIcon text="Create" />
            </div>
          </div>
        </div>
      </CustomModal>
    </Fragment>
  );
};

export default TasksLayout;
