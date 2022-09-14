import React, { useEffect, useState } from 'react'
import { Table, Tooltip } from 'antd'
import axios from 'axios'
export default function Score({ setLoading, user }) {
    document.title = 'Kết quả học tập'

    const columns = [
        {
            title: 'Mã học phần',
            align: 'center',
            dataIndex: 'courseId',
            key: 'courseId',
            width: '140px',
            render: (courseId) => (
                <Tooltip placement="topLeft" title={courseId}>
                    {courseId}
                </Tooltip>
            )
        },
        {
            title: 'Tên học phần',
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
            align: 'center',
            dataIndex: 'credits',
            key: 'credits',
            width: '50px',
            ellipsis: {
                showTitle: false
            },
            render: (credits) => <>{credits}</>
        },
        {
            title: 'Công thức điểm',
            align: 'center',
            dataIndex: 'scoreFormula',
            key: 'scoreFormula',
            width: '200px',
            ellipsis: {
                showTitle: false
            },
            render: (scoreFormula) => <>{scoreFormula}</>
        },
        {
            title: 'Điểm',
            children: [
                {
                    title: 'BT',
                    align: 'center',
                    dataIndex: 'scoreBT',
                    key: 'scoreBT',
                    width: '60px',
                    ellipsis: {
                        showTitle: false
                    },
                    render: (scoreBT) => (
                        <>
                            {scoreBT.toLocaleString(undefined, {
                                minimumFractionDigits: 1
                            })}
                        </>
                    )
                },
                {
                    title: 'GK',
                    align: 'center',
                    dataIndex: 'scoreGK',
                    key: 'scoreGK',
                    width: '60px',
                    ellipsis: {
                        showTitle: false
                    },
                    render: (scoreGK) => (
                        <>
                            {scoreGK.toLocaleString(undefined, {
                                minimumFractionDigits: 1
                            })}
                        </>
                    )
                },
                {
                    title: 'CK',
                    align: 'center',
                    dataIndex: 'scoreCK',
                    key: 'scoreCK',
                    width: '60px',
                    ellipsis: {
                        showTitle: false
                    },
                    render: (scoreCK) => (
                        <>
                            {scoreCK.toLocaleString(undefined, {
                                minimumFractionDigits: 1
                            })}
                        </>
                    )
                }
            ]
        },
        {
            title: 'Trung bình',
            children: [
                {
                    title: 'T10',
                    align: 'center',
                    dataIndex: 'average__10',
                    key: 'average__10',
                    width: '60px',
                    ellipsis: {
                        showTitle: false
                    },
                    render: (average__10) => (
                        <>
                            {average__10.toLocaleString(undefined, {
                                minimumFractionDigits: 1
                            })}
                        </>
                    )
                },
                {
                    title: 'T4',
                    align: 'center',
                    dataIndex: 'average__4',
                    key: 'average__4',
                    width: '60px',
                    ellipsis: {
                        showTitle: false
                    },
                    render: (average__4) => (
                        <>
                            {average__4.toLocaleString(undefined, {
                                minimumFractionDigits: 1
                            })}
                        </>
                    )
                }
            ]
        }
    ]

    const [score, setScore] = useState([])

    const convertGPA10to4 = (score10) => {
        if (score10 === null) return null
        if (score10 < 4) return 0
        if (score10 < 5) return 1
        if (score10 < 5.5) return 1.5
        if (score10 < 6.5) return 2
        if (score10 < 7) return 2.5
        if (score10 < 8) return 3
        if (score10 < 8.5) return 3.5
        return 4.0
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            let data = []
            try {
                const { data: scoreData } = await axios.get(`/api/score/student/${user.name}`)
                console.log(scoreData)
                for (let index = 0; index < scoreData.length; index++) {
                    let item = scoreData[index]
                    const { data: course } = await axios.get(
                        `/api/course/${item.courseClassroom.courseId}`
                    )
                    console.log('course:', course, 'item:', item)
                    if (course.isAvailable && !item.courseClassroom.isComplete) {
                        continue
                    }
                    data.push({
                        courseId: course.courseId,
                        name: course.name,
                        credits: course.credits,
                        scoreFormula: `BT*${item.score.excerciseRate}+GK*${item.score.midTermRate}+CK*${item.score.finalTermRate}`,
                        scoreBT: item.score.excerciseScore,
                        scoreGK: item.score.midTermScore,
                        scoreCK: item.score.finalTermScore,
                        average__10: item.totalScore,
                        average__4: convertGPA10to4(item.totalScore)
                    })
                }
                console.log('data:', data)
                setScore(data)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <div id="score">
            <h3 className="title">SCORE</h3>
            <Table
                className="students-table"
                dataSource={score}
                columns={columns}
                bordered
                size="small"
                pagination={false}
                rowKey="courseId"
                // pagination={{
                //     position: ["topRight"],
                //     defaultPageSize: 10,
                //     showSizeChanger: true,
                //     pageSizeOptions: ["10", "20", "50", "100"],
                // }}
            />
        </div>
    )
}
