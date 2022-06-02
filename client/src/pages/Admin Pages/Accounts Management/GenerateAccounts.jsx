import React, { useRef, useState } from "react";
import { Form, Select, Upload, Button, Table, Tooltip } from "antd";
import { UploadOutlined, DownloadOutlined, CheckOutlined } from "@ant-design/icons";
import { BsCheck2 } from "react-icons/bs";
import {
    read as xlsxRead,
    utils as xlsxUtils,
    write as xlsxWrite,
    writeFile as xlsxWriteFile,
} from "xlsx";
import _ from "lodash";
export default function GenerateAccounts() {
    const uploadRef = useRef(null);
    const [data, setData] = useState(null);
    const [success, setSuccess] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadFileList, setUploadFileList] = useState([]); 
    const [uploadMsg, setUploadMsg] = useState(null);
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
            dataIndex: "account/username",
            key: "account/username",
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
            dataIndex: "account/password",
            key: "account/password",
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
        setFile(e.fileList[0].originFileObj)
    };

    const handleSubmit = (e) => {
        if (file != null) {
            setSuccess(true);
        }
    };

    const handleDownloadXlsx = (e) => {
        JSONtoExcelFile(
            data.map((item) => {
                return {
                    name: item.name,
                    className: item.className,
                    username: item.account.username,
                    password: item.account.password,
                };
            })
        );
    };

    const handleFinish = (e) => {
        setSuccess(false);
        setFile(null);
        setUploadFileList([])
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
                            disabled={!file}
                        >
                            Sinh
                        </Button>
                    </Form.Item>
                </Form>
                {success && (
                    <div className="success flex flex-col justify-center items-center flex-1">
                        <span className="text-green-700 text-lg mb-3">
                            Sinh tài khoản thành công! <BsCheck2 />{" "}
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
                            <Button
                                type="primary"
                                icon={<CheckOutlined /> }
                                onClick={handleFinish}
                            >
                                Hoàn tất
                            </Button>
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
