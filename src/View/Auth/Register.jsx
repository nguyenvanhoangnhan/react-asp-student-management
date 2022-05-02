import React from "react";
import { BsPerson, BsEnvelope, BsLock, BsArrowRight } from "react-icons/bs";
import { Link, Redirect } from "react-router-dom";
import { Button } from 'antd'
import InputField from "../../Components/InputField";
export default function Register(props) {
    let auth = props.auth;
    return (
        <div id="register">
            {auth && <Redirect to="/auth/dashboard"/>}
            <div className="logo">LOGO</div>
            <form>
                <div className="title">Đăng ký</div>
                <InputField type="text" label="Họ tên" required />
                <InputField type="email" label="Email" required />
                <InputField type="password" label="Mật khẩu" required />
                <InputField type="password" label="Xác nhận mật khẩu" required />
                <Button type="primary" htmlType="submit" size="large" className="submit-btn">
                    Đăng ký
                </Button>   
                <div className="suggest suggest-sign-in">
                    <span>Đã có tài khoản? </span>
                    <div className="suggest-link">
                        <Link to="/unauth/login">Đăng nhập</Link>
                        <BsArrowRight className="BsIcon"/>
                    </div>
                </div>
            </form>
        </div>
    );
}
