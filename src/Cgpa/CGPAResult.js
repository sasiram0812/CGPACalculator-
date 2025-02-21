import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import "./Animations.css";

function CGPAResult({ cgpa, resetCGPA }) {
  useEffect(() => {
    if (cgpa !== null) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [cgpa]);

  return (
    <motion.div
      className="cgpa-result"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Your CGPA: <span className="cgpa-value">{cgpa.toFixed(2)}</span></h2>
      <button className="reset-btn" onClick={resetCGPA}>
        🔄 Reset CGPA
      </button>
    </motion.div>
  );
}

export default CGPAResult;