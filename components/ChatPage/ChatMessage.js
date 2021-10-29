import styles from "./Chat.module.scss";
const ChatMessage = ({ type, content }) => {
  return (
    <div
      className={`mb-3 d-flex 
      flex-row${type == "sent" ? "-reverse" : null} 
      align-items-end`}
    >
      <div className={`max-width-70 ${type == "sent" ? "text-right" : null}`}>
        <div className="mb-1">
          <small className="text-muted">
            {"@" +
              content.from.username +
              " " +
              new Date(content.created_at).toLocaleTimeString()}
          </small>
        </div>
        <div
          className={`card border-0 p-3 ${styles.ChatMessageContent} ${
            type == "sent"
              ? styles.ChatMessageContentSent
              : styles.ChatMessageContentReceived
          }`}
        >
          <div>{content.message}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
