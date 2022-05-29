import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { BsX } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form, Input } from "antd";
export default function ManageSingleUserModal({handleDeleteUser}) {
    let { id } = useParams();
    const history = useHistory();
    const goBack = () => {
        history.goBack();
    };
    const [formData, setFormData] = useState({
        userInformation: {
            name: "",
        },
        classroom: {
            name: "",
        },
    }); 


    const [loading, setLoading] = useState(true);
    const formRef = useRef(null);
    useEffect(() => {
        axios
            .get(`/api/user/${id}`)
            .then((res) => {
                setFormData(res.data);
                formRef.current.setFieldsValue({
                    id: id,
                    name: res.data.userInformation.name,
                    classroom: res.data.classroom.name,
                });
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 24,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 24,
            },
        },
    };

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
                    // {...formItemLayout}
                    layout='vertical'
                    className="form-user w-96"
                    // onFinish={}
                    ref={formRef}
                >
                    <Form.Item
                        name="id"
                        label="ID"
                        rules={[
                            {
                                type: "text",
                                message: "The input is not valid!",
                            },
                            {
                                required: true,
                                message: "Please input !",
                            },
                        ]}
                    >
                        <Input
                            value={id}
                            size="large"
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Tên"
                        rules={[
                            {
                                type: "text",
                                message: "The input is not valid!",
                            },
                            {
                                required: true,
                                message: "Please input !",
                            },
                        ]}
                    >
                        <Input
                            value={formData.name}
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        name="classroom"
                        label="Lớp"
                        rules={[
                            {
                                type: "text",
                                message: "The input is not valid!",
                            },
                            {
                                required: true,
                                message: "Please input !",
                            },
                        ]}
                    >
                        <Input
                            // onChange={handleInput}
                            value={formData.classroom.name}
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" block>Sửa thông tin</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" block>Khôi phục mật khẩu</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" block danger onClick={() => { handleDeleteUser(id); goBack() } }>Xóa</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="overlay" onClick={goBack}></div>
        </div>
    );
}
