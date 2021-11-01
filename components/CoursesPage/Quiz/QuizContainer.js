import { Form, Formik } from "formik";
import { useTimer } from "react-timer-hook";
import ActionButtonWithIcon from "../../Common/Buttons/ActionButtonWithIcon";
const QuizContainer = ({ expiryTimestamp, children, questions }) => {
  const handleQuizSubmission = (values, { setSubmitting }) => {
    console.log(values);
  };

  return (
    <div>
      <Formik
        initialValues={getFormValues(questions)}
        onSubmit={(values, { setSubmitting }) => {
          handleQuizSubmission(values, { setSubmitting });
        }}
      >
        <Form>
          {children}
          <ActionButtonWithIcon
            externalStyles={"mt-2"}
            text={"Submit Quiz"}
            action={handleQuizSubmission}
          />
        </Form>
      </Formik>
    </div>
  );
};

export default QuizContainer;
