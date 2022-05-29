import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Button, Select } from "antd";
import MsgModal from "../../../components/MsgModal";

export default function CreateAccount({setLoading}) {
    document.title = "Tạo tài khoản"

    const [faculties, setFaculties] = useState([])
    const [modal, setModal] = useState({
        isShow: false,
        Fn: () => { },
        isDanger: false,
        msg: '',
    })
    useEffect(() => {
        setLoading(true);
        axios
        .get("/api/faculty/classes")
            .then((res) => {
                setLoading(false)
                setFaculties(res.data);
            })
            .catch((err) => {
                setLoading(false)
                console.error("Error on fetching faculties:", err);
            });
    }, [])

    
    const handleSubmit = (e) => {
        setLoading(true)
        let data = {
            nameOfClassroom: e.name,
            facultyId: e.faculty,              
        }
        axios
            .post(`/api/classroom` ,data)
            .then((res) => {
                setLoading(false)
                console.log(res)
                setModal({
                    isShow: true,
                    Fn: () => setModal({...modal, isShow: false}),
                    isDanger: false,
                    msg: 'Thêm thành công'
                })
            })
            .catch((err) => {
                setLoading(false)
                console.error("Error on submit:", err)
                setModal({
                    isShow: true,
                    Fn: () => setModal({...modal, isShow: false}),
                    isDanger: true,
                    msg: 'Thêm thất bại'
                })
            })

    }

    

    return (
        <div id="create-account">
            <MsgModal msg={modal.msg} Fn={modal.Fn} show={modal.isShow} danger={modal.isDanger} />
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 10,
                }}
                size="default"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Tên lớp"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Bạn chưa nhập tên!",
                        },
                    ]}
                >
                    <Input className="name" />
                </Form.Item>
                
                <Form.Item
                    label="Khoa"
                    name="faculty"
                    rules={[
                        {
                            required: true,
                            message: "Bạn chưa chọn khoa!",
                        },
                    ]}
                >
                    <Select>
                        {faculties.map((item) => (
                            <Select.Option key={item.facultyId} value={item.facultyId}>
                                {item.facultyName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Tạo
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
