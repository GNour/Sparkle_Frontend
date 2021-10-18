import { Button } from "@material-ui/core";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { BsPersonCheckFill } from "react-icons/bs";
import { MdAssignmentInd } from "react-icons/md";
import IconText from "../../IconText";
import InfoActionsFooter from "../../InfoActionsFooter";
import InfoBody from "../../InfoBody";
import styles from "./TaskCard.module.scss";
const TaskCard = ({ task }) => {
  console.log(task);
  return (
    <div className={`${styles.TaskCardContainer}`}>
      <InfoBody
        cornerText="deadline: 2020-01-01"
        title="Clean Tables"
        subTitle="@johnny"
        body="Please clean all tables ASAP, and be carefull while going to store IT's SLIPPERY..."
      />
      {getCardFooter(task.status, task.id)}
    </div>
  );
};

const getCardFooter = (status, id) => {
  if (status == 1) {
    return (
      <InfoActionsFooter
        icons={[
          <IconText
            key="completed"
            icon={<MdAssignmentInd />}
            style="me-2"
            text="25"
          />,
          <IconText
            key="uncompleted"
            icon={<BsPersonCheckFill />}
            style="me-2"
            text="5"
          />,
        ]}
        actions={[
          <Button
            key="1"
            size="sm"
            variant="outlined"
            startIcon={<AiOutlineClose />}
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
          <Button key="1" variant="outlined" startIcon={<AiOutlinePlus />}>
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
          <Button key="1" variant="outlined" startIcon={<AiOutlinePlus />}>
            Reassign
          </Button>,
        ]}
      />
    );
  }
};

export default TaskCard;