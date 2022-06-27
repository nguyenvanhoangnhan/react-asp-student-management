import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LoggedView from "./layouts/LoggedView";
import Auth from "./layouts/Auth"

function App() {
    const [auth, setAuth] = useState({
        role: 'admin'
    })

    const handleLogout = () => {
        setAuth(false)
    }

    const handleLogin = () => {
        setAuth({
            role: 'student'
        })
    }
    
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/auth">
                        <LoggedView auth={auth} handleLogout={handleLogout} />
                        {!auth && <Redirect to="/unauth" />}
                    </Route>
                    <Route path="/unauth">
                        <Auth auth={auth} handleLogin={handleLogin} />
                        {auth && <Redirect to="/auth" />}
                    </Route>
                    {auth ? <Redirect to="/auth" /> : <Redirect to="/unauth" />}
                </Switch>
            </Router>
        </div>
    );
}

export default App;
