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
      <Formik
        initialValues={{
          id: id,
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleUnassignTask(values, { setSubmitting });
        }}
      >
        <Form className="modal-content">
          <div className="modal-header">
            <h4>Are you sure?</h4>
          </div>
          <div className="modal-body">
            <span className="text-danger mb-1">
              This action is irreversable
            </span>
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
              externalStyles={"bg-danger"}
              action={"submit"}
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export const assignTaskModal = (users, handleClose, handleAssignTask, id) => {
  return (
    <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
      <Formik
        initialValues={{
          id: id,
          users: [],
          teams: [],
          deadline: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleAssignTask(values, { setSubmitting });
        }}
      >
        {(form) => {
          return (
            <Form className="modal-content">
              <div className="modal-header">
                <h4>Assign Task</h4>
              </div>
              <div className="modal-body">
                <TextInput
                  key="assigndeadline"
                  placeholder="Deadline (1970-01-31 00:00:00)"
                  label="Task Deadline"
                  externalStyles="mb-3"
                  name="deadline"
                  type="date"
                />
                <SelectInput
                  label="Users"
                  externalStyles="mb-3"
                  name="users"
                  isMultiple
                  disabled={form.values.teams.length > 0 ? "disabled" : null}
                >
                  {users &&
                    users.length > 0 &&
                    users.map(
                      (team) =>
                        team.members.length > 0 &&
                        team.members.map((user) => {
                          return (
                            <option key={`user${user.id}`} value={user.id}>
                              {user.username}
                            </option>
                          );
                        })
                    )}
                </SelectInput>
                <SelectInput
                  label="Teams"
                  externalStyles="mb-3"
                  name="teams"
                  isMultiple
                  disabled={form.values.users.length > 0 ? "disabled" : null}
                >
                  {users &&
                    users.length > 0 &&
                    users.map((team) => {
                      return (
                        <option key={`team${team.id}`} value={team.id}>
                          {team.name}
                        </option>
                      );
                    })}
                </SelectInput>
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
          );
        }}
      </Formik>
    </div>
  );
};

export const removeTaskModal = (task, handleClose, handleRemoveTask, id) => {
  return (
    <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
      <Formik
        initialValues={{
          id: id,
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleRemoveTask(values, { setSubmitting });
        }}
      >
        <Form className="modal-content">
          <div className="modal-header">
            <h4>Confirm Remove Task?</h4>
          </div>
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
              externalStyles={"bg-danger"}
              buttonType="submit"
              action={"submit"}
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export const createNoteModal = (id, handleClose, handleCreateNote) => {
  return (
    <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
      <Formik
        initialValues={{
          title: "",
          description: "",
          positive: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
          handleCreateNote(values, id);
        }}
      >
        <Form className="modal-content">
          <div className="modal-header">
            <h4>Create Note</h4>
          </div>
          <div className="modal-body">
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
              name="positive"
            >
              <option defaultValue>Choose if it is positive note</option>
              <option value={1}>Positive</option>
              <option value={0}>Negative</option>
            </SelectInput>
          </div>

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
      <Formik
        initialValues={{
          id: id,
          username: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleConfirm(values, { setSubmitting });
        }}
      >
        <Form className="modal-content">
          <div className="modal-header">
            <h4>Are you sure?</h4>
          </div>
          <div className="modal-body">
            <TextInput
              key="username"
              placeholder={`Confirm by writing @${username}`}
              label={`Suspend @${username}`}
              externalStyles="mb-3"
              name="username"
              type="text"
            />
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
  );
};

export const createTeamModal = (handleClose, handleCreateTeam, managers) => {
  return (
    <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h4>Create Team</h4>
        </div>
        <div className="modal-body">
          <Formik
            initialValues={{
              name: "",
              description: "",
              leader_id: NaN,
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleCreateTeam(values, { setSubmitting });
            }}
          >
            {(form) => {
              return (
                <Form>
                  <TextInput
                    key="name"
                    placeholder="Team name"
                    label="Team name"
                    externalStyles="mb-3"
                    name="name"
                    type="text"
                  />

                  <TextAreaInput
                    key="description"
                    placeholder="Team Description"
                    label="Team Description"
                    externalStyles="mb-3"
                    name="description"
                    type="text"
                  />
                  <SelectInput
                    label="Leader"
                    externalStyles="mb-3"
                    name="leader_id"
                  >
                    <option defaultValue>Select Leader</option>
                    {managers.map((manager) => {
                      return (
                        <option key={manager.id} value={manager.id}>
                          {manager.username}
                        </option>
                      );
                    })}
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
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};
