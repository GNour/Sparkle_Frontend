import styles from "./Quiz.module.scss";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useEffect, useState } from "react";
const QuizMCQ = ({ question, answersArray }) => {
  useEffect(() => {
    shuffleArray(answersArray);
  }, []);

  const [value, setValue] = useState(null);
  const handleChange = (value) => {
    setValue(value);
  };
  return (
    <div className={`${styles.QuizMCQContainer} p-2 rounded shadow-sm`}>
      <label>{question}</label>
      {answersArray.map((answer) => {
        return (
          <input key={answer.id} value={answer.id} onChange={handleChange}>
            {answer.answer}
          </input>
        );
      })}
    </div>
  );
};

const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

export default QuizMCQ;
