import { React, useState } from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import Navbar from "../components/Nav/Navbar";
import Sidebar from "../components/Nav/Sidebar";
import Schedule from "../pages/Student Pages/Schedule";
import StudentList from "../pages/Common Pages/StudentList";
import Score from "../pages/Student Pages/Score";
import CourseRegister from "../pages/Student Pages/CourseRegister";
import Profile from "../pages/Common Pages/Profile";
import AccountManagement from "../pages/Admin Pages/Accounts Management/AccountManagement";
import GenerateAccounts from "../pages/Admin Pages/Accounts Management/GenerateAccounts";
import MsgModal from "../components/MsgModal";
import CourseInChargeList from "../pages/Teacher Pages/CourseInChargeList";
import Loading from '../components/Loading'
import ClassManagement from "../pages/Admin Pages/ClassManagement/ClassManagement";

export default function LoggedView({ auth, handleLogout }) {
    let { path, url } = useRouteMatch();

    const [loading, setLoading] = useState(false)
    const customSetLoading = (state) => {
        if (state === false) {
            setTimeout(() => {
                setLoading(state)
            }, 200);
        }
        else setLoading(state);
    }

    let routesByRole;
    
    if (auth.role === "student") {
        routesByRole = [
            <Route path={`${path}/schedule`} component={Schedule} key={0} />,
            <Route path={`${path}/course-register`} component={CourseRegister} key={1} />,
            <Route path={`${path}/score`} component={Score} key={2} />
        ]
    }
    if (auth.role === "admin") {
        routesByRole = [
            <Route path={`${path}/manage-account`} key={0}>
                <AccountManagement setLoading={setLoading}/>
            </Route>,
            <Route path={`${path}/manage-class`} key={1}>
                <ClassManagement setLoading={setLoading}/>
            </Route>
        ]
    }
    if (auth.role === "teacher") {
        routesByRole = [
            <Route path={`${path}/course-in-charge`} component={CourseInChargeList} key={0} />
        ]
    }

    return (
        <div id="logged">
            <Sidebar url={url} auth={auth} />
            <div className="content">
                <Navbar auth={auth} handleLogout={handleLogout} />
                <div className="content-outer-container">
                    <div className="content-inner-container">
                        {loading && <Loading />}
                        <Switch>
                            {/* Common Vỉews */}
                            <Route path={`${path}/students`}>
                                <StudentList setLoading={customSetLoading} />
                            </Route>
                            <Route path={`${path}/profile`} component={Profile} />

                            {/* Conditional Views */}
                            {routesByRole}

                            {path === "/auth" && <Redirect to="/auth/schedule" />}
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}
