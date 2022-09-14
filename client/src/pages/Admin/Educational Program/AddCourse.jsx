import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Input, Button, Select } from 'antd'
import MsgModal from '../../../components/MsgModal'
import { SwapLeftOutlined } from '@ant-design/icons'

import { useHistory, useParams } from 'react-router-dom'
const { Option } = Select
export default function AddCourseToProgram({ setLoading }) {
    document.title = 'Tạo lớp học phần'
    let { id } = useParams()
    let navigate = useHistory()
    const [courses, setCourses] = useState([])
    const [program, setProgram] = useState({
        educationalProgramId: '',
        name: ''
    })
    const [modal, setModal] = useState({
        isShow: false,
        Fn: () => {},
        isDanger: false,
        msg: ''
    })
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data: programData } = await axios.get(`/api/education-program/${id}`)
                setProgram(programData)

                const { data: coursesData } = await axios.get('/api/course')
                setCourses(coursesData)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        const data = {
            courseId: e.course,
            educationalProgramId: id,
            semester: e.semester
        }
        setLoading(true)
        try {
            await axios.post('/api/education-program/course', data)

            setModal({
                isShow: true,
                Fn: () => setModal({ ...modal, isShow: false }),
                isDanger: false,
                msg: 'Thêm thành công'
            })
        } catch (err) {
            console.log(err)

            setModal({
                isShow: true,
                Fn: () => setModal({ ...modal, isShow: false }),
                isDanger: true,
                msg: 'Thêm thất bại.\n'
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <div id="add-course-to-program">
            <MsgModal msg={modal.msg} Fn={modal.Fn} show={modal.isShow} danger={modal.isDanger} />
            <Button
                icon={<SwapLeftOutlined />}
                onClick={() => {
                    navigate.push(`/auth/manage-program/list/program/${id}`)
                }}
                className="mb-3">
                Quay lại
            </Button>
            <Form
                labelCol={{
                    span: 4
                }}
                wrapperCol={{
                    span: 10
                }}
                size="default"
                onFinish={handleSubmit}
                initialValues={{ sessions: 1 }}>
                <div className="ant-row ant-form-item mb-3">
                    <div className="ant-col ant-col-4 ant-form-item-label pr-2">Chương trình :</div>
                    <div className="ant-col ant-col-10 ant-form-item-control">
                        <div className="ant-form-item-control-input items-start">
                            {id} - {program.name}
                        </div>
                    </div>
                </div>
                <Form.Item
                    label="Học phần"
                    name="course"
                    rules={[{ required: true, message: 'Bạn chưa chọn học phần!' }]}>
                    <Select
                        showSearch
                        placeholder="Chọn học phần"
                        filterOption={(input, option) =>
                            option.children.join(' ').toLowerCase().includes(input.toLowerCase())
                        }>
                        {courses.map((item) => (
                            <Option key={item.courseId} value={item.courseId}>
                                {item.courseId} - {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Học kì"
                    name="semester"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa nhập học kì!'
                        }
                    ]}>
                    <Input className="semester" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4
                    }}>
                    <Button type="primary" htmlType="submit">
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
