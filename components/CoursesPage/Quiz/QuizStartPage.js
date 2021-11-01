import ActionButtonWithIcon from "../../Common/Buttons/ActionButtonWithIcon";
import { useState } from "react";
import QuizContainer from "./QuizContainer";
import QuizMCQ from "./QuizMCQ";
import { Form, Formik } from "formik";
import { shuffleArray } from "../../../helpers/CourseHelper";
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

  const getLimitInSeconds = (limit) => {
    let ts = limit.split(":");
    return parseInt(ts[0] * 3600) + parseInt(ts[1] * 60) + parseInt(ts[2]);
  };

  const createAndShuffleAnswersArray = (questions) => {
    let answersArray = [];
    questions.forEach((question) => {
      answersArray.push(question.answer);
    });
    return shuffleArray(answersArray);
  };

  const renderQuiz = (quiz) => {
    let answersArray = createAndShuffleAnswersArray(quiz.questions);
    return (
      <div>
        <QuizContainer
          expiryTimestamp={getLimitInSeconds(quiz.limit)}
          questions={quiz.questions}
        >
          {quiz.questions.map((question) => {
            return (
              <QuizMCQ
                key={"question" + question.id}
                answersArray={answersArray}
                question={question}
              />
            );
          })}
        </QuizContainer>
      </div>
    );
  };

  return <div>{startQuiz}</div>;
};

export default QuizStartPage;
