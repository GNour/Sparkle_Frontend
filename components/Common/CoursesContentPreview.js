import { AiOutlineClose } from "react-icons/ai";
const CoursesContentPreview = ({ title, icon, action }) => {
  return (
    <div className="custom-container-sub p-2">
      <div className="d-flex justify-content-between align-items-center">
        <div>{icon}</div>
        <span>{title}</span>
        <AiOutlineClose
          onClick={() => console.log("Delete")}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default CoursesContentPreview;
