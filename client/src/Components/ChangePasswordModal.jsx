import React from 'react';
import { BsX, BsLock } from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';
import InputField from '../components/InputField';
import {Button} from 'antd'
import { useState } from 'react';
import MsgModal from '../components/MsgModal'
import axios from 'axios'
export default function ChangePasswordModal({user, handleLogout}) {
    const history = useHistory()
    const backToProfilePage = () => {
        history.push('/auth/profile');
    }

    const [modal, setModal] = useState({
        isShow: false,
        Fn: () => { },
        isDanger: false,
        msg: '',
    })
    const [oldPwd, setOldPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [newPwdAgain, setNewPwdAgain] = useState("");

    
    const handleInput = (e) => {
        if (e.target.name === "oldPwd") {
            setOldPwd(e.target.value);
            return;
        }        
        if (e.target.name === "newPwd") {
            setNewPwd(e.target.value);
            return;
        }        
        if (e.target.name === "newPwdAgain") {
            setNewPwdAgain(e.target.value);
        }        
    }
    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPwd !== newPwdAgain) {
            setModal({
                isShow: true,
                Fn: () => setModal({...modal, isShow: false}),
                isDanger: true,
                msg: 'Trường "Xác nhận mật khẩu mới" không chính xác'
            })
            return;
        }
        if (newPwd === oldPwd) {
            setModal({
                isShow: true,
                Fn: () => setModal({...modal, isShow: false}),
                isDanger: true,
                msg: 'Mật khẩu mới phải khác mật khẩu cũ'
            })
            return;
        }
        try {
            await axios.put('/api/account/reset-password', {
                username: user.name,
                oldPassword: oldPwd,
                newPassword: newPwd
            })
            setModal({
                isShow: true,
                Fn: () => handleLogout(),
                isDanger: false,
                msg: "Đổi mật khẩu thành công.\nVui lòng đăng nhập lại!"
            })
        }
        catch (err) {
            setModal({
                isShow: true,
                Fn: () => setModal({...modal, isShow: false}),
                isDanger: true,
                msg: "Mật khẩu cũ không đúng"
            })
        }
    }

    return (
        <div id="change-password" className="modal-container">
            <MsgModal msg={modal.msg} Fn={modal.Fn} show={modal.isShow} danger={modal.isDanger} />
            <div className="modal">
                <div className="modal-title-bar">
                    <h4 className="modal-title">Change password</h4>
                    <div className="modal-close-icon" onClick={backToProfilePage}>
                        <BsX />
                    </div>
                </div>
                <form className="change-password-form" onSubmit={handleChangePassword}>
                    <InputField type="password" value={oldPwd} onChange={handleInput} name="oldPwd" label="Mật khẩu cũ" required/>
                    <InputField type="password" value={newPwd} onChange={handleInput} name="newPwd" label="Mật khẩu mới" required/>
                    <InputField type="password" value={newPwdAgain} onChange={handleInput} name="newPwdAgain" label="Xác nhận mật khẩu mới" required />
                    <div className="buttons">
                        <Button danger size='large' onClick={backToProfilePage}>Hủy</Button>
                        <Button type="primary" htmlType='submit' size='large' >OK</Button>
                    </div>
                </form>
            </div>
            <div className="overlay" onClick={backToProfilePage}></div>
        </div>
    )
}
