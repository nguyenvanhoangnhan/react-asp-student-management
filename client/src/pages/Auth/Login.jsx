import React from "react";
import { BsEnvelope, BsLock, BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Button } from 'antd'
import InputField from "../../components/InputField";
export default function Login(props) {
const handleSubmit = (e) => {
        e.preventDefault();
        props.handleLogin();
    }
    return (
        <div id="login" className="h-screen w-screen overflow-hidden flex items-center flex-col object-cover">
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
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-16 px-10 py-20 rounded-2xl bg-white bg-opacity-25 relative">
                <div className="title font-black text-3xl mb-8 self-start">Đăng nhập</div>
                <InputField type="text" label="Mã số sinh viên / giảng viên" required />
                <InputField type="password" label="Mật khẩu" required />
                <Link to="/unauth/forgot-password" className="flex forgot-password mt-2 text-sm font-semibold self-end translate-x-4">
                    Quên mật khẩu?
                    <BsArrowRight/>
                </Link>
                <Button type="primary" htmlType="submit" size="large" className="mt-5" block>
                    Đăng nhập
                </Button>
            </form>
        </div>
    );
}
