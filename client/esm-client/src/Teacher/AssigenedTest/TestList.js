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
  const [loading, setLoading] = useState(true);

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTestSelect = (test) => {
    setSelectedTest(test);
  };

  const handleContinue = () => {
    if (selectedTest) {
      props.handleSelectedTest(selectedTest);
      history.push(
        `/test-status/${selectedTest.testName
          ?.replace(/\s+/g, "-")
          .toLowerCase()}`
      );
    }
  };

  const displayTests = searchTerm ? filteredTests : tests;

  return (
    <div className="test-list-container">
      <Card className="test-list-card">
        <Title level={4} className="test-list-title">
          Assigned Tests
        </Title>
        
        <div className="test-search-container">
          <Text strong className="search-label">
            Search Tests
          </Text>
          <Input
            placeholder="Search test by name..."
            prefix={<SearchOutlined />}
            onChange={handleSearch}
            allowClear
            className="test-search-input"
          />
        </div>

        <div className="test-selection-container">
          <Text strong className="selection-label">
            Select Test
          </Text>
          
          {loading ? (
            <div className="test-skeleton-container">
              {[1, 2, 3].map((item) => (
                <Skeleton 
                  key={item} 
                  active 
                  paragraph={{ rows: 1 }} 
                  className="test-skeleton" 
                />
              ))}
            </div>
          ) : displayTests.length > 0 ? (
            <List
              className="test-list"
              dataSource={displayTests}
              renderItem={(test, index) => (
                <List.Item
                  className={`test-item ${selectedTest?.testName === test.testName ? 'selected' : ''}`}
                  onClick={() => handleTestSelect(test)}
                >
                  <Text className="test-name">
                    {test.testName}
                  </Text>
                </List.Item>
              )}
            />
          ) : (
            <div className="no-tests-found">
              <Text type="secondary">No tests found</Text>
            </div>
          )}
        </div>

        <div className="test-list-actions">
          <Button 
            type="primary" 
            onClick={handleContinue}
            disabled={!selectedTest}
            className="continue-button"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
}