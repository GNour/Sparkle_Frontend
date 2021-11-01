import styles from "./Quiz.module.scss";
import { useEffect, useState } from "react";
import TextInput from "../../Common/Inputs/TextInput";
import { Field } from "formik";
const QuizMCQ = ({ question, answersArray }) => {
  console.log(answersArray);

  const [value, setValue] = useState(null);
  return (
    <div className={`${styles.QuizMCQContainer} p-2 rounded shadow-sm`}>
      <label>{question.question}</label>
      {answersArray.map((answer, i) => {
        return (
          <div className="ms-2" key={"Answer" + question.id}>
            <Field type="radio" name={question.id} value={answer} />
            <label>{answer}</label>
          </div>
        );
      })}
    </div>
  );
};

export default QuizMCQ;
