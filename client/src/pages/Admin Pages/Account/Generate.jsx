import React, { useRef, useState } from "react";
import { Form, Upload, Button, Table, Tooltip } from "antd";
import { UploadOutlined, DownloadOutlined, CheckOutlined } from "@ant-design/icons";
import { BsCheck2 } from "react-icons/bs";
import {
    read as xlsxRead,
    utils as xlsxUtils,
    write as xlsxWrite,
    writeFile as xlsxWriteFile,
} from "xlsx";
import axios from "axios";
import MsgModal from "../../../components/MsgModal";


export default function GenerateAccounts({setLoading}) {
    document.title = "Sinh tài khoản"
    const uploadRef = useRef(null);
    const [data, setData] = useState(null);
    const [success, setSuccess] = useState(false);
    const [file, setFile] = useState(   null);
    const [uploadFileList, setUploadFileList] = useState([]); 
    const [uploadMsg, setUploadMsg] = useState(null);
    const [modal, setModal] = useState({
        isShow: false,
        Fn: () => { },
        isDanger: false,
        msg: '',
    })

    const responseColumns = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            // width: "80px",
            render: (name) => (
                <Tooltip placement="topLeft" title={name}>
                    {name}
                </Tooltip>
            ),
        },
        {
            title: "Lớp",
            dataIndex: "className",
            key: "className",
            // width: "18%",
            ellipsis: {
                showTitle: false,
            },
            render: (className) => (
                <Tooltip placement="topLeft" title={className}>
                    {className}
                </Tooltip>
            ),
        },
        
        {
            title: "Tài khoản",
            dataIndex: "username",
            key: "username",
            ellipsis: {
                showTitle: false,
            },
            // width: "30%",
            render: (data) => (
                <Tooltip placement="topLeft" title={data}>
                    {data}
                </Tooltip>
            ),
        },
        {
            title: "Mật khẩu",
            dataIndex: "password",
            key: "password",
            ellipsis: {
                showTitle: false,
            },
            render: (data) => (
                <Tooltip placement="topLeft" title={data}>
                    {data}
                </Tooltip>
            ),
        },
    ];

    const onChangeHandle = async (e) => {
        setUploadFileList(e.fileList);
        if (e.fileList.length === 0) {
            setFile(null);
            setUploadMsg("You haven't upload any file yet")
            return;
        }
        if (e.fileList.length > 1) {
            setFile(null);
            setUploadMsg("Only accept 1 .xlsx file");
            return;
        }
        if (e.fileList[0].name.split(".").slice(-1).pop() !== "xlsx") {
            setUploadMsg("Only accept .xlsx file");
            setFile(null);
            return;
        }
        setUploadMsg(null)
        console.log(e.fileList[0]);
        setFile(e.fileList[0].originFileObj)
    };

    const handleSubmit = (e) => {
        if (file != null) {
            setLoading(true);
            console.log(file)
            const formData = new FormData();
            formData.append("files", file);
            formData.append("fileName", file.name);
            console.log(formData);
            // post file to api
            axios.post("/api/account/upload-file", formData).then((res) => {
                console.log(res.data);
                
                setData(res.data.map((item, index) => {
                    return {
                        key: index,
                        name: item.name,
                        className: item.className,
                        username: item.account.username,
                        password: item.account.password,
                    };
                }));
                setSuccess(true);
            }).catch(err => {
                setModal({
                    isShow: true,
                    Fn: () => setModal({...modal, isShow: false}),
                    isDanger: true,
                    msg: 'Sinh tài khoản thất bại!'
                })
                console.error("error: ", err);
            }).finally(() => {
                setLoading(false)
            })
        }
    };

    // Convert JSON stored in 'data' -> .xlsx file and download
    const handleDownloadXlsx = (e) => {
        if (data === null) {
            return;
        }
        JSONtoExcelFile(data);
    };

    // clear form, back to initial state
    const handleFinish = (e) => {
        setSuccess(false)
        setFile(null)
        setUploadFileList([])
        setData(null)
    }

    const JSONtoExcelFile = (json) => {
        try {
            const workSheet = xlsxUtils.json_to_sheet(json);
            const workBook = xlsxUtils.book_new();
            xlsxUtils.book_append_sheet(workBook, workSheet);
            // Gen buffer
            xlsxWrite(workBook, { bookType: "xlsx", type: "buffer" });
            // binary string
            xlsxWrite(workBook, { bookType: "xlsx", type: "binary" });
            // download
            xlsxWriteFile(workBook, `accountsData${Date.now()}.xlsx`);
        } catch (err) {
            console.error(err);
        }
    };

    const excelFileToJSON = (file) => {
        try {
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = (e) => {
                var data = e.target.result;
                var workbook = xlsxRead(data, {
                    type: "binary",
                });
                var result = {};

                var firstSheet = workbook.SheetNames[0];
                console.log("firstSheet:", firstSheet);
                var roa = xlsxUtils.sheet_to_row_object_array(
                    workbook.Sheets[firstSheet]
                );
                if (roa.length > 0) {
                    result = roa;
                }
                return result;
            };
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    return (
        <div id="gen-accounts">
            <MsgModal msg={modal.msg} Fn={modal.Fn} show={modal.isShow} danger={modal.isDanger} />
            <div className="top flex flex-col xl:flex-row xl:gap-10 w-96 xl:w-full mb-5">
                <Form size="default" onFinish={handleSubmit} layout="vertical">
                    <Form.Item label="File thông tin tài khoản" required>
                        <Upload
                            name="xlsx-file"
                            onChange={(e) => onChangeHandle(e)}
                            ref={uploadRef}
                            listType="picture"
                            beforeUpload={() => {
                                return false;
                            }}
                            accept=".xlsx"
                            fileList={uploadFileList}
                            disabled={success}
                        >
                            <Button icon={<UploadOutlined />}
                                disabled={success}
                            >
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
                            disabled={!file || success}
                        >
                            Sinh
                        </Button>
                    </Form.Item>
                </Form>
                {success && (
                    <div className="success flex flex-col justify-center items-center flex-1">
                        <span className="text-green-700 text-lg mb-3">
                            Sinh tài khoản thành công! <CheckOutlined />{" "}
                        </span>
                        <div className="btns flex flex-col gap-2">
                            <Button
                                className="download-btn"
                                type="primary"
                                icon={<DownloadOutlined />}
                                onClick={handleDownloadXlsx}
                            >
                                Tải xuống file .xlsx
                            </Button>
                            <Tooltip placement="right" title={'Trở về form ban đầu'}>
                                <Button
                                    type="primary"
                                    icon={<CheckOutlined /> }
                                    onClick={handleFinish}
                                >
                                    Hoàn tất
                                </Button>
                            </Tooltip>
                            
                        </div>
                        
                    </div>
                )}
            </div>
            
            {success && (
                <Table
                    className="response-table"
                    dataSource={data}
                    columns={responseColumns}
                    pagination={{
                        position: ["topRight"],
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "20", "50", "100"],
                    }}
                />
            )}
        </div>
    );
}
