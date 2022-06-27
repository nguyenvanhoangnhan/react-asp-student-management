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
export default function LoggedView({ auth, handleLogout }) {
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

    if (auth.role === "student") {
        routesByRole = [
            <Route path={`${path}/schedule`} component={Schedule} key={0} />,
            <Route
                path={`${path}/course-register`}
                component={CourseRegister}
                key={1}
            />,
            <Route path={`${path}/score`} component={Score} key={2} />,
            <Route path={`${path}/students`} key={3}>
                <StudentList setLoading={customSetLoading} />
            </Route>,
        ];
    }
    if (auth.role === "admin") {
        routesByRole = [
            <Route path={`${path}/manage-account`} key={0}>
                <AccountManagement setLoading={customSetLoading} />
            </Route>,
            <Route path={`${path}/manage-class`} key={1}>
                <ClassManagement setLoading={customSetLoading} />
            </Route>,
            <Route path={`${path}/manage-program`} key={2}>
                <EduProgramManagement setLoading={customSetLoading} />
            </Route>,
            <Route path={`${path}/manage-course`} key={3}>
                <CourseManagement setLoading={customSetLoading} />
            </Route>,
            <Route path={`${path}/manage-course-classroom`} key={4}>
                <CourseClassroomManagement setLoading={customSetLoading} />
            </Route>
        ];
    }
    if (auth.role === "teacher") {
        routesByRole = [
            <Route
                path={`${path}/course-in-charge`}
                component={CourseInChargeList}
                key={0}
            />,
        ];
    }

    return (
        <div id="logged" className="flex w-screen h-screen overflow-y-hidden">
            <Sidebar url={url} auth={auth} />
            <div className="content flex relative h-full flex-auto overflow-x-hidden">
                <Navbar auth={auth} handleLogout={handleLogout} />
                <div className="content-outer-container absolute flex-auto m-8 mt-16 rounded-lg bg-white">
                    <div className="content-inner-container relative w-full py-5 px-10">
                        {loading && <Loading />}
                        <Switch>
                            {/* Common Vỉews */}
                            <Route
                                path={`${path}/profile`}
                                component={Profile}
                            />

                            {/* Conditional Views */}
                            {routesByRole}

                            {path === "/auth" && (
                                <Redirect to="/auth/schedule" />
                            )}
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}
