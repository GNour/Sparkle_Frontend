import styles from "./ContentCard.module.scss";
const ContentCard = ({
  icon,
  title,
  description,
  isCompleted,
  content,
  type,
  action,
}) => {
  const handleContentCardClick = (e) => {
    action(getRelatedComponent(type, content), {
      title: content.title,
      description: content.description,
      id: content.id,
      type: type,
    });
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
    </div>
  );
};

const getRelatedComponent = (type, content) => {
  if (type == "Article") {
    return (
      <div>
        <div className="pre-wrap mb-2">{content.body}</div>
      </div>
    );
  } else if (type == "Video") {
  } else if (type == "Quiz") {
  } else {
    return (
      <div className="text-muted text-center my-5">
        Choose from content to get started
      </div>
    );
  }
};

export default ContentCard;
