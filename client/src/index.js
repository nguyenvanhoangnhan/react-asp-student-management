import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css"
import "./index.css";
import "./antdcustom.css"
import App from "./App";
import axios from 'axios'

axios.defaults.baseURL = "https://pbl3api.azurewebsites.net/"
axios.defaults.timeout = "5000"
axios.defaults.timeoutErrorMessage = "Request timeout"

ReactDOM.render(
    // <React.StrictMode>
        <App />
    // </React.StrictMode>
    ,
    document.getElementById("root")
);

