import React, { useState, useEffect } from "react";

import { db } from "./config/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

import CourseGoalList from "./components/CourseGoals/CourseGoalList/CourseGoalList";
import CourseInput from "./components/CourseGoals/CourseInput/CourseInput";
import "./App.css";

const App = () => {
  const [courseGoals, setCourseGoals] = useState([]);
  const getCourseGoals = async () => {
    const querySnapshot = await getDocs(collection(db, "coursegoals"));
    const loadedGoals = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCourseGoals(loadedGoals);
  };
  useEffect(() => {
    getCourseGoals();
  }, []);

  const addGoalHandler = (enteredText) => {
    setCourseGoals((prevGoals) => {
      const updatedGoals = [...prevGoals];
      updatedGoals.unshift({ text: enteredText });
      return updatedGoals;
    });
  };

  const deleteItemHandler = (goalId) => {
    setCourseGoals((prevGoals) => {
      const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
      deleteDoc(doc(db, "coursegoals", goalId));
      return updatedGoals;
    });
  };

  let content = (
    <p style={{ textAlign: "center" }}>No goals found. Maybe add one?</p>
  );

  if (courseGoals.length > 0) {
    content = (
      <CourseGoalList
        items={courseGoals}
        onDeleteItem={deleteItemHandler}
      />
    );
  }

  return (
    <div>
      <section id="goal-form">
        <CourseInput
          onAddGoal={addGoalHandler}
          getCourseGoals={getCourseGoals}
        />
      </section>
      <section id="goals">
        {content}
        {/* {courseGoals.length > 0 && (
          <CourseGoalList
            items={courseGoals}
            onDeleteItem={deleteItemHandler}
          />
        ) // <p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
        } */}
      </section>
    </div>
  );
};

export default App;
