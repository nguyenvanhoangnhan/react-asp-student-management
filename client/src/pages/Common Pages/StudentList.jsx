import React, { useEffect, useState, useRef } from "react";
import { Table, Tooltip, Select } from "antd";
import axios from "axios";
export default function Students({ setLoading }) {
    document.title = "Danh sách sinh viên";

    const imgLink =
        "https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg";
    const [data, setData] = useState([]);
    const columns = [
        {
            title: "Ảnh",
            dataIndex: "avatar",
            key: "avatar",
            width: "80px",
        },
        {
            title: "MSSV",
            dataIndex: "studentID",
            key: "studentID",
            width: "18%",
            ellipsis: {
                showTitle: false,
            },
            render: (studentID) => (
                <Tooltip placement="topLeft" title={studentID}>
                    {studentID}
                </Tooltip>
            ),
        },
        {
            title: "Họ tên",
            dataIndex: "name",
            key: "name",
            ellipsis: {
                showTitle: false,
            },
            width: "30%",
            render: (name) => (
                <Tooltip placement="topLeft" title={name}>
                    {name}
                </Tooltip>
            ),
        },
        {
            title: "Lớp SH",
            dataIndex: "studentClass",
            key: "studentClass",
            ellipsis: {
                showTitle: false,
            },
            render: (studentClass) => (
                <Tooltip placement="topLeft" title={studentClass}>
                    {studentClass}
                </Tooltip>
            ),
        },
    ];

    const [faculties, setFaculties] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get("/api/faculty/classes")
            .then((res) => {
                setFaculties([
                    { facultyId: 0, facultyName: "Tất cả", classes: [] },
                    ...res.data,
                ]);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.error("Error on fetching faculties:", err);
            });
    }, []);

    const handleSelectFaculty = (id) => {
        if (id === 0) {
            let all = [
                {
                    id: 0,
                    name: "Tất cả",
                    facultyId: id,
                },
            ];
            faculties.forEach((fal) => {
                all = all.concat(fal.classes);
            });
            setClasses(all);
            return;
        }
        setClasses(
            [{ id: 0, name: "Tất cả", facultyId: id }].concat(
                faculties.filter((fac) => fac.facultyId === id)[0].classes
            )
        );
    };

    const handleSelectClass = (data) => {
        setLoading(true);
        data = JSON.parse(data);

        //handle select multiple class
        if (data.id === 0) { 
            let requestUrl = ``;
            if (data.facultyId === 0) {
                requestUrl = `/api/user/`;
            } else {
                requestUrl = `/api/user/faculty/${data.facultyId}`;
            }
            axios
                .get(requestUrl)
                .then((res) => {
                    let tempData = [];
                    res.data.forEach((singleClass) => {
                        singleClass.students.forEach((student) => {
                            tempData.push({
                                key: student.userId,
                                avatar: (
                                    <img src={imgLink} className="students-table-avatar" alt="#" />
                                ),
                                name: student.name,
                                studentID: student.userId,
                                studentClass: singleClass.name,
                            });
                        });
                    });
                    setData(tempData);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    console.error("Error on fetching students:", err);
                });
            return;
        }

        // handle select single class
        axios
            .get(`/api/user/class/${data.id}`)
            .then((res) => {
                let tempData = [];
                let currentClassName = data.name;
                res.data.forEach((item) => {
                    tempData.push({
                        key: item.userId,
                        avatar: (
                            <img src={imgLink} className="students-table-avatar" alt="#" />
                        ),
                        name: item.name,
                        studentID: item.userId,
                        studentClass: currentClassName,
                    });
                });
                setData(tempData);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.error("Error on fetching students:", err);
            });
    };

    return (
        <div id="students">
            <h3 className="title">STUDENTS</h3>
            {/* Faculty */}
            <div className="select-field mb-3">
                <Select
                    className="select-faculty"
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
                {/* Class */}
                <Select
                    className="select-class"
                    showSearch
                    placeholder="Chọn một lớp"
                    optionFilterProp="children"
                    onChange={handleSelectClass}
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {classes.map((item) => (
                        <Select.Option
                            key={item.id}
                            value={JSON.stringify(item)}
                        >
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            </div>

            <Table
                className="students-table"
                dataSource={data}
                columns={columns}
                pagination={{
                    position: ["topRight"],
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],
                }}
            />
        </div>
    );
}
