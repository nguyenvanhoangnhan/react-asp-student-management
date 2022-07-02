import { React, useState } from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import Navbar from "../components/Nav/Navbar";
import Sidebar from "../components/Nav/Sidebar";
import Schedule from "../pages/Student/Schedule";
import UserList from "../pages/Common/UserList";
import Score from "../pages/Student/Score";
import CourseRegister from "../pages/Student/CourseRegister/Index";
import Profile from "../pages/Common/Profile";
import AccountManagement from "../pages/Admin/Account/Index";
import CourseInChargeList from "../pages/Teacher/CourseInChargeList";
import Loading from "../components/Loading";
import ClassManagement from "../pages/Admin/Class/Index";
import EduProgramManagement from "../pages/Admin/Educational Program/Index";
import CourseManagement from "../pages/Admin/Course/Index"
import CourseClassroomManagement from "../pages/Admin/Course Classroom/Index"
import EducationalProgram from '../pages/Student/EducationalProgram'
import CourseInChargeDetail from "../pages/Teacher/CourseInChargeDetail";
import TeahcerSchedule from "../pages/Teacher/Schedule";
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
            <Route path={`/auth/schedule`} key={0}>
                 <Schedule setLoading={customSetLoading} user={user} />
            </Route>,
            <Route path={`/auth/course-register`} key={1} >
                <CourseRegister setLoading={customSetLoading} user={user} />
            </Route>,
            <Route path={`/auth/score`} key={2}>
                <Score user={user} setLoading={customSetLoading} />
            </Route>,
            <Route path={`/auth/user-list`} key={3}>
                <UserList setLoading={customSetLoading} />
            </Route>,
            <Route path={`/auth/educational-program`} key={3}>
                <EducationalProgram user={user} setLoading={customSetLoading} />
            </Route>,
            <Route path={`/auth/profile`} key={4}>
                <Profile setLoading={customSetLoading}  user={user} handleLogout={handleLogout} />
            </Route>,
            <Route path="*" key={5} >
                <Redirect to="/auth/schedule" />
            </Route>,
            
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
    if (user.role === "Teacher") {
        routesByRole = [
            <Route
                path={`/auth/course-in-charge/:courseClassId`}
                key={0}
            >
                <CourseInChargeDetail user={user} setLoading={customSetLoading} />
            </Route>,
            <Route
                path={`/auth/course-in-charge`}
                key={1}
            >
                <CourseInChargeList user={user} setLoading={customSetLoading} />
            </Route>,
            <Route path={`/auth/profile`} key={2}>
                <Profile setLoading={customSetLoading} user={user} handleLogout={handleLogout} />
            </Route>,
            <Route path={`/auth/user-list`} key={3}>
                <UserList  setLoading={customSetLoading} user={user} />
            </Route>,
            <Route path={`/auth/schedule`} key={4}>
                <TeahcerSchedule  setLoading={customSetLoading} user={user}  />
            </Route>,
            <Route path="*" key={5}>
                <Redirect to="/auth/course-in-charge"  />
            </Route>,
            
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

                            {/* Conditional Views */}
                            {routesByRole}
                            
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}
