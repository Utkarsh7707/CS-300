import React, { useEffect } from "react";
import { HiOutlineClipboardList, HiClipboardCheck } from "react-icons/hi";
import { fetchClasses } from "../../actions/classesActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton, Card, List, Typography, Badge } from "antd";
import "./Classes.css";

const { Text } = Typography;

function Classes(props) {
  let { classesList, isLoading, trimLength } = props;
  
  // Process and clean classes data
  const processedClasses = classesList ? classesList.map(cls => ({
    ...cls,
    className: cls.className.toString().replace(/[^0-9]/g, '') // Extract only numbers
  })) : [];

  // Reverse and trim if needed
  const displayedClasses = processedClasses.length > trimLength 
    ? processedClasses.slice(-trimLength).reverse()
    : processedClasses.slice().reverse();

  useEffect(() => {
    props.fetchClasses();
  }, []);

  return (
    <div className="classes-container">
      <div className="classes-header">
        <HiOutlineClipboardList className="header-icon" />
        <Text strong className="header-text">Recent Registered Batch</Text>
        {displayedClasses && (
          <Badge 
            count={displayedClasses.length} 
            style={{ backgroundColor: '#ff4d4f', marginLeft: 8 }} 
          />
        )}
      </div>

      <div className="classes-list-container">
        {!isLoading && displayedClasses ? (
          <List
            itemLayout="horizontal"
            dataSource={displayedClasses}
            renderItem={(cls, index) => (
              <Link to="/attempt-test" key={index}>
                <List.Item className="class-item">
                  <Card hoverable className="class-card">
                    <div className="class-content">
                      <div className="class-index">
                        <Text strong className="index-number">
                          {index + 1}
                        </Text>
                      </div>
                      <div className="class-details">
                        <Text strong ellipsis className="class-name">
                          Year {cls.className || 'N/A'}
                        </Text>
                        <Text type="secondary" className="section-info">
                          Section {cls.section || 'N/A'}
                        </Text>
                      </div>
                      <div className="class-icon">
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
  classesList: state.classesData.classes,
});

const mapDispatchToProps = (dispatch) => ({
  fetchClasses: () => dispatch(fetchClasses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Classes);