import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Button, Radio, Select } from "antd";
import MsgModal from "../../../components/MsgModal";

export default function CreateAccount({setLoading}) {
    document.title = "Tạo tài khoản"
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        class: "",
        faculty: "",
        gender: "",
        id: "",
    })

    const [faculties, setFaculties] = useState([])
    const [classes, setClasses] = useState([])
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

    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }


    const handleSelectFaculty = (id) => {
        setFormData({
            ...formData,
            faculty: id,
        })

        if (id === 0) {
            let all = [{
                "id": 0,
                "name": "Tất cả",
                "falcutyId": id,
            }];
            faculties.forEach(fal => {
                all = all.concat(fal.classes)
            })
            console.log(all)
            setClasses(all);
            return;
        }
        setClasses(faculties.filter(fac => fac.facultyId === id)[0].classes)
    }
    
    const handleSubmit = (e) => {
        console.log(e)
        setLoading(true)

        let data = {
            "name": e.name,
            "gender": (e.gender === 'male' ? true : false),
            "role": e.role,
            "classroomId": e.class,
        }
        
        axios
            .post(
                `/api/account/register`
            ,data)
            .then((res) => {
                setLoading(false)
                console.log(res)
                setModal({
                    isShow: true,
                    Fn: () => setModal({...modal, isShow: false}),
                    isDanger: false,
                    msg: `Thêm thành công\nTài khoản: ${res.data.username}\nMật khẩu:${res.data.password}`
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
                    label="Họ và tên"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Bạn chưa nhập tên!",
                        },
                    ]}
                >
                    <Input className="name" onChange={handleInput} />
                </Form.Item>
                <Form.Item
                    label="Vai trò"
                    name="role"
                    rules={[
                        {
                            required: true,
                            message: "Bạn chưa chọn vai trò!",
                        },
                    ]}
                >
                    <Select
                        onChange={(value) =>
                            handleInput({
                                target: { id: "role", value: value },
                            })
                        }
                    >
                        <Select.Option value="teacher">
                            Giảng viên
                        </Select.Option>
                        <Select.Option value="student">Sinh viên</Select.Option>
                    </Select>
                </Form.Item>
                {formData.role === "student" && (
                    <>
                        <Form.Item
                            label="Khoa"
                            name="faculty"
                            rules={[
                                {
                                    required: true,
                                    message: "Bạn chưa chọn lớp!",
                                },
                            ]}
                        >
                            <Select
                                className="select-faculties"
                                showSearch
                                placeholder="Chọn khoa"
                                optionFilterProp="children"
                                onChange={handleSelectFaculty}
                                filterOption={(input, option) =>
                                    option.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {faculties.map((item) => (
                                    <Select.Option
                                        key={item.facultyId}
                                        value={item.facultyId}
                                    >
                                        {item.facultyName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Lớp"
                            name="class"
                            rules={[
                                {
                                    required: true,
                                    message: "Bạn chưa chọn lớp!",
                                },
                            ]}
                        >
                            <Select
                                onChange={(value) =>
                                    handleInput({ target: { id: "class", value: value } })
                                }
                            >
                                {classes.map((item) => (
                                    <Select.Option key={item.classroomId} value={item.classroomId}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </>
                )}
                {formData.role === "teacher" && (
                    <Form.Item
                        label="Khoa giảng dạy"
                        name="faculty"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa chọn khoa!",
                            },
                        ]}
                    >
                        <Select
                            onChange={(value) =>
                                handleInput({
                                    target: { id: "faculty", value: value },
                                })
                            }
                        >
                            {faculties.map((item) => (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}

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
                        onChange={(e) =>
                            handleInput({
                                ...e,
                                target: { ...e.target, id: "gender" },
                            })
                        }
                    >
                        <Radio.Button value="male">Nam</Radio.Button>
                        <Radio.Button value="female">Nữ</Radio.Button>
                    </Radio.Group>
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
