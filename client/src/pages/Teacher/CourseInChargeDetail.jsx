import React, { useEffect, useState } from "react";
import { Button, Table, Tooltip, Switch as AntSwitch } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import {EditOutlined} from '@ant-design/icons'
import axios from "axios";

export default function CourseInChargeDetail({setLoading}) {
    const navigate = useHistory();
    const { courseClassId } = useParams();
    const [score, setScore] = useState([]);
    let syncScore = []; //score state seem to work asynchronous, so this was created to handle those 'asynchronous' situation
    const columns = [
        {
            title: "MSSV",
            align: "center",
            dataIndex: "studentId",
            key: "key",
            width: "120px",
            render: (studentId) => (
                <Tooltip placement="topLeft" title={studentId}>
                    {studentId}
                </Tooltip>
            ),
        },
        {
            title: "Tên sinh viên",
            dataIndex: "name",
            key: "name",
            ellipsis: {
                showTitle: false
            },
            render: (name) => (
                <Tooltip placement="topLeft" title={name}>
                    {name}
                </Tooltip>
            ),
        },
        {
            title: "Công thức điểm",
            align: "center",
            dataIndex: "scoreFormula",
            key: "scoreFormula",
            width: "200px",
            ellipsis: {
                showTitle: false,
            },
            render: (scoreFormula) => (
                <>
                    {scoreFormula}
                </>
            ),
        },
        {
            title: "Điểm",
            children: [
                {
                    title: "BT",
                    align: "center",
                    dataIndex: "scoreBT",
                    key: "scoreBT",
                    width: "80px",
                    ellipsis: {
                        showTitle: false,
                    },
                    render: (scoreBT) => (scoreBT),
                },
                {
                    title: "GK",
                    align: "center",
                    dataIndex: "scoreGK",
                    key: "scoreGK",
                    width: "80px",
                    ellipsis: {
                        showTitle: false,
                    },
                    render: (scoreGK) => (scoreGK),
                },
                {
                    title: "CK",
                    align: "center",
                    dataIndex: "scoreCK",
                    key: "scoreCK",
                    width: "80px",
                    ellipsis: {
                        showTitle: false,
                    },
                    render: (scoreCK) => (scoreCK),
                },
            ],
        },
        {
            title: "Trung bình",
            children: [
                {
                    title: "T10",
                    align: "center",
                    dataIndex: "average__10",
                    key: "average__10",
                    width: "80px",
                    ellipsis: {
                        showTitle: false,
                    },
                    render: (average__10) => (
                        <>
                            {average__10 !== null && average__10.toLocaleString(undefined, {
                                minimumFractionDigits: 1,
                            })}
                        </>
                    ),
                },
                {
                    title: "T4",
                    align: "center",
                    dataIndex: "average__4",
                    key: "average__4",
                    width: "80px",
                    ellipsis: {
                        showTitle: false,
                    },
                    render: (average__4) => (
                        <>
                            {average__4.toLocaleString(undefined, {
                                minimumFractionDigits: 1,
                            })}
                        </>
                    ),
                },
            ],
        },
        {
            title: "Chỉnh sửa",
            align: "center",
            dataIndex: "button",
            key: "edit",
            width: "100px",
            ellipsis: {
                showTitle: false,
            },
            render: (button) => button,
        },
    ];

    const $ = (query) => {
        return document.querySelector(query);
    }

    const convertGPA10to4 = (score10) => {
        if (score10 === null)
            return null;
        if (score10 < 4)
            return 0
        if (score10 < 5)
            return 1
        if (score10 < 5.5)
            return 1.5
        if (score10 < 6.5)
            return 2
        if (score10 < 7)
            return 2.5
        if (score10 < 8)
            return 3
        if (score10 < 8.5)
            return 3.5
        return 4.0
    }

    const fetchData = async () => {
        setLoading(true)
        try {
            let { data: scoreData } = await axios.get(`/api/score/class/${courseClassId}`)
            console.log(scoreData);
            scoreData = scoreData.map(item => {
                return {
                    studentId: item.score.user.userId,
                    name: item.score.user.name,
                    scoreFormula: `BT*${item.score.excerciseRate}+GK*${item.score.midTermRate}+CK*${item.score.finalTermRate}`,
                    scoreBT:
                        <>
                            {item.score.excerciseScore !== null && item.score.excerciseScore.toLocaleString(undefined, {
                                minimumFractionDigits: 1,
                            })}
                        </>,
                    scoreGK:
                        <>
                            {item.score.midTermScore !== null && item.score.midTermScore.toLocaleString(undefined, {
                                minimumFractionDigits: 1,
                            })}
                        </>,
                    scoreCK:
                        <>
                            {item.score.finalTermScore !== null && item.score.finalTermScore.toLocaleString(undefined, {
                                minimumFractionDigits: 1,
                            })}
                        </>,
                    average__10: item.totalScore,
                    average__4: convertGPA10to4(item.totalScore),
                    button: <AntSwitch onChange={(e) => handleToggleEdit(e, item.score.user.userId)} />
                }
            });
            syncScore = [...scoreData];
            setScore(scoreData)
        } 
        catch(err)  {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    };

    
    
    useEffect(() => {
        fetchData();
    }, []);

    const handleToggleEdit = async (e, studentId) => {
        if (e === false) {
            let scoreBT  = $(`#score-bt-${studentId}`).value
            let scoreGK  = $(`#score-gk-${studentId}`).value
            let scoreCK = $(`#score-ck-${studentId}`).value
            try {
                setLoading(true);
                await axios.put(`/api/score/${studentId}/${courseClassId}`,
                    {
                        excerciseScore: scoreBT,
                        midTermScore: scoreGK,
                        finalTermScore: scoreCK
                    })
                
            }
            catch(err) {
                console.log(err)
            }
            finally {
                setLoading(false);
            }
            fetchData();
            return;
        }
        if (e === true) { 
            let index = syncScore.findIndex(s => s.studentId === studentId)
            let newScoreItem = {
                studentId: studentId,
                name: syncScore[index].name,
                scoreFormula: syncScore[index].scoreFormula,
                scoreBT: <input className="ant-input" id={`score-bt-${studentId}`} defaultValue={syncScore[index].scoreBT.props.children} />,
                scoreGK: <input className="ant-input" id={`score-gk-${studentId}`} defaultValue={syncScore[index].scoreGK.props.children} />,
                scoreCK: <input className="ant-input" id={`score-ck-${studentId}`} defaultValue={syncScore[index].scoreCK.props.children} />,
                average__10: syncScore[index].average__10,
                average__4: syncScore[index].average__4,
                button: <AntSwitch onChange={(e) => handleToggleEdit(e, syncScore[index].studentId)} />
            }
            let newScore = [...syncScore];
            newScore[index] = newScoreItem;
            setScore(newScore);
            return;
        }
    }

    return (
        <div id="course-in-charge-detail">
            <h3 className="title">HỌC PHẦN PHỤ TRÁCH</h3>
            <Button
                icon={<BsArrowLeft className="text-lg" />}
                onClick={() => {
                    navigate.push("/auth/course-in-charge");
                }}
                className="flex justify-center items-center gap-2 mb-3"
            >
                Quay lại
            </Button>
            <Table
                className="students-table"
                dataSource={score}
                columns={columns}
                bordered
                size="small"
                pagination={false}
                rowKey="studentId"
            />
        </div>
    );
}
