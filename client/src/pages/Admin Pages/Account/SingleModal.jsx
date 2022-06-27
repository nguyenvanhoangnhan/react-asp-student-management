import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { BsX } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form, Input, Radio } from "antd";
export default function ManageSingleUserModal({handleDeleteUser}) {
    let { id } = useParams();
    const history = useHistory();
    const goBack = () => {
        history.push('/auth/manage-account/list/');
    };

    const [loading, setLoading] = useState(true);
    const formRef = useRef(null);
    useEffect(() => {
        axios
            .get(`/api/user/${id}`)
            .then((res) => {
                console.log(res.data)
                formRef.current.setFieldsValue({
                    id: id,
                    name: res.data.userInformation.name,
                    dob: res.data.userInformation.dob,
                    phoneNumber: res.data.userInformation.phoneNumber,
                    email: res.data.userInformation.email,
                    gender: (res.data.userInformation.gender ? "male" : "female"),
                    faculty: res.data.faculty.name,
                    program: res.data.educationalProgram.name,
                    classroom: res.data.classroomName,
                });
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                window.location.href = "/auth/manage-account/list/"
            });
    }, []);

    const handleEdit = async (e) => {
        console.log(e);
        try {
            await axios.put(`/api/user/${id}`, {
                name: e.name,
                dob: e.dob,
                phoneNumber: e.phoneNumber,
                email: e.email,
                gender: (e === "male" ? true : false) 
            })
            window.location.href = "/auth/manage-account/list/"
        } catch (err) {
            console.error("err: ", err);
        }
    }

    return (
        <div id="single-user-manage" className="modal-container">
            {loading && (
                <div className="modal-loading">
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
            <div className="modal">
                <div className="modal-title-bar">
                    <h4 className="modal-title">User {id}</h4>
                    <div className="modal-close-icon" onClick={goBack}>
                        <BsX />
                    </div>
                </div>

                <Form
                    layout='vertical'
                    className="form-user"
                    onFinish={handleEdit}
                    ref={formRef}
                >
                    <Form.Item
                        name="id"
                        label="ID"
                    >
                        <Input
                            value={id}
                            size="medium"
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Tên"
                        rules={[
                            {
                                required: true,
                                message: "Please input !",
                            },
                        ]}
                    >
                        <Input
                            size="medium"
                        />
                    </Form.Item>
                    <Form.Item
                        name="dob"
                        label="Ngày sinh"
                        rules={[
                            {
                                required: true,
                                message: "Please input !",
                            },
                        ]}
                    >
                        <Input
                            size="medium"
                        />
                    </Form.Item>
                    <Form.Item
                        name="phoneNumber"
                        label="SĐT"
                        rules={[
                            {
                                required: true,
                                message: "Please input !",
                            },
                        ]}
                    >
                        <Input
                            size="medium"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Please input !",
                            },
                        ]}
                    >
                        <Input
                            size="medium"
                        />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Giới tính"
                        rules={[
                            {
                                required: true,
                            message: "Bạn chưa chọn giới tính!",
                            },
                        ]}
                    >
                        <Radio.Group
                        >
                            <Radio.Button value="male">Nam</Radio.Button>
                            <Radio.Button value="female">Nữ</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="faculty"
                        label="Khoa"
                    >
                        <Input
                            size="medium"
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        name="classroom"
                        label="Lớp"
                    >
                        <Input
                            size="medium"
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        name="program"
                        label="CTĐT"
                    >
                        <Input
                            size="medium"
                            disabled
                        />
                    </Form.Item>
                    

                    {/* Buttons */}
                    <Form.Item>
                        <Button size="medium" block htmlType="submit">Sửa thông tin</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button size="medium" block>Khôi phục mật khẩu</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button size="medium" block danger onClick={() => { handleDeleteUser(id); goBack() } }>Xóa</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="overlay" onClick={goBack}></div>
        </div>
    );
}
