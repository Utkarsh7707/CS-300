import React, { useEffect } from "react";
import { fetchTests, fetchAttemptTests } from "../actions/testActions";
import { selectedTest } from "../actions/selectActions";
import { connect } from "react-redux";
import "./SelectTest.css";
import TestList from "./TestList";

function SelectTest(props) {
  const { tests, studentClassName, section, profileID } = props;

  const handleSelectedTest =(testData)=>{
      props.selectedTest(testData);
  }

  useEffect(() => {
    props.fetchTests(studentClassName, section);
    props.fetchAttemptTests(profileID);
  }, [studentClassName, section, profileID]);


  return (
    <>
      <div className="select__test__container">
       <TestList tests={tests} handleSelectedTest={handleSelectedTest} /> 
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tests: state.tests.test,
    profileID: state.auth.profileID,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchTests: (className, section) => dispatch(fetchTests(className, section)),
    fetchAttemptTests: (profileID) => dispatch(fetchAttemptTests(profileID)),
    selectedTest: (testData) =>dispatch(selectedTest(testData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectTest);
