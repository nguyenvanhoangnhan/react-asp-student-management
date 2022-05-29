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
        <div id="forgot-password">
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
            <form onSubmit={handleSubmit}>
                <Link to="/unauth/login" className="back">
                    <BsArrowLeft/>
                </Link>
                <div className="title">Quên <br />mật khẩu?</div>
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
