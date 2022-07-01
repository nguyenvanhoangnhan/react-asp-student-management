import React from "react";
import { BsEnvelope, BsLock, BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Button } from 'antd'
import InputField from "../../components/InputField";
import { useState } from "react";
import MsgModal from "../../components/MsgModal";
import axios from "axios";

export default function Login( { setLoading }) {
    document.title = "Đăng nhập"
    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");
    const [modal, setModal] = useState({
        isShow: false,
        Fn: () => { },
        isDanger: false,
        msg: '',
    })
    const handleInputUsername = (e) => {
        setUsername(e.target.value);
    }
    const handleInputPassword = (e) => {
        setPwd(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const {data: jwt} = await axios.post('/api/account/login',
                {
                    username: username,
                    password: pwd
                }
            )
            localStorage.setItem("jwt", jwt)
            setModal({
                isShow: true,
                Fn: () => window.location.reload(),
                isDanger: false,
                msg: 'Đăng nhập thành công'
            })
        } catch (err) {
            setModal({
                isShow: true,
                Fn: () => setModal({...modal, isShow: false}),
                isDanger: true,
                msg: ' Đăng nhập thất bại.\nSai tài khoản hoặc mật khẩu'
            })       
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div id="login" className="h-screen w-screen overflow-hidden flex items-center flex-col object-cover">
            <MsgModal msg={modal.msg} Fn={modal.Fn} show={modal.isShow} danger={modal.isDanger} />

            <div className="ellipses">
                <div className="container">
                    <div className="ellipse ellipse-medium ellipse-orange pos-1"></div>
                    <div className="ellipse ellipse-medium ellipse-orange pos-2"></div>
                    <div className="ellipse ellipse-medium ellipse-green pos-3"></div>
                    <div className="ellipse ellipse-small ellipse-green pos-4"></div>
                    <div className="ellipse ellipse-small ellipse-green pos-5"></div>
                </div>
            </div>
            <div className="logo text-gray-700 font-black text-2xl text-center mt-5 select-none relative">
                Hệ thống quản lý sinh viên <br /> Trường Đại học Bách khoa - Đại học Đà Nẵng
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-16 px-10 py-20 rounded-2xl bg-white bg-opacity-25 relative">
                <div className="title font-black text-3xl mb-8 self-start">Đăng nhập</div>
                <InputField type="text" label="Mã số sinh viên / giảng viên" value={username} onChange={handleInputUsername} required />
                <InputField type="password" label="Mật khẩu" value={pwd} onChange={handleInputPassword} required />
                <Link to="/unauth/forgot-password/" className="flex forgot-password mt-2 text-sm font-semibold self-end translate-x-4">
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
