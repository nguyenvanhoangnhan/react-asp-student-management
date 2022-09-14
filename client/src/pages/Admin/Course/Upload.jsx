import React, { useRef, useState } from 'react'
import { Form, Upload, Button, Tooltip } from 'antd'
import { UploadOutlined, CheckOutlined } from '@ant-design/icons'
// import {
//     read as xlsxRead,
//     utils as xlsxUtils,
//     write as xlsxWrite,
//     writeFile as xlsxWriteFile
// } from 'xlsx'
import axios from 'axios'
import MsgModal from '../../../components/MsgModal'

export default function UploadCourse({ setLoading }) {
    document.title = 'Upload học phần'
    const uploadRef = useRef(null)
    const [success, setSuccess] = useState(false)
    const [file, setFile] = useState(null)
    const [uploadFileList, setUploadFileList] = useState([])
    const [uploadMsg, setUploadMsg] = useState(null)
    const [modal, setModal] = useState({
        isShow: false,
        Fn: () => {},
        isDanger: false,
        msg: ''
    })

    const onChangeHandle = async (e) => {
        setUploadFileList(e.fileList)
        if (e.fileList.length === 0) {
            setFile(null)
            setUploadMsg("You haven't upload any file yet")
            return
        }
        if (e.fileList.length > 1) {
            setFile(null)
            setUploadMsg('Only accept 1 .xlsx file')
            return
        }
        if (e.fileList[0].name.split('.').slice(-1).pop() !== 'xlsx') {
            setUploadMsg('Only accept .xlsx file')
            setFile(null)
            return
        }
        setUploadMsg(null)
        console.log(e.fileList[0])
        setFile(e.fileList[0].originFileObj)
    }

    const handleSubmit = async () => {
        if (file != null) {
            setLoading(true)
            console.log(file)
            const formData = new FormData()
            formData.append('files', file)
            formData.append('fileName', file.name)
            console.log(formData)
            try {
                await axios.post('/api/course/upload-file', formData)
                setSuccess(true)
            } catch (err) {
                setModal({
                    isShow: true,
                    Fn: () => setModal({ ...modal, isShow: false }),
                    isDanger: true,
                    msg: 'Sinh tài khoản thất bại!'
                })
                console.error('error: ', err)
            } finally {
                setLoading(false)
            }
        }
    }

    // clear form, back to initial state
    const handleFinish = () => {
        setSuccess(false)
        setFile(null)
        setUploadFileList([])
    }
    return (
        <div id="upload-course">
            <MsgModal msg={modal.msg} Fn={modal.Fn} show={modal.isShow} danger={modal.isDanger} />
            <h4 className="text-blue-500">
                Lưu ý: Nếu học phần chưa tồn tại trong hệ thống, học phần sẽ được tạo (mặc định
                trạng thái Đóng đăng ký). <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nếu học phần đã
                tồn tại trong hệ thống, trạng thái Mở / Đóng đăng ký của học phần sẽ được thay đổi.
            </h4>
            <div className="top flex flex-col xl:flex-row xl:gap-10 w-96 xl:w-full mb-5">
                <Form size="default" onFinish={handleSubmit} layout="vertical">
                    <Form.Item label="File thông tin tài khoản" required>
                        <Upload
                            name="xlsx-file"
                            onChange={(e) => onChangeHandle(e)}
                            ref={uploadRef}
                            listType="picture"
                            beforeUpload={() => {
                                return false
                            }}
                            accept=".xlsx"
                            fileList={uploadFileList}
                            disabled={success}>
                            <Button icon={<UploadOutlined />} disabled={success}>
                                Click to Upload
                            </Button>
                        </Upload>
                        {uploadMsg && <p className="text-red-500 text-center">{uploadMsg}</p>}
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 24 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="gen-btn"
                            block
                            disabled={!file || success}>
                            Sinh
                        </Button>
                    </Form.Item>
                </Form>
                {success && (
                    <div className="success flex flex-col justify-center items-center flex-1">
                        <span className="text-green-700 text-lg mb-3">
                            Upload thành công! <CheckOutlined />{' '}
                        </span>
                        <div className="btns flex flex-col gap-2">
                            <Tooltip placement="right" title={'Trở về form ban đầu'}>
                                <Button
                                    type="primary"
                                    icon={<CheckOutlined />}
                                    onClick={handleFinish}>
                                    Hoàn tất
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
