import React, { useEffect, useState, useRef } from 'react'
import { Table, Tooltip, Button } from 'antd'
import axios from 'axios'
import InputField from '../../../components/InputField'

// Show course class list depend on courseId that has been select on <List />
export default function CourseClassList({ setLoading, user }) {
    document.title = 'Danh sách lớp học phần'

    const columns = [
        {
            title: 'Mã Lớp HP',
            dataIndex: 'courseClassId',
            key: 'courseClassId',
            width: '160px',
            ellipsis: {
                showTitle: false
            },
            render: (courseClassId) => (
                <Tooltip placement="topLeft" title={courseClassId}>
                    {courseClassId}
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
            render: (name) => (
                <Tooltip placement="topLeft" title={name}>
                    {name}
                </Tooltip>
            )
        },

        {
            title: 'TC',
            dataIndex: 'credits',
            key: 'credits',
            ellipsis: {
                showTitle: false
            },
            width: '60px',
            render: (credits) => (
                <Tooltip placement="topLeft" title={credits}>
                    {credits}
                </Tooltip>
            )
        },
        {
            title: 'Giảng viên',
            dataIndex: 'teacher',
            key: 'teacher',
            ellipsis: {
                showTitle: false
            },
            render: (teacher) => (
                <Tooltip placement="topLeft" title={teacher}>
                    {teacher}
                </Tooltip>
            )
        },
        {
            title: 'Thời khóa biểu',
            dataIndex: 'schedule',
            key: 'schedule',
            width: '260px',
            ellipsis: {
                showTitle: false
            },
            render: (schedule) => (
                <Tooltip placement="topLeft" title={schedule}>
                    {schedule}
                </Tooltip>
            )
        },
        {
            title: 'ĐK',
            dataIndex: 'registeredCount',
            key: 'registeredCount',
            width: '50px',
            ellipsis: {
                showTitle: false
            },
            render: (registeredCount) => (
                <Tooltip placement="topLeft" title={registeredCount}>
                    {registeredCount}
                </Tooltip>
            )
        },
        {
            title: 'SL',
            dataIndex: 'capacity',
            key: 'capacity',
            width: '50px',
            ellipsis: {
                showTitle: false
            },
            render: (capacity) => (
                <Tooltip placement="topLeft" title={capacity}>
                    {capacity}
                </Tooltip>
            )
        },
        {
            title: 'Hủy ĐK',
            dataIndex: 'courseClassId',
            key: 'unregister',
            width: '100px',
            ellipsis: {
                showTitle: false
            },
            render: (courseClassId) => {
                return (
                    <Button
                        type="primary"
                        danger
                        onClick={() => handleUnregister(courseClassId)}
                        block>
                        Hủy
                    </Button>
                )
            }
        }
    ]

    const [searchText, setSearchText] = useState('')
    const [courseClasses, setCourseClasses] = useState([])
    const inputSearchEl = useRef(null)

    const objectToString = (classObject) => {
        return Object.values(classObject).join(' ')
    }

    const scheduleRawToString = (rawData) => {
        const result = []
        const dates = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
        rawData.forEach((item) =>
            result.push(
                `${dates[parseInt(item.dateInWeek - 1)]},${item.startPeriod}-${item.endPeriod},${
                    item.room
                }`
            )
        )
        return result.join('; ')
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setSearchText(inputSearchEl.current.value)
    }

    const handleUnregister = async (courseClassId) => {
        try {
            await axios.delete(`/api/course-classroom/user/${user.name}/${courseClassId}`)
            setCourseClasses(courseClasses.filter((item) => item.courseClassId !== courseClassId))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data: courseClasses } = await axios.get(
                    `/api/course-classroom/user/${user.name}`
                )
                const data = []
                courseClasses.forEach(async (item) => {
                    const { data: course } = await axios.get(
                        `/api/course/${item.courseClassroom.courseId}`
                    )
                    console.log(item)
                    data.push({
                        courseClassId: item.courseClassroom.courseClassId,
                        name: course.name,
                        credits: course.credits,
                        capacity: item.courseClassroom.capacity,
                        teacher: item.teacherName,
                        schedule: scheduleRawToString(item.schedule),
                        registeredCount: item.numberOfRegisteredStudent,
                        studied: item.courseClassroom.isComplete || !course.isAvailable
                    })
                })
                setCourseClasses(data)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div id="course-class-list">
            <form
                onSubmit={handleSearch}
                action=""
                className="mx-auto w-96 courses-search items-end flex mb-3">
                <InputField type="text" label="Tìm kiếm" ref={inputSearchEl} />
                <Button type="primary" size="medium" htmlType="submit" className="ml-5">
                    Search
                </Button>
            </form>

            <Table
                className="students-table"
                dataSource={courseClasses.filter(
                    (item) =>
                        objectToString(item).toLowerCase().indexOf(searchText.toLowerCase()) >= 0 &&
                        !item.studied
                )}
                columns={columns}
                pagination={{
                    position: ['topRight'],
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50', '100']
                }}
                rowKey="courseClassId"
            />

            {/* {JSON.stringify(courseClasses)} */}
        </div>
    )
}
