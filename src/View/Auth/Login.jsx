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
            <div className="logo">DUT</div>
            <form onSubmit={handleSubmit}>
                <div className="title">Đăng nhập</div>
                <InputField type="text" label="Mã số sinh viên" required />
                <InputField type="password" label="Mật khẩu" required />
                <Link to="/unauth/forgot-password" className="forgot-password">
                    Quên mật khẩu?
                </Link>
                <Button type="primary" htmlType="submit" size="large" className="submit-btn">
                    Đăng nhập
                </Button>
                <div className="suggest suggest-sign-in">
                    <span>Chưa có tài khoản? </span>
                    <div className="suggest-link">
                        <Link to="/unauth/register">Đăng ký ngay</Link>
                        <BsArrowRight className="BsIcon"/>
                    </div>
                </div>
            </form>
        </div>
    );
}
