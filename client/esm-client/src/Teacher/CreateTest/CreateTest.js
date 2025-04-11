import React, { Component } from "react";
import { 
  Row, 
  Col, 
  Form, 
  Input, 
  Button, 
  Select, 
  notification,
  Card,
  Typography,
  Divider,
  Space,
  Spin
} from "antd";
import { connect } from "react-redux";
import Rules from "./Rules";
import Questions from "./Questions";
import RenderData from "./RenderData";
import { submitTest, testCreatedFalse } from "../../actions/TeacherActions";
import "./index.css";

const { Title, Text } = Typography;
const { Option } = Select;

class CreateTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: [],
      questions: [],
      isLoading: false,
      testCreated: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.testCreated !== state.testCreated) {
      return {
        isLoading: props.isLoading,
        testCreated: props.testCreated,
      };
    }
    return null;
  }

  submitForm = (values) => {
    const questions = this.state.questions.map(question => ({
      description: question.questionDescripiton,
      options: [
        { option: question.opiton1 },
        { option: question.opiton2 },
        { option: question.opiton3 },
        { option: question.opiton4 },
      ],
    }));

    const answers = this.state.questions.map(question => parseInt(question.answer));
    const { rules } = this.state;
    const { teacherID } = this.props;

    const testData = {
      teacherId: teacherID,
      ...values,
      rules,
      questions,
      answers,
    };

    this.props.submitTest(testData);
  };

  handleDeleteRule = (index) => {
    this.setState({
      rules: this.state.rules.filter((_, i) => i !== index),
    });
  };

  handleDeleteQuestion = (index) => {
    this.setState({
      questions: this.state.questions.filter((_, i) => i !== index),
    });
  };

  addRule = (value) => {
    this.setState(prevState => ({
      rules: [...prevState.rules, { value }],
    }));
  };

  addQuestion = (questionData) => {
    this.setState(prevState => ({
      questions: [...prevState.questions, questionData],
    }));
  };

  openNotification = () => {
    notification.success({
      message: "Test Created Successfully",
      description: "Your test has been created and is now available for students.",
      placement: 'topRight',
    });
    this.setState({
      rules: [],
      questions: [],
    });
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.testCreated && this.props.testCreated) {
      this.props.testCreatedFalse();
      this.openNotification();
    }
  }

  render() {
    const { isLoading, questions, rules } = this.state;

    return (
      <div className="create-test-container">
        <Row justify="center">
          <Col xs={24} md={20} lg={16}>
            <Card className="create-test-card">
              <Title level={3} className="create-test-title">
                <span className="title-icon">🎓</span> Create New Test
              </Title>
              
              <Form
                layout="vertical"
                className="create-test-form"
                onFinish={this.submitForm}
              >
                <div className="form-row">
                  <Form.Item
                    name="testName"
                    label="Test Name"
                    rules={[{ required: true, message: 'Please enter test name' }]}
                    className="form-item"
                  >
                    <Input placeholder="Enter test name" />
                  </Form.Item>

                  <Form.Item
                    name="outOfMarks"
                    label="Total Marks"
                    rules={[{ required: true, message: 'Please enter total marks' }]}
                    className="form-item"
                  >
                    <Input type="number" placeholder="Total marks" />
                  </Form.Item>
                </div>

                <div className="form-row">
                  <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true, message: 'Please enter category' }]}
                    className="form-item"
                  >
                    <Input placeholder="Test category" />
                  </Form.Item>

                  <Form.Item
                    name="minutes"
                    label="Duration (minutes)"
                    rules={[{ required: true, message: 'Please enter duration' }]}
                    className="form-item"
                  >
                    <Input type="number" placeholder="Test duration" />
                  </Form.Item>
                </div>

                <div className="form-row">
                  <Form.Item
                    name="className"
                    label="Class Year"
                    rules={[{ required: true, message: 'Please select class year' }]}
                    className="form-item"
                  >
                    <Select placeholder="Select class year">
                      <Option value="1">1st Year</Option>
                      <Option value="2">2nd Year</Option>
                      <Option value="3">3rd Year</Option>
                      <Option value="4">4th Year</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="section"
                    label="Department"
                    rules={[{ required: true, message: 'Please select department' }]}
                    className="form-item"
                  >
                    <Select placeholder="Select department">
                      <Option value="CSE">Computer Science</Option>
                      <Option value="ECE">Electronics</Option>
                    </Select>
                  </Form.Item>
                </div>

                <Divider orientation="left" className="section-divider">
                  <Text strong>Test Rules</Text>
                </Divider>
                
                <RenderData
                  ruleData={rules}
                  rules={true}
                  clickedRule={this.handleDeleteRule}
                />
                
                <Form.Item>
                  <Rules addRule={this.addRule} />
                </Form.Item>

                <Divider orientation="left" className="section-divider">
                  <Text strong>Test Questions</Text>
                </Divider>
                
                <RenderData
                  questionData={questions}
                  questions={true}
                  clickedRule={this.handleDeleteQuestion}
                />
                
                <Form.Item>
                  <Questions addQuestion={this.addQuestion} />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="submit-button"
                    loading={isLoading}
                    disabled={questions.length < 1}
                  >
                    {isLoading ? 'Creating Test...' : 'Create Test'}
                  </Button>
                  {questions.length < 1 && (
                    <Text type="secondary" className="minimum-questions">
                      Add at least one question to create test
                    </Text>
                  )}
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  teacherID: state.auth.profileID,
  isLoading: state.teacher.isLoadingTest,
  testCreated: state.teacher.testCreated,
});

const mapDispatchToProps = {
  submitTest,
  testCreatedFalse
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTest);