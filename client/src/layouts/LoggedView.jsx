import { React, useState } from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import Navbar from "../components/Nav/Navbar";
import Sidebar from "../components/Nav/Sidebar";
import Schedule from "../pages/Student Pages/Schedule";
import StudentList from "../pages/Common Pages/StudentList";
import Score from "../pages/Student Pages/Score";
import CourseRegister from "../pages/Student Pages/CourseRegister";
import Profile from "../pages/Common Pages/Profile";
import AccountManagement from "../pages/Admin Pages/Account/Index";
import GenerateAccounts from "../pages/Admin Pages/Account/Generate";
import MsgModal from "../components/MsgModal";
import CourseInChargeList from "../pages/Teacher Pages/CourseInChargeList";
import Loading from "../components/Loading";
import ClassManagement from "../pages/Admin Pages/Class/Index";
import EduProgramManagement from "../pages/Admin Pages/Educational Program/Index";
import CourseManagement from "../pages/Admin Pages/Course/Index"
import CourseClassroomManagement from "../pages/Admin Pages/Course Classroom/Index"
export default function LoggedView({ user, handleLogout }) {
    let { path, url } = useRouteMatch();

    const [loading, setLoading] = useState(false);
    const customSetLoading = (state) => {
        if (state === false) {
            setTimeout(() => {
                setLoading(state);
            }, 250);
        } else setLoading(state);
    };

    let routesByRole;

    if (user.role === "Student") {
        routesByRole = [
            <Route path={`/auth/schedule`} component={Schedule} key={0}  />,
            <Route
                path={`/auth/course-register`}
                component={CourseRegister}
                key={1}
            />,
            <Route path={`/auth/score`} component={Score} key={2} />,
            <Route path={`/auth/students`} key={3}>
                <StudentList setLoading={customSetLoading} />
            </Route>,
            <Route path="*" key={4} >
                <Redirect to="/auth/schedule" />
            </Route>
        ];
    }
    if (user.role === "Admin") {
        routesByRole = [
            <Route path={`/auth/manage-account`} key={0}>
                <AccountManagement setLoading={customSetLoading} />
            </Route>,
            <Route path={`/auth/manage-class`} key={1}>
                <ClassManagement setLoading={customSetLoading} />
            </Route>,
            <Route path={`/auth/manage-program`} key={2}>
                <EduProgramManagement setLoading={customSetLoading} />
            </Route>,
            <Route path={`/auth/manage-course`} key={3}>
                <CourseManagement setLoading={customSetLoading} />
            </Route>,
            <Route path={`/auth/manage-course-classroom`} key={4}>
                <CourseClassroomManagement setLoading={customSetLoading} />
            </Route>,
            <Route path="*" key={5}>
                <Redirect to="/auth/manage-account"  />
            </Route>
        ];
    }
    if (user.role === "teacher") {
        routesByRole = [
            <Route
                path={`/auth/course-in-charge`}
                component={CourseInChargeList}
                key={0}
            />,
            <Route path="*" key={1}>
                <Redirect to="/auth/course-in-charge"  />
            </Route>
        ];
    }

    return (
        <div id="logged" className="flex w-screen h-screen overflow-y-hidden">
            <Sidebar url={url} user={user} />
            <div className="content flex relative h-full flex-auto overflow-x-hidden">
                <Navbar user={user} handleLogout={handleLogout} />
                <div className="content-outer-container absolute flex-auto m-8 mt-16 rounded-lg bg-white">
                    <div className="content-inner-container relative w-full py-5 px-10">
                        {loading && <Loading />}
                        <Switch>
                            {/* Common Vỉews */}
                            <Route
                                path={`/auth/profile`}
                            >
                                <Profile user={user} handleLogout={handleLogout} />
                            </Route>

                            {/* Conditional Views */}
                            {routesByRole}
                            
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}
