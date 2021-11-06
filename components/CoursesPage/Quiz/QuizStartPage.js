import ActionButtonWithIcon from "../../Common/Buttons/ActionButtonWithIcon";
import { useRef, useState } from "react";
import QuizContainer from "./QuizContainer";
import QuizMCQ from "./QuizMCQ";
import { Form, Formik } from "formik";
import { shuffleArray } from "../../../helpers/CourseHelper";
import TextInput from "../../Common/Inputs/TextInput";
import { useTimer } from "react-timer-hook";
import { useAuth } from "../../../stores/AuthContext";
import axiosConfig from "../../../helpers/axiosConfig";
import { mutate } from "swr";
const QuizStartPage = ({ quiz }) => {
  const getLimitInSeconds = (limit) => {
    let ts = limit.split(":");
    const date = new Date();
    return date.setSeconds(
      date.getSeconds() +
        parseInt(ts[0] * 3600) +
        parseInt(ts[1] * 60) +
        parseInt(ts[2])
    );
  };

  const { user } = useAuth();

  const { start, isRunning } = useTimer({
    autoStart: false,
    expiryTimestamp: getLimitInSeconds(quiz.limit),
    onExpire: () =>
      handleQuizSubmission(formRef.current.values, {
        setSubmitting: formRef.current.setSubmitting,
      }),
  });

  const handleStart = async () => {
    if (user.role == "Manager") {
      setStartQuiz(RenderAdminPreview(quiz));
    } else {
      await axiosConfig
        .put("course/quiz/take/" + quiz.id)
        .then((res) => {
          setStartQuiz(RenderQuiz(quiz));
          start();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const formRef = useRef(null);
  const [startQuiz, setStartQuiz] = useState(
    <div>
      {quiz.user.length && quiz.user[0].details.completed ? (
        <div className="d-flex justify-content-center">
          <p className="fw-bold text-sm text-muted">{`You marked ${quiz.user[0].details.grade}`}</p>
        </div>
      ) : (
        <div>
          <p className="fw-bold text-sm text-muted float-end">
            Quiz Timelimit: {quiz.limit}
          </p>
          <p>
            {user.role == "Manager"
              ? "Preview Quiz ?"
              : "Confirm by pressing Start button"}
          </p>
          <ActionButtonWithIcon
            text={user.role == "Manager" ? "Preview" : "Start"}
            isSecondary
            action={handleStart}
          />
        </div>
      )}
    </div>
  );

  const createAndShuffleAnswersArray = (questions) => {
    let answersArray = [];
    questions.forEach((question) => {
      answersArray.push(question.answer);
    });
    return shuffleArray(answersArray);
  };

  const getFormValues = (questions) => {
    let data = {};
    questions.forEach((question) => {
      data[question.id] = "";
    });
    return data;
  };

  const handleQuizSubmission = async (values, { setSubmitting }) => {
    let grade = 0;
    quiz.questions.forEach((question) => {
      if (values[question.id].toLowerCase() == question.answer.toLowerCase()) {
        grade += 100;
      }
    });

    grade = grade / quiz.questions.length;
    await axiosConfig
      .put("course/quiz/complete/" + quiz.id, {
        grade,
      })
      .then((res) => {
        setStartQuiz(
          <div className="d-flex justify-content-center">
            <p className="fw-bold text-sm text-muted">{res.data.message}</p>
          </div>
        );
        mutate("course/show/" + quiz.course_id);
      });
  };

  const RenderQuiz = (quiz, limit) => {
    return (
      <div>
        <Formik
          innerRef={formRef}
          initialValues={getFormValues(quiz.questions)}
          onSubmit={(values, { setSubmitting }) => {
            handleQuizSubmission(values, { setSubmitting });
          }}
        >
          {(form) => {
            return (
              <Form>
                {quiz.questions.map((question) => {
                  return (
                    <TextInput
                      key={"question" + question.id}
                      placeholder={"Your answer"}
                      label={question.question}
                      externalStyles="mb-3"
                      name={question.id}
                      type="text"
                    />
                  );
                })}
                <ActionButtonWithIcon
                  externalStyles={"mt-2"}
                  text={"Submit Quiz"}
                  buttonType={"submit"}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  };

  const RenderAdminPreview = (quiz) => {
    return (
      <div className="d-flex flex-column">
        {quiz.questions.length > 0
          ? quiz.questions.map((question) => {
              return (
                <div key={"question" + question.id}>
                  <h6>Question: {question.question}</h6>
                  <p>Answer: {question.answer}</p>
                </div>
              );
            })
          : null}
      </div>
    );
  };

  return <div>{startQuiz}</div>;
};

export default QuizStartPage;
