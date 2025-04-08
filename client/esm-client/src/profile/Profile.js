import React, { Component } from "react";
import { Row, Col, Form, Input, Avatar, Popover, Typography, Card } from "antd";
import { connect } from "react-redux";
import "./Profile.css";
import { Roles } from "../Roles/roles";
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      phone: undefined,
      role: undefined,
      section: undefined,
      isVerified: undefined,
      className: undefined,
      avatarColor: "#1890ff"
    };
  }

  componentDidMount() {
    if (this.props.user) {
      this.generateAvatarColor();
    }
  }

  generateAvatarColor = () => {
    const name = `${this.props.user.firstName}${this.props.user.lastName}`;
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 50%)`;
    this.setState({ avatarColor: color });
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.user) return null;
    return {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      email: props.user.email,
      phone: props.user.phone,
      role: props.user.role,
      section: props.user.section,
      isVerified: props.user.isVerified,
      className: props.user.className
    };
  }

  render() {
    const { Text } = Typography;
    const { firstName, lastName, email, phone, role, section, className, isVerified, avatarColor } = this.state;

    const verifiedContent = (
      <div className="verified-popover">
        <CheckCircleFilled style={{ color: '#52c41a' }} /> Verified
      </div>
    );
    
    const notVerifiedContent = (
      <div className="not-verified-popover">
        <CloseCircleFilled style={{ color: '#ff4d4f' }} /> Not Verified
      </div>
    );

    const userInitials = firstName && lastName 
      ? `${firstName.charAt(0)}${lastName.charAt(0)}` 
      : "US";

    return (
      <div className="profile-container">
        <Card className="profile-card">
          <div className="profile-header">
            <div className="avatar-wrapper">
              <Avatar
                size={100}
                style={{ 
                  backgroundColor: avatarColor,
                  fontSize: "36px",
                  fontWeight: "bold",
                }}
                className="avatar-initials"
              >
                {userInitials}
              </Avatar>
              <Popover 
                content={isVerified ? verifiedContent : notVerifiedContent}
                placement="right"
              >
                <div className="verification-badge">
                  {isVerified ? (
                    <CheckCircleFilled style={{ color: '#52c41a', fontSize: '20px' }} />
                  ) : (
                    <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: '20px' }} />
                  )}
                </div>
              </Popover>
            </div>
            <Text className="profile-title">User Profile</Text>
            <Text type="secondary" className="profile-subtitle">View and manage your profile information</Text>
          </div>

          <Form className="profile-form" layout="vertical">
            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item label="First Name">
                  <Input
                    readOnly
                    value={firstName}
                    className="profile-input"
                    bordered={false}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Last Name">
                  <Input
                    readOnly
                    value={lastName}
                    className="profile-input"
                    bordered={false}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item label="Email">
                  <Input
                    readOnly
                    value={email}
                    className="profile-input"
                    bordered={false}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Phone">
                  <Input
                    readOnly
                    value={phone}
                    className="profile-input"
                    bordered={false}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item label="Role">
                  <Input
                    readOnly
                    value={role}
                    className="profile-input"
                    bordered={false}
                  />
                </Form.Item>
              </Col>
              {role === Roles.student && (
                <>
                  <Col xs={24} sm={6}>
                    <Form.Item label="Year">
                      <Input
                        readOnly
                        value={className}
                        className="profile-input"
                        bordered={false}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={6}>
                    <Form.Item label="Department">
                      <Input
                        readOnly
                        value={section}
                        className="profile-input"
                        bordered={false}
                      />
                    </Form.Item>
                  </Col>
                </>
              )}
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user || null
});

export default connect(mapStateToProps)(Profile);