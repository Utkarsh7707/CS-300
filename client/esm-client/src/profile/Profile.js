import React, { Component } from "react";
import { Row, Col, Form, Input, Avatar, Popover, Typography } from "antd";
import { connect } from "react-redux";
import "./Profile.css";
import { Roles } from "../Roles/roles";

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
      avatarColor: "#1890ff" // Default color
    };
  }

  componentDidMount() {
    if (this.props.user) {
      this.generateAvatarColor();
    }
  }

  generateAvatarColor = () => {
    // Simple hash function to generate consistent color from user's name
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
      <div className="verified-popover">Verified!</div>
    );
    const notVerifiedContent = (
      <div className="not-verified-popover">Not Verified!</div>
    );

    const userInitials = firstName && lastName 
      ? `${firstName.charAt(0)}${lastName.charAt(0)}` 
      : "US";

    return (
      <div className="profile-container">
        <Row justify="center" align="middle">
          <Col xs={24} sm={22} md={18} lg={12} xl={10} className="profile-card">
            <div className="profile-header">
              <div className="avatar-wrapper">
                <Avatar
                  size={120}
                  style={{ 
                    backgroundColor: avatarColor,
                    fontSize: "48px",
                    fontWeight: "bold"
                  }}
                  className="avatar-initials"
                >
                  {userInitials}
                </Avatar>
                <Popover content={isVerified ? verifiedContent : notVerifiedContent}>
                  <img
                    src={isVerified ? "/verified.png" : "/notVerified.png"}
                    alt="verification"
                    className="verification-badge"
                  />
                </Popover>
              </div>
              <Text className="profile-title">Your Profile</Text>
            </div>

            <Form className="profile-form">
              <div className="name-fields">
                <Form.Item>
                  <Input
                    readOnly
                    value={firstName}
                    className="profile-input"
                    addonBefore="First Name"
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    readOnly
                    value={lastName}
                    className="profile-input"
                    addonBefore="Last Name"
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <Input
                  readOnly
                  value={email}
                  className="profile-input"
                  addonBefore="Email"
                />
              </Form.Item>

              <Form.Item>
                <Input
                  readOnly
                  value={phone}
                  className="profile-input"
                  addonBefore="Phone"
                />
              </Form.Item>

              <div className="role-fields">
                <Form.Item>
                  <Input
                    readOnly
                    value={role}
                    className="profile-input"
                    addonBefore="Role"
                  />
                </Form.Item>

                {role === Roles.student && (
                  <>
                    <Form.Item>
                      <Input
                        readOnly
                        value={className}
                        className="profile-input"
                        addonBefore="Class"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Input
                        readOnly
                        value={section}
                        className="profile-input"
                        addonBefore="Section"
                      />
                    </Form.Item>
                  </>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user || null
});

export default connect(mapStateToProps)(Profile);