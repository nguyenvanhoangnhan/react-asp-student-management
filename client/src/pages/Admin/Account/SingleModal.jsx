import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Input, Radio } from "antd";
import { BsX } from "react-icons/bs";
import axios from "axios";
import MsgModal from "../../../components/MsgModal";
export default function ManageSingleUserModal({ handleDeleteUser }) {
    let { id } = useParams();
    const history = useHistory();
    const goBack = () => {
        history.push("/auth/manage-account/list/");
    };
    const [modal, setModal] = useState({
        isShow: false,
        Fn: () => {},
        isDanger: false,
        msg: "",
    });

    const [loading, setLoading] = useState(true);
    const formRef = useRef(null);
    useEffect(() => {
        axios
            .get(`/api/user/${id}`)
            .then((res) => {
                formRef.current.setFieldsValue({
                    id: id,
                    name: res.data.userInformation.name,
                    dob: res.data.userInformation.dob,
                    phoneNumber: res.data.userInformation.phoneNumber,
                    email: res.data.userInformation.email,
                    gender: res.data.userInformation.gender ? "male" : "female",
                    faculty: res.data.faculty.name,
                    program: res.data.educationalProgram.name,
                    classroom: res.data.classroomName,
                });
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                window.location.href = "/auth/manage-account/list/";
            });
    }, []);

    const handleEdit = async (e) => {
        try {
            const res = await axios.put(`/api/user/${id}`, {
                name: e.name,
                dob: e.dob,
                phoneNumber: e.phoneNumber,
                email: e.email,
                gender: e.gender === "male" ? true : false,
            });
            setModal({
                isShow: true,
                Fn: () => (window.location.href = "/auth/manage-account/list/"),
                isDanger: false,
                msg: "Sửa thông tin thành công",
            });
        } catch (err) {
            setModal({
                isShow: true,
                Fn: () => setModal({ ...modal, isShow: false }),
                isDanger: true,
                msg: "Sửa thông tin thất bại",
            });
            console.error("err: ", err);
        } finally {
        }
    };

    const handleResetPassword = async (e) => {
        const randomPwd = (length) => {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
              result += characters.charAt(Math.floor(Math.random() * 
         charactersLength));
           }
           return result;
        }

        const newPwd = randomPwd(10);
        setLoading(true);
        try {
            await axios.put(`/api/account/forgot-password`, {
                userId: id,
                password: newPwd
            })
            setModal({
                isShow: true,
                Fn: () => setModal({ ...modal, isShow: false }),
                isDanger: false,
                msg: `Mật khẩu mới: ${newPwd}`,
            });
        } catch (err) {
            console.log(err);
            setModal({
                isShow: true,
                Fn: () => setModal({ ...modal, isShow: false }),
                isDanger: true,
                msg: "Khôi phục mật khẩu thất bại!",
            }); 
        }
        finally {
            setLoading(false)
        }
          
    }

    return (
        <div id="single-user-manage" className="modal-container">
            <MsgModal
                msg={modal.msg}
                Fn={modal.Fn}
                show={modal.isShow}
                danger={modal.isDanger}
            />

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
                    layout="vertical"
                    className="form-user"
                    onFinish={handleEdit}
                    ref={formRef}
                >
                    <Form.Item name="id" label="ID">
                        <Input value={id} size="medium" disabled />
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
                        <Input size="medium" />
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
                        <Input size="medium" />
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
                        <Input size="medium" />
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
                        <Input size="medium" />
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
                        <Radio.Group>
                            <Radio.Button value="male">Nam</Radio.Button>
                            <Radio.Button value="female">Nữ</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="faculty" label="Khoa">
                        <Input size="medium" disabled />
                    </Form.Item>
                    <Form.Item name="classroom" label="Lớp">
                        <Input size="medium" disabled />
                    </Form.Item>
                    <Form.Item name="program" label="CTĐT">
                        <Input size="medium" disabled />
                    </Form.Item>

                    {/* Buttons */}
                    <Form.Item>
                        <Button size="medium" block htmlType="submit">
                            Sửa thông tin
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button size="medium" onClick={handleResetPassword} block>
                            Khôi phục mật khẩu
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            size="medium"
                            block
                            danger
                            onClick={() => {
                                handleDeleteUser(id);
                                goBack();
                            }}
                        >
                            Xóa
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="overlay" onClick={goBack}></div>
        </div>
    );
}
