import React, { useEffect, useState, useRef  } from "react";
import { Table, Tooltip, Select, Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { BsArrowLeft} from 'react-icons/bs'
import axios from "axios";
import { Switch, useRouteMatch, Route, useHistory, useParams } from "react-router-dom";
import MsgModal from '../../../components/MsgModal'
export default function EduProgramDetail({ setLoading }) {
    document.title = "test";
    let { path, url } = useRouteMatch();
    let navigate = useHistory();
    let { id } = useParams();

    const columns = [
        {
            title: "Học kì",
            dataIndex: "semester",
            key: "semester",
            width: "80px",
            ellipsis: {
                showTitle: false,
            },
            render: (semester) => (
                <Tooltip placement="topLeft" title={semester}>
                    {semester}
                </Tooltip>
            ),
        },
        {
            title: "Mã HP",
            dataIndex: "courseId",
            key: "courseId",
            ellipsis: {
                showTitle: false,
            },
            width: "150px",
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
            render: (name) => {
                return (
                    <Tooltip placement="topLeft" title={name}>
                        {name}
                    </Tooltip>
                )
            }
        },
        {
            title: "TC",
            dataIndex: "credits",
            key: "credits",
            ellipsis: {
                showTitle: false,
            },
            width: "70px",
            render: (credits) => {
                return (
                    <Tooltip placement="topLeft" title={credits}>
                        {credits}
                    </Tooltip>
                )
            },
        },
    ];
    
    const [courses, setCourses] = useState([]);
    const [program, setProgram] = useState({
        educationalProgramId: "",
        name: ""
    });
    
    const [modal, setModal] = useState({
        isShow: false,
        Fn: () => {},
        isDanger: false,
        msg: "",
    });
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: programData } = await axios.get(`/api/education-program/${id}`)
                setProgram(programData);
                const {data: coursesData } = await axios.get(`/api/education-program/course/${id}`)
                setCourses(coursesData.sort((a, b) => a.semester > b.semester).map(c => {
                    return {
                        semester: c.semester,
                        courseId: c.course.courseId,
                        name: c.course.name,
                        credits: c.course.credits,
                    }
                }));
            }
            catch (err) {
                setModal({
                    isShow: true,
                    Fn: () => setModal({ ...modal, isShow: false }),
                    isDanger: true,
                    msg: "Tải dữ liệu thất bại\n",
                });
            }
            setLoading(false)
        }
        fetchData();
    }, []);

    const handleDelete = async () => {
        setLoading(true)
        try {
            await axios.delete(`/api/education-program/${id}`)
            navigate.push('/auth/manage-program/list/')
        } catch (err) {
            console.log(err);
            setModal({
                isShow: true,
                Fn: () => setModal({ ...modal, isShow: false }),
                isDanger: true,
                msg: "Xóa chương trình thất bại.\n",
            });
        } finally {
            setLoading(false);
        }
    }


    return (
        <div id="edu-program-course-list">
            <MsgModal msg={modal.msg} Fn={modal.Fn} show={modal.isShow} danger={modal.isDanger} />
            <div className="flex items-center gap-5 mb-3">
                <Button
                    onClick={() => {
                        navigate.push("/auth/manage-program/list/");
                    }}
                    className="w-20 flex justify-center items-center"
                >
                    <BsArrowLeft className="text-lg"/>
                </Button>
                <span>
                    {program.educationalProgramId} - {program.name}
                </span>
                <Button
                    icon={<PlusOutlined />}
                    onClick={() => {
                        navigate.push(`/auth/manage-program/list/add/${id}`);
                    }}
                >
                    Thêm học phần
                </Button>
                <Button
                    icon={<DeleteOutlined />}
                    onClick={handleDelete}
                    danger
                >
                    Xóa
                </Button>
            </div>

            <Table
                className="courses-table"
                dataSource={courses}
                columns={columns}
                pagination={false} 
                rowKey="courseId"
            />

        </div>
    );
}
