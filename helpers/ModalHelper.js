import { Formik, Form } from "formik";
import TextInput from "../components/Common/Inputs/TextInput";
import ActionButtonWithIcon from "../components/Common/Buttons/ActionButtonWithIcon";
import TextAreaInput from "../components/Common/Inputs/TextAreaInput";
import SelectInput from "../components/Common/Inputs/SelectInput";
import { BsTrash } from "react-icons/bs";
export const unassignTaskModal = (
  task,
  handleClose,
  handleUnassignTask,
  id
) => {
  return (
    <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h4>Are you sure?</h4>
        </div>
        <div className="modal-body">
          <Formik
            initialValues={{
              id: id,
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              handleUnassignTask(values);
            }}
          >
            <Form>
              <div className="modal-footer">
                <ActionButtonWithIcon
                  text="Close"
                  isSecondary
                  action={handleClose}
                />
                <ActionButtonWithIcon
                  text="Confirm"
                  buttonType="submit"
                  action={"submit"}
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export const assignTaskModal = (task, handleClose, handleAssignTask, id) => {
  return (
    <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h4>Assign Task</h4>
        </div>
        <div className="modal-body">
          <Formik
            initialValues={{
              id: id,
              users: [],
              teams: [],
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleAssignTask(values);
            }}
          >
            <Form>
              <SelectInput
                label="Users"
                externalStyles="mb-3"
                name="users"
                isMultiple
              >
                <option value="1">Marketing</option>
                <option value="2">Developers</option>
                <option value="3">Team</option>
              </SelectInput>
              <SelectInput
                label="Teams"
                externalStyles="mb-3"
                name="teams"
                isMultiple
              >
                <option value="0">John Doe</option>
                <option value="1">Jane Doe</option>
              </SelectInput>
              <div className="modal-footer">
                <ActionButtonWithIcon
                  text="Close"
                  isSecondary
                  action={handleClose}
                />
                <ActionButtonWithIcon
                  text="Confirm"
                  buttonType="submit"
                  action={"submit"}
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export const removeTaskModal = (task, handleClose, handleAssignTask, id) => {
  return (
    <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h4>Confirm Remove Task?</h4>
        </div>
        <div className="modal-body">
          <Formik
            initialValues={{
              id: id,
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              handleUnassignTask(values);
            }}
          >
            <Form>
              <div className="modal-body">
                <div className="d-flex justify-content-center align-items-center">
                  <BsTrash size={150} />
                </div>
              </div>
              <div className="modal-footer">
                <ActionButtonWithIcon
                  text="Close"
                  isSecondary
                  action={handleClose}
                />
                <ActionButtonWithIcon
                  text="Confirm"
                  buttonType="submit"
                  action={"submit"}
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export const createNoteModal = (id, handleClose, handleCreateNote) => {
  return (
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
              isPositive: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setSubmitting(false);
              handleCreateNote(values, id);
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
                <option value={1}>Positive</option>
                <option value={0}>Negative</option>
              </SelectInput>
              <div className="modal-footer">
                <ActionButtonWithIcon
                  text="Close"
                  isSecondary
                  action={handleClose}
                />
                <ActionButtonWithIcon
                  text="Create"
                  buttonType="submit"
                  action={"submit"}
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export const suspendAccountModal = (
  id,
  username,
  handleClose,
  handleConfirm
) => {
  return (
    <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h4>Are you sure?</h4>
        </div>
        <div className="modal-body">
          <Formik
            initialValues={{
              id: id,
              username: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleConfirm(values, { setSubmitting });
            }}
          >
            <Form>
              <TextInput
                key="username"
                placeholder={`Confirm by writing @${username}`}
                label={`Suspend @${username}`}
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
                  buttonType="submit"
                  action={"submit"}
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
