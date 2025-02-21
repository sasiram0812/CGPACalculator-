import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SemesterInput from "./SemesterInput";
import CGPAResult from "./CGPAResult";
import StarBackground from "./StarBackground";
import "./App.css";

function App() {
  const [semesters, setSemesters] = useState([]);
  const [cgpa, setCgpa] = useState(null);
  const [loading, setLoading] = useState(true); // Initial page load spinner
  const [calculating, setCalculating] = useState(false); // CGPA calculation spinner

  // Simulate initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2-second delay for initial load
    return () => clearTimeout(timer);
  }, []);

  const addSemester = () => {
    setSemesters([...semesters, { id: semesters.length + 1, subjects: [] }]);
  };

  const removeSemester = (id) => {
    setSemesters(semesters.filter((sem) => sem.id !== id));
  };

  const calculateCGPA = () => {
    if (semesters.length === 0) return;

    setCalculating(true);
    setTimeout(() => {
      let totalGPA = 0;
      semesters.forEach((sem) => {
        let totalCredits = 0;
        let totalCP = 0;
        sem.subjects.forEach(({ credits, grade }) => {
          totalCredits += credits;
          totalCP += credits * grade;
        });

        let gpa = totalCP / totalCredits;
        totalGPA += gpa;
      });

      setCgpa(totalGPA / semesters.length);
      setCalculating(false);
    }, 2000); // Simulate a 2-second delay for CGPA calculation
  };

  const resetCGPA = () => {
    setCgpa(null);
  };

  return (
    <div className="app-container">
      {/* Starry Background */}
      <StarBackground />

      {/* Initial Page Load Spinner */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loading-spinner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="spinner"></div>
            <p>Loading...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!loading && (
        <motion.div
          className="content"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="title"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          >
            🌟 CGPA Calculator 🌟
          </motion.h1>
          <motion.p
            className="description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Calculate your CGPA easily by adding semesters and subjects. Track your academic progress!
          </motion.p>

          {/* Semester Inputs */}
          <AnimatePresence>
            {semesters.map((sem) => (
              <motion.div
                key={sem.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <SemesterInput
                  sem={sem}
                  updateSemester={(id, subjects) => {
                    const updated = semesters.map((sem) =>
                      sem.id === id ? { ...sem, subjects } : sem
                    );
                    setSemesters(updated);
                  }}
                  removeSemester={removeSemester}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Buttons */}
          <motion.div
            className="buttons-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <button className="btn add-btn" onClick={addSemester}>
              ➕ Add Semester
            </button>
            <button className="btn calculate-btn" onClick={calculateCGPA}>
              🧮 Calculate CGPA
            </button>
          </motion.div>

          {/* CGPA Calculation Spinner */}
          <AnimatePresence>
            {calculating && (
              <motion.div
                className="loading-spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="spinner"></div>
                <p>Calculating...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CGPA Result */}
          <AnimatePresence>
            {cgpa !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <CGPAResult cgpa={cgpa} resetCGPA={resetCGPA} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export default App;