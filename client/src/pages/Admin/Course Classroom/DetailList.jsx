import React, { useEffect, useState, useRef } from "react";
import { Table, Tooltip, Select, Button } from "antd";
import {BsArrowLeft, BsCheck2, BsX} from "react-icons/bs"
import axios from "axios";
import ManageSingleCourseModal from "./SingleModal";
import {
    Switch,
    useRouteMatch,
    Route,
    useHistory,
    useParams,
} from "react-router-dom";
import InputField from "../../../components/InputField";

// Show course class list depend on courseId that has been select on <List />
export default function CourseClassList({ setLoading }) {
    document.title = "Danh sách lớp học phần";
    let { courseId } = useParams();
    let { path, url } = useRouteMatch();
    let navigate = useHistory();

    const columns = [
        {
            title: "Mã Lớp HP",
            dataIndex: "courseClassId",
            key: "courseClassId",
            width: "160px",
            ellipsis: {
                showTitle: false,
            },
            render: (courseClassId) => (
                <Tooltip placement="topLeft" title={courseClassId}>
                    {courseClassId}
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
            title: "Giảng viên",
            dataIndex: "teacher",
            key: "teacher",
            ellipsis: {
                showTitle: false,
            },
            render: (teacher) => (
                <Tooltip placement="topLeft" title={teacher}>
                    {teacher}
                </Tooltip>
            ),
        },
        {
            title: "Thời khóa biểu",
            dataIndex: "schedule",
            key: "schedule",
            width: "260px",
            ellipsis: {
                showTitle: false,
            },
            render: (schedule) => (
                <Tooltip placement="topLeft" title={schedule}>
                    {schedule}
                </Tooltip>
            ),
        },
        {
            title: "SL",
            dataIndex: "capacity",
            key: 'capacity',
            width: "80px",
            ellipsis: {
                showTitle: false,
            },
            render: (capacity) => (
                <Tooltip placement="topLeft" title={capacity}>
                    {capacity}
                </Tooltip>
            ),
        },
        {
            title: "Đã kết thúc",
            dataIndex: "isCompleted",
            key: 'isComplete',
            width: "140px",
            filters: [
                {
                    text: <BsCheck2 className="text-green-500 text-2xl"/>,
                    value: true,
                },
                {
                    text: <BsX className="text-red-500 text-2xl" />,
                    value: false,
                },
            ],
            onFilter: (value, record) => record.isComplete === value,
            ellipsis: {
                showTitle: false,
            },
            align: "center",
            render: (isComplete) => (
                <Tooltip placement="topLeft" title={isComplete} className="text-2xl">
                    {isComplete ? <BsCheck2 className="text-green-500"/> : <BsX className="text-red-500" />}
                </Tooltip>
            ),
        },
        {
            title: "Xóa",
            dataIndex: "courseClassId",
            key: "delete",
            width: "80px",
            ellipsis: {
                showTitle: false,
            },
            render: (courseClassId) => {
                return (
                    <Button
                        type="primary"
                        danger
                        onClick={() => handleDelete(courseClassId)}
                    >
                        Xóa
                    </Button>
                );
            },
        },
    ];

    const [searchText, setSearchText] = useState("");
    const [courseClasses, setCourseClasses] = useState([]);
    const inputSearchEl = useRef(null);

    const objectToString = (classObject) => {
        return Object.values(classObject).join(" ");
    };

    const scheduleRawToString = (rawData) => {
        const result = [];
        const dates = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
        rawData.forEach((item) =>
            result.push(
                `${dates[parseInt(item.dateInWeek - 1)]},${item.startPeriod}-${
                    item.endPeriod
                },${item.room}`
            )
        );
        return result.join("; ");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchText(inputSearchEl.current.value);
    };

    const handleDelete = async (courseClassId) => {
        try {
            await axios.delete(`/api/course-classroom/${courseClassId}`);
            setCourseClasses(
                courseClasses.filter(
                    (item) => item.courseClassId !== courseClassId
                )
            );
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: course } = await axios.get(
                    `/api/course/${courseId}`
                );
                const { data: courseClasses } = await axios.get(
                    `/api/course-classroom/course/${courseId}`
                );
                console.log("classes: ", courseClasses);
                const data = [];
            courseClasses.forEach(async (item) => {
                    data.push({
                        courseClassId: item.courseClassroom.courseClassId,
                        name: course.name,
                        credits: course.credits,
                        capacity: item.courseClassroom.capacity,
                        isComplete: item.courseClassroom.isComplete,
                        teacher: item.teacherName,
                        schedule: scheduleRawToString(item.schedule),
                    });
                });
                setCourseClasses(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div id="course-class-list">
            <Button
                icon={<BsArrowLeft className="text-lg" />}
                onClick={() => {
                    navigate.push("/auth/manage-course-classroom/list");
                }}
                className="flex justify-center items-center gap-2"
            >
                Quay lại
            </Button>
            <form
                onSubmit={handleSearch}
                action=""
                className="mx-auto w-96 courses-search items-end flex mb-3"
            >
                <InputField type="text" label="Tìm kiếm" ref={inputSearchEl} />
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
                dataSource={courseClasses.filter(
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
                rowKey="courseClassId"
            />

            {/* {JSON.stringify(courseClasses)} */}
        </div>
    );
}
