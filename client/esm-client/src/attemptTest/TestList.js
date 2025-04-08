import React, { useState, useEffect } from "react";
import { Button, Card, Typography, Skeleton, Input } from "antd";
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
      ));
    }
  }, [searchTerm, tests]);

  const handleContinue = () => {
    if (selectedTest) {
      props.handleSelectedTest(selectedTest);
      history.push("/test-instructions");
    }
  };

  const displayTests = searchTerm ? filteredTests : tests;

  return (
    <Card className="test-selection-card">
      <Title level={4} className="test-selection-title" >
        Available Tests
      </Title>
      
      <div className="search-container">
        <Text strong className="search-label">
          Search Tests
        </Text>
        <Input
          placeholder="Search by test name..."
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          className="search-input"
        />
      </div>

      <div className="test-list-container">
        <Text strong className="selection-label">
          Select Test
        </Text>
        
        {loading ? (
          <div className="skeleton-container">
            {[1, 2, 3].map((item) => (
              <div key={item} className="test-skeleton-item">
                <Skeleton.Avatar active size="default" shape="square" />
                <Skeleton.Input active size="default" />
              </div>
            ))}
          </div>
        ) : displayTests && displayTests.length > 0 ? (
          <div className="test-items-wrapper">
            {displayTests.map((test, index) => (
              <div
                key={index}
                className={`test-item ${selectedTest?.testName === test.testName ? 'selected' : ''}`}
                onClick={() => setSelectedTest(test)}
              >
                <Text className="test-name">{test.testName}</Text>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Text type="secondary">No tests available</Text>
          </div>
        )}
      </div>

      <div className="actions-container">
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
  );
}