import React from "react";
import { BsEnvelope, BsLock, BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Button } from 'antd'
import InputField from "../../Components/InputField";
export default function Login(props) {
const handleSubmit = (e) => {
        e.preventDefault();
        props.handleLogin();
    }
    return (
        <div id="login">
            <div className="ellipses">
                <div className="container">
                    <div className="ellipse ellipse-medium ellipse-orange pos-1"></div>
                    <div className="ellipse ellipse-medium ellipse-orange pos-2"></div>
                    <div className="ellipse ellipse-medium ellipse-green pos-3"></div>
                    <div className="ellipse ellipse-small ellipse-green pos-4"></div>
                    <div className="ellipse ellipse-small ellipse-green pos-5"></div>
                </div>
            </div>
            <div className="logo">DUT</div>
            <form onSubmit={handleSubmit}>
                <div className="title">Đăng nhập</div>
                <InputField type="text" label="Mã số sinh viên" required />
                <InputField type="password" label="Mật khẩu" required />
                <Link to="/unauth/forgot-password" className="forgot-password">
                    Quên mật khẩu?
                    <BsArrowRight/>
                </Link>
                <Button type="primary" htmlType="submit" size="large" className="submit-btn">
                    Đăng nhập
                </Button>
            </form>
        </div>
    );
}
