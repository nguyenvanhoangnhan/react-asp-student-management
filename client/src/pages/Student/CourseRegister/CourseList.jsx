import React, { useEffect, useState, useRef } from "react";
import { Table, Tooltip, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { Switch, useRouteMatch, Route, useHistory } from "react-router-dom";
import InputField from "../../../components/InputField";
export default function CourseList({ setLoading, user }) {
    document.title = "Danh sách học phần";
    let { path, url } = useRouteMatch();
    let navigate = useHistory();

    const columns = [
        {
            title: "Mã HP",
            dataIndex: "courseId",
            key: "courseId",
            width: "200px",
            ellipsis: {
                showTitle: false,
            },
            render: (courseId) => (
                <Tooltip placement="topLeft" title={courseId}>
                    {courseId}
                </Tooltip>
            ),
        },
        {
            title: "Tên HP",
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
            title: "TC",
            dataIndex: "credits",
            key: "credits",
            ellipsis: {
                showTitle: false,
            },
            width: "60px",
            render: (credits) => (
                <Tooltip placement="topLeft" title={credits}>
                    {credits}
                </Tooltip>
            ),
        },
        {
            title: "Học phần học trước",
            dataIndex: "requiredCourseId",
            key: "requiredCourseId",
            ellipsis: {
                showTitle: false,
            },
            render: (requiredCourseId) => {
                let requireCourse = courses.find(
                    (course) => course.courseId === requiredCourseId
                );
                return (
                    <Tooltip placement="topLeft" title={requiredCourseId}>
                        {requireCourse &&
                            requireCourse.courseId + " - " + requireCourse.name}
                    </Tooltip>
                );
            },
        },
        {
            title: "Danh sách",
            dataIndex: "courseId",
            key: "delete",
            width: "160px",
            ellipsis: {
                showTitle: false,
            },
            render: (courseId) => {
                return (
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={() => {
                            navigate.push(
                                `/auth/course-register/list/${courseId}`
                            );
                        }}
                    >
                        Danh sách
                    </Button>
                );
            },
        },
    ];

    const [searchText, setSearchText] = useState("");
    const [courses, setCourses] = useState([]);
    const inputSearchEl = useRef(null);

    const objectToString = (classObject) => {
        return Object.values(classObject).join(" ");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchText(inputSearchEl.current.value);
    };

    const handleDelete = async (courseId) => {
        try {
            await axios.delete(`/api/course/${courseId}`);
            setCourses(courses.filter((item) => item.courseId !== courseId));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(
                    `/api/course/user/${user.name}`
                );
                setCourses(data);
            } catch (err) {
                console.log(err);
                alert("Không thể kết nối đến server");
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div id="user-list">
            {courses.length === 0 ? (
                <h4 className="text-red-500">Hiện không có học phần nào có thể đăng ký</h4>
            ) : (
                <>
                    <form
                        onSubmit={handleSearch}
                        action=""
                        className="mx-auto w-96 courses-search items-end flex mb-3"
                    >
                        <InputField
                            type="text"
                            label="Tìm kiếm"
                            ref={inputSearchEl}
                        />
                        <Button
                            type="primary"
                            size="medium"
                            htmlType="submit"
                            className="ml-5"
                        >
                            Search
                        </Button>
                    </form>
                    <Table
                        className="students-table"
                        dataSource={courses.filter(
                            (item) =>
                                objectToString(item)
                                    .toLowerCase()
                                    .indexOf(searchText.toLowerCase()) >= 0
                        )}
                        columns={columns}
                        pagination={{
                            position: ["topRight"],
                            defaultPageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: ["10", "20", "50", "100"],
                        }}
                        rowKey="courseId"
                    />{" "}
                </>
            )}
        </div>
    );
}
