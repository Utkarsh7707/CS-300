import React from "react";
import "./StudentStatus.css";

export default function StudentStatus({ student, testName, className, section }) {
  const percentage = Math.round((student.correct / student.totalMarks) * 100);
  
  // Determine performance level based on percentage
  const getPerformanceLevel = () => {
    if (percentage >= 90) return { label: "Excellent", color: "performance-excellent" };
    if (percentage >= 75) return { label: "Good", color: "performance-good" };
    if (percentage >= 60) return { label: "Average", color: "performance-average" };
    return { label: "Needs Improvement", color: "performance-needs-improvement" };
  };
  
  const performance = getPerformanceLevel();
  
  return (
    <div className="student-card">
      {/* Performance indicator strip */}
      <div className={`performance-strip ${performance.color}`}></div>
      
      <div className="card-content">
        {/* Header and Meta Info */}
        <div className="card-header">
          <h3 className="student-name">
            {student.firstName} {student.lastName}
          </h3>
          <span className="year-badge">
            Year {className}
          </span>
        </div>
        
        <p className="test-title">{testName}</p>
        
        {/* Percentage Circle */}
        <div className="percentage-container">
          <div className="percentage-circle">
            <svg viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                className="circle-bg"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                className={`circle-progress ${
                  percentage >= 75 ? "progress-high" : 
                  percentage >= 50 ? "progress-medium" : 
                  "progress-low"
                }`}
                strokeDasharray={`${percentage}, 100`}
              />
            </svg>
            <div className="percentage-value">
              <span>{percentage}%</span>
            </div>
          </div>
        </div>
        
        {/* Status */}
        <div className="performance-label-container">
          <span className={`performance-label ${
            percentage >= 75 ? "label-high" : 
            percentage >= 50 ? "label-medium" : 
            "label-low"
          }`}>
            {performance.label}
          </span>
        </div>
        
        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-item">
            <p className="stat-label">Total Marks</p>
            <p className="stat-value">{student.totalMarks}</p>
          </div>
          <div className="stat-item">
            <p className="stat-label">Obtained</p>
            <p className="stat-value">{student.correct}</p>
          </div>
          <div className="stat-item correct-stat">
            <p className="stat-label">Correct</p>
            <p className="stat-value correct-value">{student.correct}</p>
          </div>
          <div className="stat-item wrong-stat">
            <p className="stat-label">Wrong</p>
            <p className="stat-value wrong-value">{student.wrong}</p>
          </div>
        </div>
      </div>
    </div>
  );
}