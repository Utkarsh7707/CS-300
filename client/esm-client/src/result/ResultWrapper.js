import React from "react";
import { Row, Col, Card, Typography } from "antd";
import { connect } from "react-redux";
import SelectTest from "./SelectTest";
const { Title } = Typography;

function ResultWrapper({ profileID }) {
  return (
    <div className="result-wrapper-container">
      <Row justify="center">
        <Col xs={24} sm={22} md={18} lg={16} xl={14}>
          <Card
            bordered={false}
            className="result-wrapper-card"
            bodyStyle={{ padding: "2rem" }}
          >
            <Title level={3} className="result-wrapper-title">
              Select a Test
            </Title>
            <SelectTest profileID={profileID} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  profileID: state.auth.user ? state.auth.profileID : null,
});

export default connect(mapStateToProps)(ResultWrapper);
