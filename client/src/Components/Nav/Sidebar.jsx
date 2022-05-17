import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import { BsHouseDoor, BsPerson, BsTrophy, BsDoorOpen, BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Tooltip } from "antd";
export default function Sidebar(props) {
    const menuItems = [
        {
            id: "menu-item-dashboard",
            name: "Lịch học",
            iconComponent: <BsHouseDoor className="BsIcon" />,
            link: '/schedule',
        },
        {
            id: "menu-item-student-list",
            name: "Danh sách sinh viên",
            iconComponent: <BsPerson className="BsIcon" />,
            link: '/students',
        },
        {
            id: "menu-item-class-list",
            name: "Đăng ký lớp",
            iconComponent: <BsDoorOpen className="BsIcon" />,
            link: '/classes',
        },
        {
            id: "menu-item-score",
            name: "Điểm",
            iconComponent: <BsTrophy className="BsIcon" />,
            link: '/score',
        },
        {
            id: "menu-item-create-account",
            name: "Tạo tài khoản",
            iconComponent: <BsPerson className="BsIcon" />,
            link: '/create-account'
        },
        {
            id: "menu-item-generate-accounts",
            name: "Sinh tài khoản",
            iconComponent: <BsPerson className="BsIcon" />,
            link: '/generate-accounts'
        },
    ];
    const [isMinimize, setIsMinimize] = useState(false);
    const handleSizing = () => {
        setIsMinimize(!isMinimize);
    }
    return (
        <div id="sidebar" className={isMinimize ? "minimize" : ""} >
            <div className="logo">DUT</div>
            <ul className="sidebar-menu">
                {menuItems.map((menuItem) => (
                    <Tooltip
                        placement="right"
                        title={isMinimize ? menuItem.name : null}
                        key={menuItem.id}
                    >
                        <li className="sidebar-menu-item">
                            <NavLink to={`${props.url}${menuItem.link}`}>
                                <span className="sidebar-menu-item-icon">{menuItem.iconComponent}</span>
                                <span className="sidebar-menu-item-name">{menuItem.name}</span>
                            </NavLink>
                        </li>
                    </Tooltip>
                ))}
            </ul>
            <div className="minimize-maximize-btn" onClick={handleSizing}>
                {isMinimize ? <BsChevronCompactRight /> : <BsChevronCompactLeft/>}
            </div>
        </div>
    )
}
