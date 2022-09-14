import React, { useEffect, useState } from 'react'
import { Table, Tooltip } from 'antd'
import axios from 'axios'
import MsgModal from '../../components/MsgModal'
export default function EduProgramDetail({ setLoading, user }) {
    document.title = 'Chương trình đào tạo'

    const columns = [
        {
            title: 'Kì',
            dataIndex: 'semester',
            key: 'semester',
            width: '80px',
            filters: [
                {
                    text: '1',
                    value: 1
                },
                {
                    text: '2',
                    value: 2
                },
                {
                    text: '3',
                    value: 3
                },
                {
                    text: '4',
                    value: 4
                },
                {
                    text: '5',
                    value: 5
                },
                {
                    text: '6',
                    value: 6
                },
                {
                    text: '7',
                    value: 7
                },
                {
                    text: '8',
                    value: 8
                },
                {
                    text: '9',
                    value: 9
                },
                {
                    text: '10',
                    value: 10
                }
            ],
            onFilter: (value, record) => record.semester === value,
            sorter: (a, b) => a.semester - b.semester,
            ellipsis: {
                showTitle: false
            },
            render: (semester) => (
                <Tooltip placement="topLeft" title={semester}>
                    {semester}
                </Tooltip>
            )
        },
        {
            title: 'Mã HP',
            dataIndex: 'courseId',
            key: 'courseId',
            ellipsis: {
                showTitle: false
            },
            width: '150px',
            render: (courseId) => (
                <Tooltip placement="topLeft" title={courseId}>
                    {courseId}
                </Tooltip>
            )
        },
        {
            title: 'Tên HP',
            dataIndex: 'name',
            key: 'name',
            ellipsis: {
                showTitle: false
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
            title: 'TC',
            dataIndex: 'credits',
            key: 'credits',
            ellipsis: {
                showTitle: false
            },
            width: '70px',
            render: (credits) => {
                return (
                    <Tooltip placement="topLeft" title={credits}>
                        {credits}
                    </Tooltip>
                )
            }
        }
    ]

    const [courses, setCourses] = useState([])
    const [program, setProgram] = useState({
        educationalProgramId: '',
        name: ''
    })

    const [modal, setModal] = useState({
        isShow: false,
        Fn: () => {},
        isDanger: false,
        msg: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data: userInfor } = await axios.get(`/api/user/${user.name}`)
                const educationalProgramId = userInfor.educationalProgram.educationalProgramId

                const { data: programData } = await axios.get(
                    `/api/education-program/${educationalProgramId}`
                )
                setProgram(programData)
                const { data: coursesData } = await axios.get(
                    `/api/education-program/course/${educationalProgramId}`
                )
                setCourses(
                    coursesData
                        .sort((a, b) => a.semester > b.semester)
                        .map((c) => {
                            return {
                                semester: c.semester,
                                courseId: c.course.courseId,
                                name: c.course.name,
                                credits: c.course.credits
                            }
                        })
                )
            } catch (err) {
                setModal({
                    isShow: true,
                    Fn: () => setModal({ ...modal, isShow: false }),
                    isDanger: true,
                    msg: 'Tải dữ liệu thất bại\n'
                })
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <div id="edu-program-course-list">
            <MsgModal msg={modal.msg} Fn={modal.Fn} show={modal.isShow} danger={modal.isDanger} />
            <h3 className="title">Chương trình đào tạo</h3>
            <div className="flex items-center gap-5 my-5 font-bold">
                <span>
                    {program.educationalProgramId} - {program.name}
                </span>
            </div>

            <Table
                className="courses-table"
                dataSource={courses}
                columns={columns}
                pagination={false}
                rowKey="courseId"
            />
        </div>
    )
}
