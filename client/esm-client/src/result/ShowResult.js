import React from "react";
import { Row, Col, Card, Typography, Progress, Divider } from "antd";
import { connect } from "react-redux";
import Chart from "react-google-charts";
import "./ShowResult.css";

const { Title, Text } = Typography;

function ShowResult(props) {
  const { testName, date } = props.selectedTest;
  const testInfo = props.selectedTest[0];
  
  // Extract test data with fallbacks
  const {
    correct: marks = 0,
    wrong: wrongAnswers = 0,
    submitMinutes = 'XX',
    totalMarks = 100
  } = testInfo || {};
  
  const totalAttempt = marks + wrongAnswers;
  const submitDate = new Date(date);
  const scorePercentage = Math.floor((marks / totalMarks) * 100);
  const attemptedPercentage = Math.floor((totalAttempt / totalMarks) * 100);
  const correctPercentage = Math.floor((marks / totalMarks) * 100);

  return (
    <div className="result-container">
      <Row justify="center">
        <Col xs={24} md={18} lg={14}>
          <Card className="result-card">
            <Title level={3} className="result-title">Test Results</Title>
            
            <div className="result-meta">
              <div className="meta-item">
                <Text strong>Test Name:</Text>
                <Text>{testName || 'N/A'}</Text>
              </div>
              <div className="meta-item">
                <Text strong>Given Time:</Text>
                <Text>{submitMinutes} minutes</Text>
              </div>
              <div className="meta-item">
                <Text strong>Submission Date:</Text>
                <Text>{submitDate.toLocaleDateString("en-US")}</Text>
              </div>
            </div>
            
            <Divider className="result-divider" />
            
            <div className="score-section">
              <Title level={4} className="section-title">Your Score</Title>
              <Progress 
                percent={scorePercentage} 
                status="active" 
                strokeColor="#52c41a"
                format={percent => `${percent}%`}
              />
              <Text className="score-text">
                {marks} out of {totalMarks} points
              </Text>
            </div>
            
            <div className="chart-section">
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <div className="chart-container">
                    <Chart
                      width={"100%"}
                      height={"300px"}
                      chartType="PieChart"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ["Result", "Value"],
                        ["Correct", marks],
                        ["Wrong", wrongAnswers],
                      ]}
                      options={{
                        title: "Answer Distribution",
                        pieHole: 0.45,
                        colors: ['#52c41a', '#ff4d4f'],
                        legend: { position: 'bottom' }
                      }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div className="stats-container">
                    <div className="stat-item">
                      <Title level={5}>Attempted Questions</Title>
                      <Progress 
                        percent={attemptedPercentage} 
                        status="active"
                        strokeColor="#1890ff"
                      />
                      <Text>{totalAttempt} of {totalMarks}</Text>
                    </div>
                    <div className="stat-item">
                      <Title level={5}>Correct Answers</Title>
                      <Progress 
                        percent={correctPercentage} 
                        status="active"
                        strokeColor="#52c41a"
                      />
                      <Text>{marks} of {totalMarks}</Text>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedTest: state.selectedTest.selectedTestResultData,
});

export default connect(mapStateToProps)(ShowResult);