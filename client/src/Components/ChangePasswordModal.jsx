import React from 'react';
import { BsX, BsLock } from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';
import InputField from '../components/InputField';
import {Button} from 'antd'
export default function ChangePasswordModal() {
    const history = useHistory()
    const backToProfilePage = () => {
        history.push('/auth/profile');
    }

    return (
        <div id="change-password" className="modal-container">
            <div className="modal">
                <div className="modal-title-bar">
                    <h4 className="modal-title">Change password</h4>
                    <div className="modal-close-icon" onClick={backToProfilePage}>
                        <BsX />
                    </div>
                </div>
                <form className="change-password-form" onSubmit={(e) => e.preventDefault()}>
                    <InputField type="password" label="Mật khẩu cũ" required/>
                    <InputField type="password" label="Mật khẩu mới" required/>
                    <InputField type="password" label="Nhập lại mật khẩu mới" required/>
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
