import React, { useState, useEffect } from "react";
import {
  Typography,
  Form,
  Input,
  Button,
  Select,
  notification,
  Card
} from "antd";
import "./Signup.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUpUser, accountCreated } from "../actions/authActions";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;
const { Option } = Select;

function Signup(props) {
  const [showSelect, setShowSelect] = useState(false);
  const history = useHistory();
  const { isLoading, accountCreated } = props;

  const submitForm = (values) => {
    props.sendSignUpRequest(values);
  };

  const openNotification = () => {
    notification.success({
      message: "Account Created",
      description: "Congratulations! You are now part of our family. Please login to continue.",
      duration: 3,
    });
  };

  useEffect(() => {
    if (accountCreated) {
      openNotification();
      props.sendUserAccountCreated();
      setTimeout(() => history.push("/signin"), 3000);
    }
  }, [accountCreated]);

  const handleRoleChange = (value) => {
    setShowSelect(value === "student");
  };

  return (
    <div className="login-container">
      <Card className="login-card" bordered={false}>
        {/* Logo and Branding */}
        <div className="login-branding">
          <div className="logo-circle">
            <span className="logo-icon">🎓</span>
          </div>
          <Title level={2} className="login-brand-name">
            EMS
            <Text type="secondary" className="login-brand-subtext">
              Examination Management System
            </Text>
          </Title>
        </div>

        <Title level={4} className="login-title">Create Your Account</Title>
        <Text type="secondary" className="login-subtitle">
          Join us to get started
        </Text>
        
        <Form layout="vertical" onFinish={submitForm} className="login-form">
          <div className="name-fields">
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: "Please input your First Name!" }]}
            >
              <Input size="large" placeholder="First Name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: "Please input your Last Name!" }]}
            >
              <Input size="large" placeholder="Last Name" />
            </Form.Item>
          </div>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" }
            ]}
          >
            <Input size="large" placeholder="Email address" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" }
            ]}
          >
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please input your Phone Number!" },
              { pattern: /^[0-9]{10}$/, message: "Please enter a valid 10-digit number!" }
            ]}
          >
            <Input size="large" placeholder="Phone Number" maxLength={10} />
          </Form.Item>

          <Form.Item
            name="role"
            rules={[{ required: true, message: "Please select your role!" }]}
          >
            <Select 
              size="large" 
              placeholder="Select Role" 
              onChange={handleRoleChange}
            >
              <Option value="student">Student</Option>
              <Option value="teacher">Teacher</Option>
            </Select>
          </Form.Item>

          {showSelect && (
            <>
              <Form.Item
                name="className"
                rules={[{ required: true, message: "Please select your year!" }]}
              >
                <Select size="large" placeholder="Select Year">
                  <Option value="1">1st Year</Option>
                  <Option value="2">2nd Year</Option>
                  <Option value="3">3rd Year</Option>
                  <Option value="4">4th Year</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="section"
                rules={[{ required: true, message: "Please select your department!" }]}
              >
                <Select size="large" placeholder="Select Department">
                  <Option value="CSE">Computer Science</Option>
                  <Option value="ECE">Electronics</Option>
                </Select>
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button
              type="primary"
              size="large"
              block
              loading={isLoading}
              htmlType="submit"
              className="login-button"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </Form.Item>
          
          <Text className="login-footer">
            Already have an account? <Link to="/signin">Sign In</Link>
          </Text>
        </Form>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  accountCreated: state.auth.accountCreated,
});

const mapDispatchToProps = (dispatch) => ({
  sendSignUpRequest: (values) => dispatch(signUpUser(values)),
  sendUserAccountCreated: () => dispatch(accountCreated()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);