import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Input, Button } from 'antd'
import MsgModal from '../../../components/MsgModal'

export default function CreateAccount({ setLoading }) {
    document.title = 'Tạo chương trình học'

    const [modal, setModal] = useState({
        isShow: false,
        Fn: () => {},
        isDanger: false,
        msg: ''
    })
    useEffect(() => {
        //
    }, [])

    const handleSubmit = async (e) => {
        setLoading(true)
        let data = {
            educationalProgramId: e.id,
            name: e.name
        }
        try {
            await axios.post('/api/education-program', data)

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
                    label="Mã chương trình"
                    name="id"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa nhập mã!'
                        }
                    ]}>
                    <Input className="id" />
                </Form.Item>
                <Form.Item
                    label="Tên chương trình"
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
