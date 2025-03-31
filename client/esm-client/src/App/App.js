import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "../logIn/Login";
import Signup from "../signUp/Signup";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import StudentDashboard from "../dashboard/Dashboard";
import TeacherDashboard from "../Teacher/Dashboard/Dashboard";
import AttemptTest from "../attemptTest/AttemptTest";
import Navbar from "../navbar";
import Result from "../result/ResultWrapper";
import TestInstruction from "../TestInstructions/TestInstruction";
import IndividualResult from "../result/ShowResult";
import TestPreviewWrapper from "../testPreview/TestPreviewWrapper";
import { connect } from "react-redux";
import { Modal, message } from "antd";
import { Offline } from "react-detect-offline";
import Profile from "../profile/Profile";
import { Roles } from "../Roles/roles";
import CreateTest from "../Teacher/CreateTest/CreateTest";
import AssignedTestsWrapper from "../Teacher/AssigenedTest/AssignedTestsWrapper";
import TestStatus from "../Teacher/TestStatus/TestStatus";

// Create a separate component that uses useLocation
function AppContent(props) {
  const [count, setCount] = useState(1);
  const location = useLocation();
  const role = props.userInfo?.role;

  const handleOffline = () => {
    setCount(count + 1);
    if (count % 2 === 0) {
      message.success("Connected to internet");
    } else {
      message.error("Please connect to internet");
    }
  };

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (e.key === "F12") e.preventDefault();
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const shouldHideNavbar = () => {
    const authPages = ["/signin", "/signup"];
    return authPages.includes(location.pathname) || !props.userInfo;
  };

  return (
    <div className={count % 2 ? "" : "pointer__select__none"}>
      <Offline onChange={handleOffline} />
      
      {!shouldHideNavbar() && <Navbar />}

      <Switch>
        <Route exact path="/signin" component={Login} />
        <Route exact path="/signup" component={Signup} />

        <ProtectedRoute 
          exact 
          path="/" 
          component={role === Roles.teacher ? TeacherDashboard : StudentDashboard} 
        />
        <ProtectedRoute exact path="/attempt-test" component={AttemptTest} />
        <ProtectedRoute 
          exact 
          path="/create-test" 
          component={role === Roles.teacher ? CreateTest : StudentDashboard} 
        />
        <ProtectedRoute exact path="/result" component={Result} />
        <ProtectedRoute 
          exact 
          path={`/result/${props.selectedTestName}`} 
          component={IndividualResult} 
        />
        <ProtectedRoute exact path="/test-instructions" component={TestInstruction} />
        <ProtectedRoute exact path="/start-test" component={TestPreviewWrapper} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute 
          exact 
          path="/assigned-test" 
          component={role === Roles.teacher ? AssignedTestsWrapper : StudentDashboard} 
        />
        <ProtectedRoute 
          exact 
          path={`/test-status/${props.selectedAssignedTestName}`} 
          component={TestStatus} 
        />

        <ProtectedRoute component={role === Roles.teacher ? TeacherDashboard : StudentDashboard} />
      </Switch>
    </div>
  );
}

function App(props) {
  return (
    <Router>
      <AppContent {...props} />
    </Router>
  );
}

const mapStateToProps = (state) => ({
  selectedTestName: state.selectedTest.selectedTestResultData.testName?.replace(/\s+/g, "-").toLowerCase(),
  userInfo: state.auth.user,
  selectedAssignedTestName: state.selectedTest.selectedAssignedTestData.testName?.replace(/\s+/g, "-").toLowerCase(),
});

export default connect(mapStateToProps)(App);