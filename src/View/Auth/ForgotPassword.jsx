import React from "react";
import {BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Button } from "antd"
import InputField from "../../Components/InputField";
export default function ForgotPassword(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div id="forgot-password">
            <div className="logo">LOGO</div>
            <form onSubmit={handleSubmit}>
                <Link to="/unauth/login" className="back">
                    <BsArrowLeft/>
                </Link>
                <div className="title">Forgot <br />password?</div>
                <div style={{marginBottom: '20px'}}>Enter your email, phone number and we'll send you a link to access your account
                </div>
                <InputField label="Email/ Phone Number" type="text" required />
                <Button type="primary" htmlType="submit" size="large" className="submit-btn">
                    Request new password
                </Button>
            </form>
        </div>
    );
}
