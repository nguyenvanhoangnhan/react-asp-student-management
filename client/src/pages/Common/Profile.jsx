import React, { useEffect, useState } from "react";
import { BsAppIndicator, BsPencil } from "react-icons/bs";
import ChangePasswordModal from "../../components/ChangePasswordModal";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import { Button, Form, Input, Switch as AntSwitch } from "antd";
import axios from "axios";
import MsgModal from '../../components/MsgModal';



export default function Profile({ user, handleLogout, setLoading }) {
    document.title = "Thông tin cá nhân";

    const [modal, setModal] = useState({
        isShow: false,
        Fn: () => { },
        isDanger: false,
        msg: '',
    })

    const [info, setInfo] = useState({
        userInformation: {
            userId: "",
            name: "",
            dob: "1/1/1900",
            phoneNumber: "",
            email: "",
            gender: true,
            imageUrl: "",
        },
        classroomName: "",
        educationalProgram: {
            educationalProgramId: "",
            name: "",
        },
        faculty: {
            facultyId: "",
            name: "",
        },
    });

    const [isEditing, setIsEditing] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/user/${user.name}`); //user.name = username = id
            setInfo(data);
        }
        catch (err) {
            alert("Không thể kết nối đến server")
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {        
        fetchData();
    }, []);



    const handleEdit = async (e) => {
        const data = {
            name: info.userInformation.name,
            dob: info.userInformation.dob,
            phoneNumber: e.phoneNumber,
            email: e.email,
            gender: info.userInformation.gender,
        };
        setLoading(true)
        try {
            await axios.put(`/api/user/${user.name}`, data) //user.name = userId
            fetchData();
            setIsEditing(false);
        } catch (err) {
            alert("Không thể kết nối đến server")
        } finally {
            setLoading(false);
        }
    };
    return (
        <div id="profile">
            <MsgModal msg={modal.msg} Fn={modal.Fn} show={modal.isShow} danger={modal.isDanger} />
            <Switch>
                <Route exact path="/auth/profile/change-password">
                    <ChangePasswordModal
                        user={user}
                        handleLogout={handleLogout}
                    />
                </Route>
            </Switch>
            <h3 className="title">THÔNG TIN CÁ NHÂN</h3>
            <div className="profile-content">
                <div className="profile-content-left">
                    <div className="avatar">
                    {user.role === "Student" &&
                            <img src={`https://res.cloudinary.com/hungsvdut2k2/image/upload/v1656735851/${user.name.substring(0, 3)}/${user.name}.jpg`} alt="#" />
                        }
                        {user.role === "Teacher" &&
                            <img src={`https://res.cloudinary.com/hungsvdut2k2/image/upload/v1656735851/${'Teacher'}/${user.name}.jpg`} alt="#" />
                        }
                        {
                            user.role === "Admin" &&
                            <img src="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg" alt="#" />
                        }
                        {/* <div className="avatar-edit">
                            <BsPencil />
                        </div> */}
                    </div>
                    <Link to="/auth/profile/change-password">
                        <Button size="large" type="default">
                            Đổi mật khẩu
                        </Button>
                    </Link>
                </div>
                <div className="profile-content-right flex flex-col items-end relative">
                    <div className="toggle-edit flex justify-center items-center">
                        Chỉnh sửa thông tin &nbsp;&nbsp;
                        <AntSwitch
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                            className="w-16"
                            onChange={(e) => setIsEditing(e)}
                            checked={isEditing}
                        />
                    </div>

                    <div className="personal-information w-full">
                        <ul>
                            <li>
                                <div>Họ Tên</div>
                                <div>{info.userInformation.name}</div>
                            </li>
                            <li>
                                <div>Giới tính</div>
                                <div>
                                    {info.userInformation.gender ? "Nam" : "Nữ"}
                                </div>
                            </li>
                            <li>
                                <div>Ngày sinh</div>
                                <div>{info.userInformation.dob}</div>
                            </li>

                            {isEditing ? (
                                <Form
                                    onFinish={handleEdit}
                                    initialValues={{
                                        email: info.userInformation.email,
                                        phoneNumber:
                                            info.userInformation.phoneNumber,
                                    }}
                                >
                                    <li>
                                        <div>Điện thoại</div>
                                        <div>
                                            <Form.Item
                                                name="phoneNumber"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Bạn chưa nhập SĐT!",
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    size="small"
                                                    className="w-96"
                                                />
                                            </Form.Item>
                                        </div>
                                    </li>
                                    <li>
                                        <div>Email</div>
                                        <div>
                                            <Form.Item
                                                name="email"
                                                rules={[
                                                    {
                                                        required: true,
                                                        type: "email",
                                                        message:
                                                            "Bạn chưa nhập email!",
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    size="small"
                                                    className="w-96"
                                                />
                                            </Form.Item>
                                        </div>
                                    </li>
                                    <li className="absolute -bottom-10">
                                        <div></div>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                            >
                                                Lưu thông tin
                                            </Button>
                                        </Form.Item>
                                    </li>
                                </Form>
                            ) : (
                                <>
                                    <li>
                                        <div>Điện thoại</div>
                                        <div>
                                            {info.userInformation.phoneNumber}
                                        </div>
                                    </li>
                                    <li>
                                        <div>Email</div>
                                        <div>{info.userInformation.email}</div>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    <hr />
                    <div className="school-information w-full">
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
