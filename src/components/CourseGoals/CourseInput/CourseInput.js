import React, { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

import Button from "../../UI/Button/Button";
import "./CourseInput.css";

const CourseInput = (props) => {
  const [text, setEnteredText] = useState("");

  const goalInputChangeHandler = (event) => {
    setEnteredText(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const docRef = await addDoc(collection(db, "coursegoals"), {
      text,
    });
    props.onAddGoal(text);
    props.getCourseGoals();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="form-control">
        <label>Course Goal</label>
        <input
          type="text"
          onChange={goalInputChangeHandler}
        />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
