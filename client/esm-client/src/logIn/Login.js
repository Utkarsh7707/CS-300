import { Form, Input, Button, Typography, Card } from "antd";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import "./Login.css";

const { Title, Text } = Typography;

function Login(props) {
  const history = useHistory();
  const { isLoading, isAuthenticated } = props;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  const submitForm = (values) => {
    props.sendLoginRequest(values);
  };

  return (
    <div className="login-container">
      <Card className="login-card" bordered={false}>
        {/* Logo and Branding */}
        <div className="login-branding">
          <div className="logo-circle">
            <span className="logo-icon ">🎓</span>
          </div>
          <Title level={2} className="login-brand-name">
            EMS
            <Text type="secondary" className="login-brand-subtext">
              Examination Management System
            </Text>
          </Title>
        </div>

        <Title level={4} className="login-title">Welcome Back</Title>
        <Text type="secondary" className="login-subtitle">
          Sign in to continue to your account
        </Text>
        
        <Form layout="vertical" onFinish={submitForm} className="login-form">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              block
              loading={isLoading}
              htmlType="submit"
              className="login-button"
            >
              {isLoading ? "Logging In..." : "Sign In"}
            </Button>
          </Form.Item>
        </Form>
        
        <Text className="login-footer">
          New here? <Link to="/signup">Create an account</Link>
        </Text>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  sendLoginRequest: (values) => dispatch(loginUser(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);