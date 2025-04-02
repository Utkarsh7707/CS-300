import React from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import SelectTest from "./SelectTest";

function AttemptTest(props) {
  const { studentClassName, section } = props;
  return (
    <>
      <div className="container dashboard">
        <Row gutter={[48, 10]} justify="center">
          <Col className="gutter-row" xs={24} sm={24} md={14} xl={14}>
            <SelectTest studentClassName={studentClassName} section={section} />
          </Col>
        </Row>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    studentClassName: state.auth.user ? state.auth.user.className : null,
    section: state.auth.user ? state.auth.user.section : null,
  };
};

export default connect(mapStateToProps, null)(AttemptTest);
