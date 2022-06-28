import React, { useEffect } from "react";
import { BsAppIndicator, BsPencil } from "react-icons/bs";
import ChangePasswordModal from "../../components/ChangePasswordModal";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import { Button } from 'antd';
import axios from "axios";
import { useState } from "react";

export default function Profile({ user, handleLogout }) {
    document.title = "Thông tin cá nhân"

    useEffect(() => {
        console.log(user);
        const fetchData = async () => {
            const { data: userInfor } = await axios.get(`/api/user/${user.name}`) //user.name = username = id
            console.log(userInfor);
            setInfo(userInfor)
        }
        fetchData();
      
    }, [])

    const [info, setInfo] = useState({
        userInformation: {
          userId: "",
          name: "",
          dob: "1/1/1900",
          phoneNumber: "",
          email: "",
          gender: true,
          imageUrl: ""
        },
        classroomName: "",
        educationalProgram: {
          educationalProgramId: "",
          name: ""
        },
        faculty: {
          facultyId: "",
          name: ""
        }
      });
    

    const abcd = {
        name: "Nguyễn Văn Hoàng Nhân",
        dob: "12/03/2002",
        gender: 1,
        cccd: '045202007279',
        phone: "0854 309 456",
        email: "nhan053qt@gmail.com",
        faculty: "Công nghệ thông tin",
        className: "20TCLC_Nhat1",
        studyProgram: 'Công nghệ thông tin - CLC (Tiếng Nhật)',
        admissionDate: "10/2020",
        id: "102200312",
    };
    return (
        <div id="profile">
            <Switch>
                <Route exact path="/auth/profile/change-password">
                    <ChangePasswordModal user={user} handleLogout={handleLogout}  />
                </Route>
            </Switch>
            <h3 className="title">THÔNG TIN CÁ NHÂN</h3>
            <div className="profile-content">
                <div className="profile-content-left">
                    <div className="avatar">
                        <img src="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg" alt="" />
                        <div className="avatar-edit">
                            <BsPencil />
                        </div>
                    </div>
                    <Link to="/auth/profile/change-password">
                        <Button size="large" type="default">Đổi mật khẩu</Button>
                    </Link>
                </div>
                <div className="profile-content-right">
                    <div className="personal-information">
                        <ul>
                            <li>
                                <div>Họ Tên</div>
                                <div>{info.userInformation.name}</div>
                            </li>
                            <li>
                                <div>Ngày sinh</div>
                                <div>{info.userInformation.dob}</div>
                            </li>
                            <li>
                                <div>Giới tính</div>
                                <div>{info.userInformation.gender ? "Nam" : "Nữ"}</div>
                            </li>
                            <li>
                                <div>Điện thoại</div>
                                <div>{info.userInformation.phoneNumber}</div>
                            </li>
                            <li>
                                <div>Email</div>
                                <div>{info.userInformation.email}</div>
                            </li>
                        </ul>
                    </div>
                    <hr />
                    <div className="school-information">
                        <ul>
                            <li>
                                <div>Khoa</div>
                                <div>{info.faculty.name}</div>
                            </li>
                            <li>
                                <div>Lớp</div>
                                <div>{info.classroomName}</div>
                            </li>
                            <li>
                                <div>Chương trình đào tạo</div>
                                <div>{info.educationalProgram.name}</div>
                            </li>
                            <li>
                                <div>MSSV</div>
                                <div>{info.userInformation.userId}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
