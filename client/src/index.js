import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css"
import "./index.css";
import "./antdcustom.css"
import App from "./App";
import axios from 'axios'

// axios.defaults.baseURL = "http://172.21.10.108:5193/"
axios.defaults.baseURL = "http://192.168.1.4:5193/"
axios.defaults.timeout = "10000"
axios.defaults.timeoutErrorMessage = "Request timeout"

ReactDOM.render(
    // <React.StrictMode>
        <App />
    // </React.StrictMode>
    ,
    document.getElementById("root")
);

