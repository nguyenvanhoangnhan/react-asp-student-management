import React from "react";
import { BsPencil } from "react-icons/bs";
import ChangePasswordModal from "../../components/ChangePasswordModal";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import { Button } from 'antd';

export default function Profile() {
    document.title = "Thông tin cá nhân"

    const user = {
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
                    <ChangePasswordModal />
                </Route>
            </Switch>
            <h3 className="title">THÔNG TIN CÁ NHÂN</h3>
            <div className="profile-content">
                <div className="profile-content-left">
                    <div className="avatar">
                        <img src="https://imgflip.com/s/meme/Doge.jpg" alt="" />
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
                                <div>{user.name}</div>
                            </li>
                            <li>
                                <div>Ngày sinh</div>
                                <div>{user.dob}</div>
                            </li>
                            <li>
                                <div>Giới tính</div>
                                <div>{user.gender ? "Nam" : "Nữ"}</div>
                            </li>
                            <li>
                                <div>CCCD</div>
                                <div>{user.cccd}</div>
                            </li>
                            <li>
                                <div>Điện thoại</div>
                                <div>{user.phone}</div>
                            </li>
                            <li>
                                <div>Email</div>
                                <div>{user.email}</div>
                            </li>
                        </ul>
                    </div>
                    <hr />
                    <div className="school-information">
                        <ul>
                            <li>
                                <div>Khoa</div>
                                <div>{user.faculty}</div>
                            </li>
                            <li>
                                <div>Lớp</div>
                                <div>{user.className}</div>
                            </li>
                            <li>
                                <div>Chương trình đào tạo</div>
                                <div>{user.studyProgram}</div>
                            </li>
                            <li>
                                <div>Ngày nhập học</div>
                                <div>{user.admissionDate}</div>
                            </li>
                            <li>
                                <div>MSSV</div>
                                <div>{user.id}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
