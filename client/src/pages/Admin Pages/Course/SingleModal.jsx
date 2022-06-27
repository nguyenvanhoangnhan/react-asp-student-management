import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { BsX } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form, Input, InputNumber } from "antd";
export default function ManageSingleUserModal({handleDeleteClass}) {
    let { id } = useParams();
    const history = useHistory();
    const goBack = () => {
    history.push("/auth/manage-course/list")
    };
    const [formData, setFormData] = useState({
        courseId: "",
        name: "",
        requireId: "",
        credits: ""
    }); 


    const [loading, setLoading] = useState(true);
    const formRef = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/course/${id}`)
                setFormData(res.data);
                formRef.current.setFieldsValue({
                    courseId: id,
                    name: res.data.name,
                    credits: res.data.credits,
                });
            } catch (err)  {
                console.log(err);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }    
        fetchData()
    }, []);

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
                    <h4 className="modal-title">Học phần #{id}</h4>
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
                        name="courseId"
                        label="Mã HP"
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
                        label="Tên HP"
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
                    label="Số tín chỉ"
                    name="credits"
                    rules={[
                        {   
                            required: true,
                            message: "Bạn chưa nhập số tín chỉ!",
                        },
                    ]}  
                    >
                    <InputNumber min={0} name="credits" className="credits"  />
                </Form.Item>

                    <Form.Item className="mb-0">
                        <Button size="large" block>Sửa thông tin</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="overlay" onClick={goBack}></div>
        </div>
    );
}
