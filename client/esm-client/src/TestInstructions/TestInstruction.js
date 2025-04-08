import React from "react";
import { useState } from "react";
import { Row, Col, Button, Card, Modal, Typography, Divider } from "antd";
import { connect } from "react-redux";
import { FaArrowCircleRight } from "react-icons/fa";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import "./TestInstruction.css";

const { Title, Text } = Typography;
const { confirm } = Modal;

function TestInstruction(props) {
  const history = useHistory();
  const { tests, selectedTest } = props;
  const {
    outOfMarks,
    questions,
    minutes,
    category,
    className,
    testName,
    rules,
    _id: testID,
  } = selectedTest;

  const [attempted, setAttempted] = useState(false);

  // Check if test was already attempted
  React.useEffect(() => {
    const isAttempted = tests.some(test => test.testName === testName);
    setAttempted(isAttempted);
  }, [tests, testName]);

  const handleStartTest = () => {
    confirm({
      title: "Are you ready to begin the test?",
      icon: <ExclamationCircleOutlined />,
      content: "The timer will start as soon as you click OK!",
      okText: "Start Test",
      cancelText: "Cancel",
      onOk() {
        history.push("/start-test");
      },
    });
  };

  return (
    <div className="test-instruction-container">
      <Card className="instruction-card">
        <Title level={2} className="main-title">Test Instructions</Title>
        
        <Row gutter={[32, 32]}>
          {/* Left Column - Test Info */}
          <Col xs={24} md={12}>
            <Card className="info-card">
              <Title level={4} className="section-title">Test Details</Title>
              
              <div className="test-info-grid">
                <div className="info-item">
                  <Text strong>Test Name:</Text>
                  <Text>{testName}</Text>
                </div>
                <div className="info-item">
                  <Text strong>Total Questions:</Text>
                  <Text>{questions?.length}</Text>
                </div>
                <div className="info-item">
                  <Text strong>Allocated Time:</Text>
                  <Text>{minutes} Minutes</Text>
                </div>
                <div className="info-item">
                  <Text strong>Category:</Text>
                  <Text>{category}</Text>
                </div>
                <div className="info-item">
                  <Text strong>Total Marks:</Text>
                  <Text>{outOfMarks}</Text>
                </div>
              </div>

              <Divider />

              <Title level={4} className="section-title">Test Rules</Title>
              <div className="rules-list">
                {rules?.map((rule, index) => (
                  <div key={index} className="rule-item">
                    <FaArrowCircleRight className="rule-icon" />
                    <Text className="rule-text">{rule.value}</Text>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          {/* Right Column - Navigation Guide */}
          <Col xs={24} md={12}>
            <Card className="navigation-card">
              <div className="logo-container">
                <img src="/ems-logo.png" alt="EMS Logo" className="ems-logo" />
              </div>

              <Title level={4} className="section-title">Navigation Guide</Title>
              
              <div className="button-guide">
                <div className="guide-item">
                  <Button type="primary" className="guide-button next-btn">
                    Next
                  </Button>
                  <Text className="guide-text">
                    Moves to the next question in the test
                  </Text>
                </div>
                
                <div className="guide-item">
                  <Button type="primary" className="guide-button prev-btn">
                    Previous
                  </Button>
                  <Text className="guide-text">
                    Returns to the previous question
                  </Text>
                </div>
                
                <div className="guide-item">
                  <Button type="primary" className="guide-button flag-btn">
                    Flag
                  </Button>
                  <Text className="guide-text">
                    Marks a question for review
                  </Text>
                </div>
                
                <div className="guide-item">
                  <Button type="primary" danger className="guide-button end-btn">
                    End Test
                  </Button>
                  <Text className="guide-text">
                    Submits your test for grading
                  </Text>
                </div>
              </div>

              <div className="start-button-container">
                <Button 
                  type="primary" 
                  size="large" 
                  onClick={handleStartTest}
                  disabled={attempted}
                  className="start-button"
                >
                  {attempted ? "Test Already Attempted" : "Begin Test"}
                </Button>
                {attempted && (
                  <Text type="secondary" className="attempted-notice">
                    You have already attempted this test
                  </Text>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedTest: state.selectedTest.selectedTestData,
  tests: state.tests.attemptedTest,
});

export default connect(mapStateToProps)(TestInstruction);