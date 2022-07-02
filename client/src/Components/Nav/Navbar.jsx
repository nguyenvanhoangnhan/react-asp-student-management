import React from "react";
import { Link } from 'react-router-dom'
import {BsChevronDown, BsBell} from 'react-icons/bs'
const Navbar = ({ user, handleLogout }) => {
    // console.log(user);
    return (
        <nav id="navbar">
            <div className="navbar-left">
            </div>
            <div className="navbar-right">
                {/* <div className="navbar-notification">
                    <BsBell />
                </div> */}
                <div className="navbar-profile">
                    <div className="avatar">
                        {user.name ? 
                            <img src={`https://res.cloudinary.com/hungsvdut2k2/image/upload/v1656735851/${user.name.includes("GV") ? 'Teacher' : user.name.substring(0,3)}/${user.name}.jpg`} className="user-table-avatar" alt="#" />
                            :
                            <img src="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg" alt="#" />
                        }
                    </div>
                    <div className="profile-name-role">
                        <div className="profile-name">{ user.name }</div>
                        <div className="profile-role">{ user.role === "Student" ? "Sinh Viên" : user.role === "Teacher" ? "Giảng viên" : "Admin" }</div>
                    </div>
                    <div className="drop-down-icon">
                        <BsChevronDown value={{ color: 'rgba(0,134,103,1)' }} className='BsIcon' />
                    </div>
                    <ul className="navbar-profile-drop-down">
                        {
                            user.role !== "Admin"
                            &&
                            <Link to="/auth/profile">
                                <li>Thông tin cá nhân</li>
                            </Link>
                        }
                        <li onClick={handleLogout}>Đăng xuất</li> 
                    </ul>
                </div>
            </div>
        </nav>
    )
}
 
export default Navbar;