import React from "react";
import { Link } from 'react-router-dom'
import {BsChevronDown, BsBell} from 'react-icons/bs'
const Navbar = (props) => {
    return (
        <nav id="navbar">
            <div className="navbar-left">
            </div>
            <div className="navbar-right">
                <div className="navbar-notification">
                    <BsBell />
                </div>
                <div className="navbar-profile">
                    <div className="avatar">
                        <img src="https://imgflip.com/s/meme/Doge.jpg" alt="1" />
                    </div>
                    <div className="profile-name-role">
                        <div className="profile-name">Nguyễn Văn Hoàng Nhân</div>
                        <div className="profile-role">Sinh viên</div>
                    </div>
                    <div className="drop-down-icon">
                        <BsChevronDown value={{ color: 'rgba(0,134,103,1)' }} className='BsIcon' />
                    </div>
                    <ul className="navbar-profile-drop-down">
                        <Link to="/auth/profile">
                            <li>Thông tin cá nhân</li>
                        </Link>
                        <li onClick={props.handleLogout}>Đăng xuất</li> 
                    </ul>
                </div>
            </div>
        </nav>
    )
}
 
export default Navbar;