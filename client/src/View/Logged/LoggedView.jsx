import { React, useEffect, useState } from "react";
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom'
import Navbar from "../../Components/Nav/Navbar";
import Sidebar from "../../Components/Nav/Sidebar";
import Schedule from "./Schedule/Schedule";
import Students from "./Students/Students";
import Score from "./Score/Score";
import Classes from "./Classes/Classes"
import Profile from "./ProfilePage/Profile";
import CreateAccount from "./Accounts/CreateAccount";
import GenerateAccounts from "./Accounts/GenerateAccounts";
import ErrorMessageModal from "../../Components/ErrorMessageModal";
export default function LoggedView(props) {
    let { path, url } = useRouteMatch();
    return (
        <div id="logged">
                <Sidebar url={url} />
                <div className="content">
                    <Navbar auth={props.auth} handleLogout={props.handleLogout} />
                    <div className="content-container">
                        <Switch>
                            <Route path={`${path}/schedule`} component={Schedule} />
                            <Route path={`${path}/students`} component={Students} />
                            <Route path={`${path}/classes`} component={Classes} />
                            <Route path={`${path}/score`} component={Score} />
                            <Route path={`${path}/profile`} component={Profile} />
                            <Route path={`${path}/create-account`} component={CreateAccount}/>
                            <Route path={`${path}/generate-accounts`} component={GenerateAccounts}/>
                            {path === "/auth" && <Redirect to="/auth/schedule" />}
                        </Switch>
                    </div>
                </div>
        </div>
    );
};
