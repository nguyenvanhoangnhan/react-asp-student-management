import React, { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom'
import { Button } from 'antd'
import InputField from '../../components/InputField'
import MsgModal from '../../components/MsgModal'
import axios from 'axios'
export default function ForgotPassword({ setLoading }) {
    const navigate = useHistory()
    const [modal, setModal] = useState({
        isShow: false,
        Fn: () => {},
        isDanger: false,
        msg: ''
    })

    const [userId, setUserId] = useState('')
    const [email, setEmail] = useState('')
    const [verifyToken, setVerifyToken] = useState('')
    const [newPwd, setNewPwd] = useState('')

    //true == pass step 1
    const [isEmailCorrect, setIsEmailCorrect] = useState(true)

    //true == pass step 2
    const [isVerified, setIsVerified] = useState(false)

    const handleInput = (e) => {
        if (e.target.name === 'userId') {
            setUserId(e.target.value)
            return
        }
        if (e.target.name === 'email') {
            setEmail(e.target.value)
            return
        }
        if (e.target.name === 'verifyToken') {
            setVerifyToken(e.target.value)
            return
        }

        setNewPwd(e.target.value)
    }
    const handleSendVerifyCode = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.post(`/api/account/send-email/${userId}/${email}`)
            setIsEmailCorrect(true)
            navigate.push('/unauth/forgot-password/verify')
        } catch (err) {
            setModal({
                isShow: true,
                Fn: () => setModal({ ...modal, isShow: false }),
                isDanger: true,
                msg: 'Thông tin tài khoản chưa chính xác!'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleVerify = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.post(`/api/account/verify-token/${verifyToken}/${userId}`)
            setIsVerified(true)
            navigate.push('/unauth/forgot-password/new-password')
        } catch (err) {
            setModal({
                isShow: true,
                Fn: () => setModal({ ...modal, isShow: false }),
                isDanger: true,
                msg: 'Mã xác thực không đúng!'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault()
        try {
            await axios.put('/api/account/forgot-password', {
                userId: userId,
                password: newPwd
            })
            setModal({
                isShow: true,
                Fn: () => {
                    window.location.replace('/unath/login')
                },
                isDanger: false,
                msg: 'Khôi phục mật khẩu thành công!'
            })
        } catch (err) {
            setModal({
                isShow: true,
                Fn: () => {
                    window.location.replace('/unath/forgot-password')
                },
                isDanger: true,
                msg: 'Khôi phục mật khẩu thất bại!'
            })
        }
    }

    return (
        <div
            id="forgot-password"
            className="h-screen w-screen overflow-hidden flex items-center flex-col object-cover">
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

            <Switch>
                {/* Step 1: input uid and email */}
                <Route exact path="/unauth/forgot-password/">
                    <form
                        onSubmit={handleSendVerifyCode}
                        className="flex flex-col items-center mt-16 px-10 py-20 rounded-2xl bg-white bg-opacity-25 relative">
                        <Link
                            to="/unauth/login"
                            className="back absolute left-5 top-4 p-1 text-xl flex justify-center items-center">
                            <BsArrowLeft />
                        </Link>
                        <div className="title font-black text-3xl mb-8 self-start">
                            Quên <br />
                            mật khẩu?
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            Vui lòng nhập đúng ID tài khoản và email khớp với thông tin tài khoản
                        </div>
                        <InputField
                            label="Mã số sinh viên/giảng viên"
                            value={userId}
                            onChange={handleInput}
                            name="userId"
                            type="text"
                            required
                        />
                        <InputField
                            label="Email/ Phone Number"
                            value={email}
                            onChange={handleInput}
                            name="email"
                            type="text"
                            required
                        />
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="mt-5"
                            block>
                            Tiếp tục
                        </Button>
                    </form>
                </Route>

                {/* Step 2: input verify code */}
                <Route exact path="/unauth/forgot-password/verify">
                    {!isEmailCorrect && <Redirect to="/unauth/forgot-password/" />}
                    <form
                        onSubmit={handleVerify}
                        className="flex flex-col items-center mt-16 px-10 py-20 rounded-2xl bg-white bg-opacity-25 relative">
                        <Link
                            to="/unauth/forgot-password/"
                            className="back absolute left-5 top-4 p-1 text-xl flex justify-center items-center">
                            <BsArrowLeft />
                        </Link>
                        <div className="title font-black text-3xl mb-8 self-start">
                            Nhập <br />
                            mã xác thực
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            Nhập mã xác thực trong thư được gửi đến email của bạn
                        </div>
                        <InputField
                            label="Mã xác thực"
                            value={verifyToken}
                            onChange={handleInput}
                            name="verifyToken"
                            type="text"
                            required
                        />
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="mt-5"
                            block>
                            Xác thực
                        </Button>
                    </form>
                </Route>
                <Route exact path="/unauth/forgot-password/new-password">
                    {!isVerified && <Redirect to="/unauth/forgot-password/verify" />}
                    <form
                        onSubmit={handleChangePassword}
                        className="flex flex-col items-center mt-16 px-10 py-20 rounded-2xl bg-white bg-opacity-25 relative">
                        <Link
                            to="/unauth/forgot-password/"
                            className="back absolute left-5 top-4 p-1 text-xl flex justify-center items-center">
                            <BsArrowLeft />
                        </Link>
                        <div className="title font-black text-3xl mb-8 self-start">
                            Nhập <br />
                            mật khẩu mới
                        </div>
                        {/* <div style={{ marginBottom: "20px" }}>
                            Nhập mã xác thực trong thư được gửi đến email của bạn
                        </div> */}
                        <InputField
                            label="Mật khẩu mới"
                            value={newPwd}
                            onChange={handleInput}
                            name="newPwd"
                            type="password"
                            required
                        />
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="mt-5"
                            block>
                            Khôi phục mật khẩu
                        </Button>
                    </form>
                </Route>
            </Switch>
        </div>
    )
}
