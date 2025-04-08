import React, { useEffect } from "react";
import { Card, List, Typography, Skeleton } from "antd";
import { HiOutlineClipboardList, HiClipboardCheck } from "react-icons/hi";
import { fetchAttemptTests } from "../actions/testActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./ResultCard.css";

const { Text, Title } = Typography;

function ResultCard(props) {
  const { tests, isLoading, profileID, trimLength } = props;

  useEffect(() => {
    if (profileID) {
      props.fetchTests(profileID);
    }
  }, [profileID]);

  const processedTests = tests
    ? (tests.length > trimLength
        ? tests.slice(-trimLength).reverse()
        : [...tests].reverse())
    : [];

  return (
    <div className="result-card">
      <div className="card-header">
        <HiOutlineClipboardList className="header-icon" />
        <Title level={5} className="header-title">Recent Results</Title>
      </div>

      <div className="card-content">
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : processedTests.length > 0 ? (
          <List
            dataSource={processedTests}
            renderItem={(test, index) => (
              <List.Item className="result-item">
                <Link to="/result" className="result-link">
                  <div className="result-content">
                    <div className="result-index">
                      <Text strong>{index + 1}</Text>
                    </div>
                    <Text ellipsis className="result-name">{test.testName}</Text>
                    <HiClipboardCheck className="result-icon" />
                  </div>
                </Link>
              </List.Item>
            )}
          />
        ) : (
          <div className="empty-state">
            <Text type="secondary">No recent test results</Text>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.tests.isLoadingAttemptedTest,
  tests: state.tests.attemptedTest,
  profileID: state.auth.profileID, // ✅ RESTORED
});

const mapDispatchToProps = (dispatch) => ({
  fetchTests: (profileID) => dispatch(fetchAttemptTests(profileID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultCard);
