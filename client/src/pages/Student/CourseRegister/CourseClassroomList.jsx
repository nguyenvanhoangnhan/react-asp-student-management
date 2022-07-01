import React, { useEffect, useState, useRef } from "react";
import { Table, Tooltip, Select, Button } from "antd";
import { SwapLeftOutlined } from "@ant-design/icons";
import {BsArrowLeft} from "react-icons/bs"
import axios from "axios";
import MsgModal from "../../../components/MsgModal";
import {
    Switch,
    useRouteMatch,
    Route,
    useHistory,
    useParams,
} from "react-router-dom";
import InputField from "../../../components/InputField";

// Show course class list depend on courseId that has been select on <List />
export default function CourseClassList({ setLoading, user }) {
    document.title = "Danh sách lớp học phần";
    let { courseId } = useParams();
    let { path, url } = useRouteMatch();
    let navigate = useHistory();
    const [modal, setModal] = useState({
        isShow: false,
        Fn: () => { },
        isDanger: false,
        msg: '',
    })

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
            width: "260px",
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
            // width: "260px",
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
            title: "ĐK",
            dataIndex: "registeredCount",
            key: 'registeredCount',
            width: "50px",
            ellipsis: {
                showTitle: false,
            },
            render: (registeredCount) => (
                <Tooltip placement="topLeft" title={registeredCount}>
                    {registeredCount}
                </Tooltip>
            ),
        },
        {
            title: "SL",
            dataIndex: "capacity",
            key: 'capacity',
            width: "50px",
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
            title: "Đăng ký",
            dataIndex: "courseClassId",
            key: "register",
            width: "125px",
            ellipsis: {
                showTitle: false,
            },
            render: (courseClassId) => {
                return (
                    <Button
                        type="primary"
                        onClick={() => handleRegister(courseClassId)}
                    >
                        Đăng ký
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

    const handleRegister = async (courseClassId) => {
        try {
            await axios.post(`/api/course-classroom/user/${user.name}/${courseClassId}`); //user.name = userId
            setModal({
                isShow: true,
                Fn: () => (navigate.push("/auth/course-register/list")),
                isDanger: false,
                msg: 'Đăng ký thành công'
            })
        } catch (err) {
            let msg = "";
            msg = err.response.data === "Conflict Schedule" ? "Trùng thời khóa biểu" : msg;
            msg = err.response.data === "This Classroom Is Full Now" ? "Lớp đã đầy" : msg;
            msg = err.response.data === "Have Participated In This Course" ? "Đã đăng ký học phần này" : msg;
            setModal({
                isShow: true,
                Fn: () => setModal({...modal, isShow: false}),
                isDanger: true,
                msg: 'Đăng ký thất bại\n' + msg
            })
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
                        teacher: item.teacherName,
                        capacity: item.courseClassroom.capacity,
                        schedule: scheduleRawToString(item.schedule),
                        registeredCount: item.numberOfRegisteredStudent
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
            <MsgModal msg={modal.msg} Fn={modal.Fn} show={modal.isShow} danger={modal.isDanger} />
            <Button
                icon={<BsArrowLeft className="text-lg" />}
                onClick={() => {
                    navigate.push("/auth/course-register/list");
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
