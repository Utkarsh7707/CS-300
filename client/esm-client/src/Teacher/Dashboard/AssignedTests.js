import React, { useEffect } from "react";
import { HiOutlineClipboardList, HiClipboardCheck } from "react-icons/hi";
import { fetchTeacherTests } from "../../actions/testActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton, Card, List, Typography, Badge } from "antd";
import "./index.css";

const { Text } = Typography;

function AssignedTests(props) {
  let { tests, isLoading, profileID, trimLength } = props;
  
  // Process tests data
  if (tests) {
    tests = tests.length > trimLength 
      ? tests.slice(-trimLength).reverse() 
      : tests.slice().reverse(); // Show newest first
  }

  useEffect(() => {
    props.fetchTests(profileID);
  }, [profileID]);

  return (
    <div className="assigned-tests">
      <div className="assigned-tests-header">
        <HiOutlineClipboardList className="header-icon" />
        <Text strong className="header-text">Recently Assigned Tests</Text>
        {tests && (
          <Badge 
            count={tests.length} 
            style={{ backgroundColor: '#1890ff', marginLeft: 8 }} 
          />
        )}
      </div>

      <div className="tests-list-container">
        {!isLoading && tests ? (
          <List
            itemLayout="horizontal"
            dataSource={tests}
            renderItem={(test, index) => (
              <Link to="/assigned-test" key={index}>
                <List.Item className="test-item">
                  <Card hoverable className="test-card">
                    <div className="test-content">
                      <div className="test-index">
                        <Text strong className="index-number">
                          {index + 1}
                        </Text>
                      </div>
                      <div className="test-details">
                        <Text strong ellipsis className="test-name">
                          {test.testName}
                        </Text>
                        <Text type="secondary" className="class-info">
                          Year {test.className} • Section {}
                        </Text>
                      </div>
                      <div className="test-icon">
                        <HiClipboardCheck className="icon" />
                      </div>
                    </div>
                  </Card>
                </List.Item>
              </Link>
            )}
          />
        ) : (
          <div className="skeleton-container">
            {Array(trimLength).fill().map((_, i) => (
              <Card key={i} className="skeleton-card">
                <Skeleton 
                  active 
                  paragraph={{ rows: 1 }} 
                  title={false} 
                  avatar={{ shape: 'square' }}
                />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.tests.isLoadingTest,
  tests: state.tests.test,
  profileID: state.auth.profileID,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTests: (profileID) => dispatch(fetchTeacherTests(profileID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignedTests);