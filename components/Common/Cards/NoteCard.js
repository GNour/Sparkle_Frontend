import styles from "./NoteCard.module.scss";
const NoteCard = ({ title, description, isPositive }) => {
  return (
    <div
      className={`${
        isPositive
          ? `${styles.NoteCardContainerPositive}`
          : `${styles.NoteCardContainerNegative}`
      } ${styles.NoteCardContainer}  border-bottom ms-2`}
    >
      <div className="d-flex">
        <div className="flex-fill ms-3">
          <div className="mb-1">
            <strong>{title}</strong>
          </div>
          <span className="d-flex text-muted">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
