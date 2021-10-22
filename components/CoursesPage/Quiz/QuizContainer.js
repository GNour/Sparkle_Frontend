import { useTimer } from "react-timer-hook";
import ActionButtonWithIcon from "../../Common/Buttons/ActionButtonWithIcon";
const QuizContainer = ({ expiryTimestamp, children }) => {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  const handleQuizSubmission = () => {
    console.log("Handle");
  };

  return (
    <div>
      {children}
      <ActionButtonWithIcon
        externalStyles={"mt-2"}
        text={"Submit Quiz"}
        action={handleQuizSubmission}
      />
    </div>
  );
};

export default QuizContainer;
