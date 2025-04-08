import React, { useEffect } from "react";
import { fetchAssignedTests } from "../../actions/TeacherActions";
import { selectedAssignedTest } from "../../actions/selectActions";
import { connect } from "react-redux";
import { Card, Typography, Skeleton } from "antd";
import TestList from "./TestList";
import "./SelectTest.css";

const { Text } = Typography;

function SelectTest(props) {
  const { tests, profileID, fetchTests, selectedTest, isLoading } = props;

  useEffect(() => {
    if (profileID) {
      fetchTests(profileID);
    }
  }, [profileID]);

  const handleSelectedTest = (testData) => {
    selectedTest(testData);
  };

  return (
    <Card className="test-selection-container">
      <div className="test-selection-header">
        <Text strong className="header-title">
          Select Test
        </Text>
        <Text type="secondary" className="header-subtitle">
          Choose a test to view details
        </Text>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      ) : (
        <TestList tests={tests} handleSelectedTest={handleSelectedTest} />
      )}
    </Card>
  );
}

const mapStateToProps = (state) => ({
  tests: state.teacher.assignedTests,
  isLoading: state.teacher.isLoading,
  profileID: state.auth.profileID, // Update this path according to your store
});

const mapDispatchToProps = (dispatch) => ({
  fetchTests: (profileID) => dispatch(fetchAssignedTests(profileID)),
  selectedTest: (testData) => dispatch(selectedAssignedTest(testData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectTest);