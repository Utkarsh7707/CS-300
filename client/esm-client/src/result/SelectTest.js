import React, { useEffect } from "react";
import { Card, Typography, Skeleton } from "antd";
import { fetchAttemptTests } from "../actions/testActions";
import { selectedTestResult } from "../actions/selectActions";
import { connect } from "react-redux";
import TestList from "./TestList";
import "./SelectTest.css";

const { Title } = Typography;

function SelectTest(props) {
  const { tests, profileID, isLoading } = props;

  const handleSelectedTest = (testData) => {
    props.selectedTest(testData);
  };

  useEffect(() => {
    if (profileID) {
      props.fetchTests(profileID);
    }
  }, [profileID]);

  return (
    <Card className="result-selection-card">
      <Title level={4} className="card-header">
        Test Results
      </Title>
      {isLoading ? (
        <div className="loading-state">
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      ) : (
        <TestList 
          tests={tests} 
          handleSelectedTest={handleSelectedTest} 
          loading={isLoading}
        />
      )}
    </Card>
  );
}

const mapStateToProps = (state) => ({
  tests: state.tests.attemptedTest,
  isLoading: state.tests.isLoadingAttemptedTest,
  profileID: state.auth.profileID,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTests: (profileID) => dispatch(fetchAttemptTests(profileID)),
  selectedTest: (testData) => dispatch(selectedTestResult(testData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectTest);