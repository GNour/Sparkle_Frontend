import styles from "./Quiz.module.scss";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import TextInput from "../../Common/Inputs/TextInput";
const QuizMCQ = ({ question, answersArray }) => {
  useEffect(() => {
    shuffleArray(answersArray);
  }, []);

  const [value, setValue] = useState(null);
  return (
    <div className={`${styles.QuizMCQContainer} p-2 rounded shadow-sm`}>
      <label>{question.question}</label>
      {answersArray.map((answer) => {
        return (
          <TextInput
            key={answer.id}
            placeholder={`First Name`}
            label={`First Name`}
            value={answer.id}
            name={question.id}
            type="radio"
          />
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
