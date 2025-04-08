import React from "react";
import { Row, Col } from "antd";
import Classes from "./Classes";
import AssignedTests from "./AssignedTests";
import "./Dashboard.css";

function Dashboard(props) {
  const trimLength = 8;

  return (
    <div className="dashboard-container">
      
      
      <div className="dashboard-content">
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} sm={24} md={12} lg={10} xl={10}>
            <div className="dashboard-card">
              <h2 className="card-title">Assigned Tests</h2>
              <AssignedTests trimLength={trimLength} />
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10} xl={10}>
            <div className="dashboard-card">
              <h2 className="card-title">Classes</h2>
              <Classes trimLength={trimLength} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Dashboard;