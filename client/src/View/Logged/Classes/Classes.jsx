import { useState, useRef, React } from "react";
import { Button, Table, Tooltip } from "antd";
import InputField from "../../../Components/InputField";
import Input from "rc-input";

export default function Classes() {
    const dataSource = [
        {
            key: "1",
            classID: "102.123455.20.99",
            nameOfClass: "Lập trình .NET",
            lectureName: "Đặng Hoài Phương",
            classSchedule: "T4 8-9",
        },
        {
            key: "2",
            classID: "102.123456.20.99",
            nameOfClass: "Lý thuyết thông tin",
            lectureName: "Ninh Khánh Duy",
            classSchedule: "T3 6-9",
        },
        {
            key: "3",
            classID: "102.123456.20.99",
            nameOfClass: "Lý thuyết thông tin",
            lectureName: "Ninh Khánh Duy",
            classSchedule: "T3 6-9",
        },
        {
            key: "4",
            classID: "102.123456.20.99",
            nameOfClass: "Lý thuyết thông tin",
            lectureName: "Ninh Khánh Duy",
            classSchedule: "T3 6-9",
        },
        {
            key: "5",
            classID: "102.123456.20.99",
            nameOfClass: "Lý thuyết thông tin",
            lectureName: "Ninh Khánh Duy",
            classSchedule: "T3 6-9",
        },
        {
            key: "6",
            classID: "102.123456.20.99",
            nameOfClass: "Lý thuyết thông tin",
            lectureName: "Ninh Khánh Duy",
            classSchedule: "T3 6-9",
        },
        {
            key: "7",
            classID: "102.123456.20.99",
            nameOfClass: "Lý thuyết thông tin",
            lectureName: "Ninh Khánh Duy",
            classSchedule: "T3 6-9",
        },
        {
            key: "8",
            classID: "102.123456.20.99",
            nameOfClass: "Lý thuyết thông tin",
            lectureName: "Ninh Khánh Duy",
            classSchedule: "T3 6-9",
        },
        {
            key: "9",
            classID: "102.123456.20.99",
            nameOfClass: "Lý thuyết thông tin",
            lectureName: "Ninh Khánh Duy",
            classSchedule: "T3 6-9",
        },
        {
            key: "10",
            classID: "102.123456.20.99",
            nameOfClass: "Lý thuyết thông tin",
            lectureName: "Ninh Khánh Duy",
            classSchedule: "T3 6-9",
        },
        {
            key: "11",
            classID: "102.123456.20.99",
            nameOfClass: "Lý thuyết thông tin",
            lectureName: "Ninh Khánh Duy",
            classSchedule: "T3 6-9",
        },
        {
            key: "12",
            classID: "102.123456.20.99",
            nameOfClass: "Lý thuyết thông tin",
            lectureName: "Ninh Khánh Duy",
            classSchedule: "T3 6-9",
        },
        {
            key: "13",
            classID: "102.123456.20.99",
            nameOfClass: "Lý thuyết thông tin",
            lectureName: "Ninh Khánh Duy",
            classSchedule: "T3 6-9",
        },
    ];

    const columns = [
        {
            title: "STT",
            align: "center",
            dataIndex: "key",
            key: "key",
            width: "60px",
        },
        {
            title: "Mã học phần",
            dataIndex: "classID",
            key: "classID",
            ellipsis: {
                showTitle: false,
            },
            render: (classID) => (
                <Tooltip placement="topLeft" title={classID}>
                    {classID}
                </Tooltip>
            ),
        },
        {
            title: "Tên học phần",
            dataIndex: "nameOfClass",
            key: "nameOfClass",
            ellipsis: {
                showTitle: false,
            },
            render: (nameOfClass) => (
                <Tooltip placement="topLeft" title={nameOfClass}>
                    {nameOfClass}
                </Tooltip>
            ),
        },
        {
            title: "Giảng viên",
            dataIndex: "lectureName",
            key: "lectureName",
            ellipsis: {
                showTitle: false,
            },
            render: (lectureName) => (
                <Tooltip placement="topLeft" title={lectureName}>
                    {lectureName}
                </Tooltip>
            ),
        },
        {
            title: "Lịch học",
            dataIndex: "classSchedule",
            key: "classSchedule",
            ellipsis: {
                showTitle: false,
            },
            render: (classSchedule) => (
                <Tooltip placement="topLeft" title={classSchedule}>
                    {classSchedule}
                </Tooltip>
            ),
        },
        {
            title: "Đăng ký",
            dataIndex: "classID",
            align: "center",
            key: "registerButton",
            width: "115px",
            render: (classID) => (
                <Button type="primary" size="medium">
                    Đăng ký
                </Button>
            ),
        },
    ];
    
    const inputSearchEl = useRef(null);

const [searchText, setSearchText] = useState("");
    
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchText(inputSearchEl.current.value);
    }

    const objectToString = (classObject) => {
        return Object.values(classObject).join(" ");
    };

    return (
        <div id="classes">
            <h3 className="title">ĐĂNG KÝ THAM GIA LỚP HỌC PHẦN</h3>
            <form onSubmit={handleSearch} action="" className="classes-search">
                <InputField type="text" label="Tìm kiếm" ref={inputSearchEl} />
                <Button type="primary" size="large" htmlType="submit">Search</Button>
            </form>
            <Table
                dataSource={dataSource.filter(
                    (item) =>
                        objectToString(item)
                            .toLowerCase()
                            .indexOf(searchText.toLowerCase()) >= 0
                )}
                columns={columns}
                size="medium"
                pagination={{
                    position: ["topLeft"],
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],
                }}
            />
        </div>
    );
}
