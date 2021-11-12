import styles from "./ContentCard.module.scss";
import ReactPlayer from "react-player/youtube";
import QuizStartPage from "./Quiz/QuizStartPage";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../../stores/AuthContext";
const ContentCard = ({
  icon,
  title,
  description,
  isCompleted,
  content,
  type,
  action,
  forwardedRef,
  handleRemoveContent,
  sub,
}) => {
  const { user } = useAuth();

  const handleContentCardClick = (e) => {
    action(renderRelatedComponent(type, content), {
      title: content.title,
      description: content.description,
      id: content.id,
      type: type,
    });
  };

  // Each type have different components, This function is called on cardClick
  const renderRelatedComponent = (type, content) => {
    if (type == "Article") {
      return (
        <div ref={forwardedRef}>
          <div className="pre-wrap mb-2">{content.body}</div>
        </div>
      );
    } else if (type == "Video") {
      return (
        <ReactPlayer url={content.video} width="100%" ref={forwardedRef} />
      );
    } else if (type == "Quiz") {
      return <QuizStartPage quiz={content} />;
    } else {
      return (
        <div className="text-muted text-center my-5" ref={forwardedRef}>
          Choose from content to get started
        </div>
      );
    }
  };

  return (
    <div
      onClick={handleContentCardClick}
      className={`d-flex rounded p-1 mb-1 align-items-center ${
        styles.ContentCardContainer
      } ${isCompleted ? styles.ContentCardContainerCompleted : ""}`}
    >
      <div>{icon}</div>
      <div className="flex-fill ms-1 ">
        <p className="mb-0 text-md">{title}</p>
        <p className="mb-0 text-sm fw-light">{description}</p>
      </div>
      <p className="mb-0 text-sm fw-light float-end">{sub}</p>
      {handleRemoveContent && (
        <AiOutlineClose
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveContent(type, content.id);
          }}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
};

export default ContentCard;
