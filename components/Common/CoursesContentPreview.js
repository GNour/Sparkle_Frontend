import { AiOutlineClose } from "react-icons/ai";
const CoursesContentPreview = ({
  title,
  icon,
  handleRemoveContent,
  contentId,
}) => {
  return (
    <div className="custom-container-sub p-2">
      <div className="d-flex justify-content-between align-items-center">
        <div>{icon}</div>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default CoursesContentPreview;
