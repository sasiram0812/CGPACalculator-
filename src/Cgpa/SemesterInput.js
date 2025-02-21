import React, { useState } from "react";
import { motion } from "framer-motion";
import "./SemesterInput.css";

function SemesterInput({ sem, updateSemester, removeSemester }) {
  const [subjects, setSubjects] = useState([]);

  const addSubject = () => {
    setSubjects([...subjects, { id: subjects.length + 1, credits: 0, grade: 0 }]);
  };

  const removeSubject = (id) => {
    setSubjects(subjects.filter((sub) => sub.id !== id));
    updateSemester(sem.id, subjects.filter((sub) => sub.id !== id));
  };

  const updateSubject = (index, key, value) => {
    const updated = [...subjects];
    updated[index][key] = parseFloat(value);
    setSubjects(updated);
    updateSemester(sem.id, updated);
  };

  return (
    <motion.div
      className="semester-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Semester {sem.id}</h2>
      {subjects.map((sub, index) => (
        <motion.div
          key={sub.id}
          className="subject-row"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <input
            type="number"
            placeholder="Credits"
            min="0"
            step="0.5"
            onChange={(e) => updateSubject(index, "credits", e.target.value)}
            className="subject-input"
          />
          <input
            type="number"
            placeholder="Grade"
            min="0"
            max="10"
            step="0.1"
            onChange={(e) => updateSubject(index, "grade", e.target.value)}
            className="subject-input"
          />
          <button className="remove-btn" onClick={() => removeSubject(sub.id)}>
            ❌
          </button>
        </motion.div>
      ))}
      <div className="button-group">
        <button className="add-subject-btn" onClick={addSubject}>
          ➕ Add Subject
        </button>
        <button className="remove-semester-btn" onClick={() => removeSemester(sem.id)}>
          🗑 Remove Semester
        </button>
      </div>
    </motion.div>
  );
}

export default SemesterInput;