import React from "react"
import { Switch, useRouteMatch, Route, Redirect} from "react-router-dom"
import Login from "../pages/Auth/Login"
import ForgotPassword from "../pages/Auth/ForgotPassword"
export default function Auth(props) {
    let { path, url } = useRouteMatch();
    return (
        <div id="auth">
            <Switch>
                <Route exact path={`${path}/login`}>
                    <Login auth={props.auth} handleLogin={props.handleLogin} />
                </Route>
                <Route exact path={`${path}/forgot-password`} component={ForgotPassword} />
                {path === "/unauth" && <Redirect to="/unauth/login"/>}
            </Switch>
        </div>
    );
}
