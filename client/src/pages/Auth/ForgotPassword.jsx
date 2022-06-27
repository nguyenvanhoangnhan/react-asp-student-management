import React from "react";
import {BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Button } from "antd"
import InputField from "../../components/InputField";
export default function ForgotPassword(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div id="forgot-password" className="h-screen w-screen overflow-hidden flex items-center flex-col object-cover">
            <div className="ellipses">
                <div className="container">
                    <div className="ellipse ellipse-medium ellipse-orange pos-1"></div>
                    <div className="ellipse ellipse-medium ellipse-orange pos-2"></div>
                    <div className="ellipse ellipse-medium ellipse-green pos-3"></div>
                    <div className="ellipse ellipse-small ellipse-green pos-4"></div>
                    <div className="ellipse ellipse-small ellipse-green pos-5"></div>
                </div>
            </div>
            <div className="logo">LOGO</div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-16 px-10 py-20 rounded-2xl bg-white bg-opacity-25 relative">
                <Link to="/unauth/login" className="back absolute left-5 top-4 p-1 text-xl flex justify-center items-center">
                    <BsArrowLeft/>
                </Link>
                <div className="title font-black text-3xl mb-8 self-start">Quên <br />mật khẩu?</div>
                <div style={{marginBottom: '20px'}}>Enter your email, phone number and we'll send you a link to access your account
                </div>
                <InputField label="Email/ Phone Number" type="text" required />
                <Button type="primary" htmlType="submit" size="large" className="mt-5" block >
                    Request new password
                </Button>
            </form>
        </div>
    );
}
