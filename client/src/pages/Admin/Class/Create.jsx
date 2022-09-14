import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Input, Button, Select } from 'antd'
import MsgModal from '../../../components/MsgModal'

export default function CreateClass({ setLoading }) {
    document.title = 'Tạo lớp sinh hoạt'

    const [faculties, setFaculties] = useState([])
    const [programs, setPrograms] = useState([])
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
                let resFaculties = await axios.get('/api/faculty')
                setFaculties(resFaculties.data)
                let resPrograms = await axios.get('/api/education-program')
                setPrograms(resPrograms.data.filter((item) => item.educationalProgramId !== '0000'))
            } catch (err) {
                console.error('error:', err.message)
                alert('Kết nối tới server thất bại')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        setLoading(true)
        let data = {
            name: e.name,
            facultyId: e.faculty,
            educationalProgramId: e.program
        }
        try {
            await axios.post(`/api/classroom`, data)
            setModal({
                isShow: true,
                Fn: () => setModal({ ...modal, isShow: false }),
                isDanger: false,
                msg: 'Thêm thành công'
            })
        } catch (err) {
            console.error('Error on submit:', err)
            setModal({
                isShow: true,
                Fn: () => setModal({ ...modal, isShow: false }),
                isDanger: true,
                msg: 'Thêm thất bại'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div id="create-account">
            <MsgModal msg={modal.msg} Fn={modal.Fn} show={modal.isShow} danger={modal.isDanger} />
            <Form
                labelCol={{
                    span: 4
                }}
                wrapperCol={{
                    span: 10
                }}
                size="default"
                onFinish={handleSubmit}>
                <Form.Item
                    label="Tên lớp"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa nhập tên!'
                        }
                    ]}>
                    <Input className="name" />
                </Form.Item>

                <Form.Item
                    label="Khoa"
                    name="faculty"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa chọn khoa!'
                        }
                    ]}>
                    <Select>
                        {faculties.map((item) => (
                            <Select.Option key={item.facultyId} value={item.facultyId}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Chương trình đào tạo"
                    name="program"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa chọn chương trình!'
                        }
                    ]}>
                    <Select>
                        {programs.map((item) => (
                            <Select.Option
                                key={item.educationalProgramId}
                                value={item.educationalProgramId}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4
                    }}>
                    <Button type="primary" htmlType="submit">
                        Tạo
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
