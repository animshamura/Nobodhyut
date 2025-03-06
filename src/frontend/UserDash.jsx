import React, { useState } from 'react';
import './UserDash.css';

function UserDash() {
  // Simulated progress data for each service
  const [foodProgress] = useState(50); // Percentage
  const [jobProgress] = useState(70);
  const [healthProgress] = useState(85);
  const [educationProgress] = useState(60);

  return (
    <div className="App">
      <header>
        <h1>Services Dashboard</h1>
      </header>

      <div className="dashboard">
        {/* Food Provision Card */}
        <div className="card">
          <h2>Food Provision</h2>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${foodProgress}%` }}
            ></div>
          </div>
          <p>{foodProgress}% Provided</p>
        </div>

        {/* Job Placement Card */}
        <div className="card">
          <h2>Job Placement</h2>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${jobProgress}%` }}
            ></div>
          </div>
          <p>{jobProgress}% Jobs Filled</p>
        </div>

        {/* Health Services Card */}
        <div className="card">
          <h2>Health Services</h2>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${healthProgress}%` }}
            ></div>
          </div>
          <p>{healthProgress}% Patients Treated</p>
        </div>

        {/* Education Courses Card */}
        <div className="card">
          <h2>Education Courses</h2>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${educationProgress}%` }}
            ></div>
          </div>
          <p>{educationProgress}% Courses Completed</p>
        </div>
      </div>

      {/* Progress Charts */}
      <div className="charts">
        <div className="chart-card">
          <h3>Food Provision Progress</h3>
          <div className="bar-chart">
            <div className="bar" style={{ height: `${foodProgress}%` }}></div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Job Placement Progress</h3>
          <div className="bar-chart">
            <div className="bar" style={{ height: `${jobProgress}%` }}></div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Health Services Progress</h3>
          <div className="bar-chart">
            <div className="bar" style={{ height: `${healthProgress}%` }}></div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Education Courses Progress</h3>
          <div className="bar-chart">
            <div className="bar" style={{ height: `${educationProgress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDash;
