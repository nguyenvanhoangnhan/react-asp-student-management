import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Button, Radio, Select } from "antd";
import MsgModal from "../../../components/MsgModal";

export default function CreateCourse({setLoading}) {
    document.title = "Tạo tài khoản"
    const [formData, setFormData] = useState({
        name: "",
        faculty: "",
        teacher: "",
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


    // const handleSelectFaculty = (id) => {
    //     setFormData({
    //         ...formData,
    //         faculty: id,
    //     })

    //     if (id === 0) {
    //         let all = [{
    //             "id": 0,
    //             "name": "Tất cả",
    //             "falcutyId": id,
    //         }];
    //         faculties.forEach(fal => {
    //             all = all.concat(fal.classes)
    //         })
    //         console.log(all)
    //         setClasses(all);
    //         return;
    //     }
    //     setClasses(faculties.filter(fac => fac.facultyId === id)[0].classes)
    // }
    
    // const handleSubmit = (e) => {
    //     console.log(e)
    //     setLoading(true)
    //     let data = {
    //         // "role": 'students' 
    //         "userId": e.id,
    //         "name": e.name,
    //         "dob": "2022-05-20T15:21:10.181Z",
    //         "phoneNumber": "string",
    //         "email": "string",
    //         "gender": (e.gender == 'male' ? true : false),
    //     }
    //     axios
    //         .post(
    //             `/api/user/${e.class}`
    //         ,data)
    //         .then((res) => {
    //             setLoading(false)
    //             console.log(res)
    //             setModal({
    //                 isShow: true,
    //                 Fn: () => setModal({...modal, isShow: false}),
    //                 isDanger: false,
    //                 msg: 'Thêm thành công'
    //             })
    //         })
    //         .catch((err) => {
    //             setLoading(false)
    //             console.error("Error on submit:", err)
    //             setModal({
    //                 isShow: true,
    //                 Fn: () => setModal({...modal, isShow: false}),
    //                 isDanger: true,
    //                 msg: 'Thêm thất bại'
    //             })
    //         })

    // }

    

return (
        <div id="create-account">
            <h3 className="title">Tạo tài khoản</h3>
            <MsgModal msg={modal.msg} Fn={modal.Fn} show={modal.isShow} danger={modal.isDanger} />
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 10,
                }}
                size="default"
                // onFinish={handleSubmit}
            >
                <Form.Item
                    label="Tên học phần"
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
