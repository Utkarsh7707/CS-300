import React, { useState, useEffect } from "react";
import { Button, Card, List, Typography, Skeleton, Input } from "antd";
import { useHistory } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import "./TestList.css";

const { Text, Title } = Typography;

export default function TestList(props) {
  const history = useHistory();
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTest, setSelectedTest] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.tests) {
      setTests([...props.tests].reverse());
      setLoading(false);
    }
  }, [props.tests]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredTests(
        tests.filter(test => 
          test.testName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredTests([]);
    }
  }, [searchTerm, tests]);

  const handleContinue = () => {
    if (selectedTest) {
      props.handleSelectedTest(selectedTest);
      history.push(`/result/${selectedTest.testName?.replace(/\s+/g, "-").toLowerCase()}`);
    }
  };

  const displayTests = searchTerm ? filteredTests : tests;

  return (
    <Card className="attempted-tests-card">
      <Title level={4} className="card-title">Attempted Tests</Title>
      
      <div className="search-section">
        <Text strong className="section-label">Search Test</Text>
        <Input
          placeholder="Search by test name..."
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          className="search-input"
        />
      </div>

      <div className="selection-section">
        <Text strong className="section-label">Select Test</Text>
        
        {loading ? (
          <div className="skeleton-container">
            {[1, 2, 3].map((item) => (
              <Skeleton 
                key={item} 
                active 
                avatar={{ shape: 'square' }}
                paragraph={{ rows: 2 }}
                className="test-skeleton"
              />
            ))}
          </div>
        ) : displayTests.length > 0 ? (
          <List
            className="tests-list"
            dataSource={displayTests}
            renderItem={(test, index) => (
              <List.Item
                className={`test-item ${selectedTest?.testName === test.testName ? 'selected' : ''}`}
                onClick={() => setSelectedTest(test)}
              >
                <div className="test-content">
                  <Text strong className="test-name">{test.testName}</Text>
                  <div className="test-dates">
                    <Text type="secondary" className="test-date">
                      Published: Feb 25 2025 12:14PM
                    </Text>
                    <Text type="secondary" className="test-date">
                      Attempted: Feb 28 2025 11:50PM
                    </Text>
                  </div>
                </div>
              </List.Item>
            )}
          />
        ) : (
          <div className="empty-state">
            <Text type="secondary">No attempted tests found</Text>
          </div>
        )}
      </div>

      <div className="actions-section">
        <Button 
          type="primary" 
          onClick={handleContinue}
          disabled={!selectedTest}
          className="continue-button"
          size="large"
        >
          View Results
        </Button>
      </div>
    </Card>
  );
}