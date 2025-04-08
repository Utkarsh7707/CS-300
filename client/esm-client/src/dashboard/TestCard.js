import React, { useEffect } from "react";
import { Card, List, Typography, Skeleton } from "antd";
import { HiOutlineClipboardList, HiClipboardCheck } from "react-icons/hi";
import { fetchTests } from "../actions/testActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./TestCard.css";

const { Text, Title } = Typography;

function TestCard(props) {
  const { tests, isLoading, studentClassName, section, trimLength } = props;

  useEffect(() => {
    props.fetchTests(studentClassName, section);
  }, [studentClassName, section]);

  const processedTests = tests
    ? tests.slice(0, trimLength).reverse()
    : [];

  return (
    <div className="test-card">
      <div className="card-header">
        <HiOutlineClipboardList className="header-icon" />
        <Title level={5} className="header-title">Today's Tests</Title>
      </div>
      
      <div className="card-content">
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : processedTests.length > 0 ? (
          <List
            dataSource={processedTests}
            renderItem={(test, index) => (
              <List.Item className="test-item">
                <Link to="/attempt-test" className="test-link">
                  <div className="test-content">
                    <div className="test-index">
                      <Text strong>{index + 1}</Text>
                    </div>
                    <Text ellipsis className="test-name">{test.testName}</Text>
                    <HiClipboardCheck className="test-icon" />
                  </div>
                </Link>
              </List.Item>
            )}
          />
        ) : (
          <div className="empty-state">
            <Text type="secondary">No tests scheduled for today</Text>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.tests.isLoadingTest,
  tests: state.tests.test,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTests: (className, section) => dispatch(fetchTests(className, section)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TestCard);