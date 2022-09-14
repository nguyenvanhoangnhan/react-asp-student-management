import { React, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
    BsPerson,
    BsTrophy,
    BsDoorOpen,
    BsChevronCompactLeft,
    BsCalendarWeek,
    BsChevronCompactRight,
    BsPersonBoundingBox,
    BsJournalBookmarkFill,
    BsDoorClosed,
    BsFillMenuButtonFill
} from 'react-icons/bs'
import { BiBuildingHouse } from 'react-icons/bi'
import { Tooltip } from 'antd'
export default function Sidebar({ url, user }) {
    const menuItems = [
        //student
        {
            id: 'menu-item-schedule',
            name: 'Lịch học',
            iconComponent: <BsCalendarWeek className="BsIcon" />,
            link: '/schedule',
            role: 'Student'
        },
        {
            id: 'menu-item-list',
            name: 'Danh sách',
            iconComponent: <BsPerson className="BsIcon" />,
            link: '/user-list',
            role: 'Student'
        },
        {
            id: 'menu-item-course-register',
            name: 'Đăng ký học phần',
            iconComponent: <BsDoorOpen className="BsIcon" />,
            link: '/course-register',
            role: 'Student'
        },
        {
            id: 'menu-item-educational-program',
            name: 'Chương trình đào tạo',
            iconComponent: <BsFillMenuButtonFill className="BsIcon" />,
            link: '/educational-program',
            role: 'Student'
        },
        {
            id: 'menu-item-score',
            name: 'Điểm',
            iconComponent: <BsTrophy className="BsIcon" />,
            link: '/score',
            role: 'Student'
        },

        //admin
        {
            id: 'menu-item-manage-account',
            name: 'Quản lý tài khoản',
            iconComponent: <BsPersonBoundingBox className="BsIcon" />,
            link: '/manage-account',
            role: 'Admin'
        },
        {
            id: 'menu-item-manage-class',
            name: 'Quản lý lớp SH',
            iconComponent: <BsDoorClosed className="BsIcon" />,
            link: '/manage-class',
            role: 'Admin'
        },
        {
            id: 'menu-item-manage-course',
            name: 'Quản lý học phần',
            iconComponent: <BsJournalBookmarkFill className="BsIcon" />,
            link: '/manage-course',
            role: 'Admin'
        },
        {
            id: 'menu-item-manage-course-classroom',
            name: 'Quản lý lớp học phần',
            iconComponent: <BiBuildingHouse className="BsIcon" />,
            link: '/manage-course-classroom',
            role: 'Admin'
        },
        {
            id: 'menu-item-manage-program',
            name: 'Quản lý chương trình học',
            iconComponent: <BsFillMenuButtonFill className="BsIcon" />,
            link: '/manage-program',
            role: 'Admin'
        },

        //teacher
        {
            id: 'menu-item-schedule',
            name: 'Lịch giảng dạy',
            iconComponent: <BsCalendarWeek className="BsIcon" />,
            link: '/schedule',
            role: 'Teacher'
        },
        {
            id: 'menu-item-user-list',
            name: 'Danh sách',
            iconComponent: <BsPerson className="BsIcon" />,
            link: '/user-list',
            role: 'Teacher'
        },
        {
            id: 'menu-item-course-in-charge',
            name: 'Học phần phụ trách',
            iconComponent: <BsJournalBookmarkFill className="BsIcon" />,
            link: '/course-in-charge',
            role: 'Teacher'
        }
    ]
    const [isMinimize, setIsMinimize] = useState(false)
    const handleSizing = () => {
        setIsMinimize(!isMinimize)
    }
    return (
        <div id="sidebar" className={isMinimize ? 'minimize' : ''}>
            <div className="logo">DUT</div>
            <ul className="sidebar-menu">
                {menuItems.map(
                    (menuItem) =>
                        (menuItem.role === user.role || menuItem.role === 'all') && (
                            <Tooltip
                                placement="right"
                                title={isMinimize ? menuItem.name : null}
                                key={menuItem.id}>
                                <li className="sidebar-menu-item">
                                    <NavLink to={`${url}${menuItem.link}`}>
                                        <span className="sidebar-menu-item-icon">
                                            {menuItem.iconComponent}
                                        </span>
                                        <span className="sidebar-menu-item-name">
                                            {menuItem.name}
                                        </span>
                                    </NavLink>
                                </li>
                            </Tooltip>
                        )
                )}
            </ul>
            <div className="minimize-maximize-btn" onClick={handleSizing}>
                {isMinimize ? <BsChevronCompactRight /> : <BsChevronCompactLeft />}
            </div>
        </div>
    )
}
