import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Form, Input, InputNumber, Button, Radio, Select } from "antd";
import MsgModal from "../../../components/MsgModal";
import { BsAppIndicator } from "react-icons/bs";
import { type } from "@testing-library/user-event/dist/type";

export default function CreateCourse({setLoading}) {
    document.title = "Tạo học phần"

    const [courses, setCourses] = useState([{
        courseId: "",
        name: "Không",
        credits: 2,
        requiredCourseId: "",
        isAvailable: null
    }])
    const [modal, setModal] = useState({
        isShow: false,
        Fn: () => { },
        isDanger: false,
        msg: '',
    })
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get('/api/course')
                console.log(res);
                setCourses(courses.concat(res.data))
            } catch (err) {
                console.log(err)
            }
            setLoading(false);
        }
        fetchData();
        
    }, [])

    const handleSubmit = async (e) => {
        console.log(e);
        setLoading(true);
        try {
            const data = {
                courseId: e.courseId,
                name: e.name,
                credits: e.credits,
                requiredCourseId: e.requiredCourse,
            }
            
            const res = await axios.post('/api/course', data)
            setModal({
                isShow: true,
                Fn: () => setModal({...modal, isShow: false}),
                isDanger: false,
                msg: 'Thêm thành công'
            })
        } catch (err) {
            console.log(err)
            setModal({
                isShow: true,
                Fn: () => setModal({...modal, isShow: false}),
                isDanger: true,
                msg: 'Thêm thất bại'
            })
        }
        setLoading(false);
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
                    label="Mã học phần"
                    name="courseId"
                    rules={[
                        {
                            required: true,
                            message: "Bạn chưa nhập mã!",
                        },
                    ]}
                >
                    <Input className="courseId" />
                </Form.Item>
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
                    <Input className="name" />
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
                <Form.Item
                    label="Học phần học trước"
                    name="requiredCourse"
                >
                    <Select showSearch>
                        {courses.map((item) => (
                            <Select.Option key={item.courseId} value={item.courseId}>
                                {item.courseId} {item.courseId !== "" && " - "} {item.name}
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
