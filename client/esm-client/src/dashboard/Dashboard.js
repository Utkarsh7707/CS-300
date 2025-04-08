import React from "react";
import { Row, Col, Card } from "antd";
import { connect } from "react-redux";
import TestCard from "./TestCard";
import ResultCard from "./ResultCard";
import "./Dashboard.css";

function Dashboard(props) {
  const { studentClassName, section, profileID } = props;
  const trimLength = 8;

  return (
    <div className="dashboard-container">
      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} sm={24} md={12} lg={10} xl={10}>
          <Card className="dashboard-card">
            <TestCard
              studentClassName={studentClassName}
              section={section}
              trimLength={trimLength}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={10} xl={10}>
          <Card className="dashboard-card">
            <ResultCard trimLength={trimLength} profileID={profileID} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  studentClassName: state.auth.user?.className || null,
  section: state.auth.user?.section || null,
  profileID: state.auth.user?.profileID || null,
});

export default connect(mapStateToProps)(Dashboard);