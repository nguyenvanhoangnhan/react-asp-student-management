import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { BsX } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form, Input } from "antd";
export default function ManageSingleUserModal({handleDeleteClass}) {
    let { id } = useParams();
    const history = useHistory();
    const goBack = () => {
    history.push("/auth/manage-class/list")
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
            .get(`/api/classroom/${id}`)
            .then((res) => {
                setFormData(res.data);
                formRef.current.setFieldsValue({
                    id: id,
                    name: res.data.name,
                });
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleEdit = () => {
        //
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
                    <h4 className="modal-title">Class {id}</h4>
                    <div className="modal-close-icon" onClick={goBack}>
                        <BsX />
                    </div>
                </div>

                <Form
                    // {...formItemLayout}
                    layout='vertical'
                    className="form-user w-96"
                    onFinish={e => {e.preventDefault()}}
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
                        label="Tên lớp"
                        rules={[
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

                    <Form.Item className="mb-0">
                        <Button size="large" onClick={handleEdit} block>Sửa thông tin</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="overlay" onClick={goBack}></div>
        </div>
    );
}
