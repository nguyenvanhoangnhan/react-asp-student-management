import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import LoggedView from './layouts/LoggedView'
import Auth from './layouts/Auth'
import axios from 'axios'
function App() {
    const [host, port] = ['', '']
    axios.defaults.baseURL = `${host}:${port}`
    // axios.defaults.timeout = "10000"
    // axios.defaults.timeoutErrorMessage = "Request timeout"
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`

    const handleLogout = () => {
        localStorage.removeItem('jwt')
        window.location.reload()
    }
    var user
    ;(function persistLoggedInUser() {
        const parseJwt = (token) => {
            if (token === null) return false
            var base64Url = token.split('.')[1]
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
            var jsonPayload = decodeURIComponent(
                window
                    .atob(base64)
                    .split('')
                    .map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                    })
                    .join('')
            )

            return JSON.parse(jsonPayload)
        }

        user = parseJwt(localStorage.getItem('jwt'))

        // handle expired
        if (user.exp < Math.floor(Date.now() / 1000)) handleLogout()
    })()

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/auth">
                        <LoggedView user={user} handleLogout={handleLogout} />
                        {!user && <Redirect to="/unauth" />}
                    </Route>
                    <Route path="/unauth">
                        <Auth user={user} />
                        {user && <Redirect to="/auth" />}
                    </Route>
                    <Route path="*">
                        {user ? <Redirect to="/auth" /> : <Redirect to="/unauth" />}
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
