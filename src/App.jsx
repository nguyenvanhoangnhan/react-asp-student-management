import React from "react";
import { useState } from "react";
import { BsWindowSidebar } from "react-icons/bs";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Auth from "./View/Logged/LoggedView";
import Unauth from "./View/Auth/Auth";

function App() {
    const [auth, setAuth] = useState(true);
    
    const handleLogout = () => {
        setAuth(false);
    }
    const handleLogin = () => {
        setAuth(true);
    }
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/auth">
                        <Auth auth={auth} handleLogout={handleLogout} />
                        {!auth && <Redirect to="/unauth" />}
                    </Route>
                    <Route path="/unauth">
                        <Unauth auth={auth} handleLogin={handleLogin} />
                        {auth && <Redirect to="/auth" />}
                    </Route>
                    {auth ? <Redirect to="/auth" /> : <Redirect to="/unauth" />}
                </Switch>
            </Router>
        </div>
    );
}

export default App;
