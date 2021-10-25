import ActionButtonWithIcon from "../../Common/Buttons/ActionButtonWithIcon";
import { useState } from "react";
import QuizContainer from "./QuizContainer";
import QuizMCQ from "./QuizMCQ";
const QuizStartPage = ({ quiz }) => {
  const handleStart = () => {
    setStartQuiz(renderQuiz(quiz));
  };

  const [startQuiz, setStartQuiz] = useState(
    <div>
      <p>Quiz Timelimit: {quiz.limit}</p>
      <ActionButtonWithIcon text="Start" isSecondary action={handleStart} />
    </div>
  );

  const renderQuiz = ({ quiz }) => {
    return (
      <div>
        <QuizContainer expiryTimestamp={3000} questions={quiz.questions}>
          <QuizMCQ
            answersArray={[
              { id: 1, answer: "Hello world" },
              { id: 2, answer: "Hello" },
              { id: 3, answer: "world" },
            ]}
            question={{ id: 1, question: "Basic question" }}
          />
        </QuizContainer>
      </div>
    );
  };

  return <div>{startQuiz}</div>;
};

export default QuizStartPage;
