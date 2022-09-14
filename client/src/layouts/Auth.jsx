import React, { useState } from 'react'
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import ForgotPassword from '../pages/Auth/ForgotPassword'
import Loading from '../components/Loading'
export default function Auth(props) {
    let { path, url } = useRouteMatch()
    const [loading, setLoading] = useState(false)

    return (
        <div id="auth">
            {loading && <Loading />}
            <Switch>
                <Route exact path={`${path}/login`}>
                    <Login setLoading={setLoading} />
                </Route>
                <Route path={`${path}/forgot-password`}>
                    <ForgotPassword setLoading={setLoading} />
                </Route>
                {path === '/unauth' && <Redirect to="/unauth/login" />}
            </Switch>
        </div>
    )
}
