import Image from "next/image";
import styles from "./Chat.module.scss";
const ChatUserCard = ({ image, username, newMessagesCount, action }) => {
  return (
    <div
      className={`${styles.ChatUserCardContainer} cursor-pointer px-md-4 py-3 py-md-4`}
      onClick={() => action()}
    >
      <div className="d-flex">
        <Image
          src={image}
          className={`rounded-circle shadow-sm`}
          alt="UserProfile"
          height="60"
          width="60"
        />
        <div className="flex-fill align-self-center ms-3 text-truncate">
          <div className="d-flex justify-content-between mb-0">
            <span>{username}</span>
            {newMessagesCount ? (
              <small className="rounded p-1 bg-notification">
                {newMessagesCount}
              </small>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUserCard;
