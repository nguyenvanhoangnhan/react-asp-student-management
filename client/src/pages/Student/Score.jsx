import React from "react";
import { Table, Tooltip } from "antd";
export default function Score() {
    document.title = "Kết quả học tập";

    const dataSource = [
        {
            key: "1",
            name: "Xác suất thống kê",
            credits: 3,
            scoreFormula: "0.2*BT + 0.2*GK + 0.6*CK",
            scoreBT: 10,
            scoreGK: 10,
            scoreCK: 10,
            average__10: 10,
            average__4: 4.0,
        },
        {
            key: "2",
            name: "Xác suất thống kê",
            credits: 3,
            scoreFormula: "0.2*BT + 0.2*GK + 0.6*CK",
            scoreBT: 10,
            scoreGK: 10,
            scoreCK: 10,
            average__10: 10,
            average__4: 4.0,
        },
        {
            key: "3",
            name: "Xác suất thống kê",
            credits: 3,
            scoreFormula: "0.2*BT + 0.2*GK + 0.6*CK",
            scoreBT: 10,
            scoreGK: 10,
            scoreCK: 10,
            average__10: 10,
            average__4: 4.0,
        },
        {
            key: "4",
            name: "Xác suất thống kê",
            credits: 3,
            scoreFormula: "0.2*BT + 0.2*GK + 0.6*CK",
            scoreBT: 10,
            scoreGK: 10,
            scoreCK: 10,
            average__10: 10,
            average__4: 4.0,
        },
        {
            key: "5",
            name: "Xác suất thống kê",
            credits: 3,
            scoreFormula: "0.2*BT + 0.2*GK + 0.6*CK",
            scoreBT: 10,
            scoreGK: 10,
            scoreCK: 10,
            average__10: 10,
            average__4: 4.0,
        },
        {
            key: "6",
            name: "Xác suất thống kê",
            credits: 3,
            scoreFormula: "0.2*BT + 0.2*GK + 0.6*CK",
            scoreBT: 10,
            scoreGK: 10,
            scoreCK: 10,
            average__10: 10,
            average__4: 4.0,
        },
        {
            key: "7",
            name: "Xác suất thống kê",
            credits: 3,
            scoreFormula: "0.2*BT + 0.2*GK + 0.6*CK",
            scoreBT: 10,
            scoreGK: 10,
            scoreCK: 10,
            average__10: 10,
            average__4: 4.0,
        },
        {
            key: "8",
            name: "Xác suất thống kê",
            credits: 3,
            scoreFormula: "0.2*BT + 0.2*GK + 0.6*CK",
            scoreBT: 10,
            scoreGK: 10,
            scoreCK: 10,
            average__10: 10,
            average__4: 4.0,
        },
        {
            key: "9",
            name: "Xác suất thống kê",
            credits: 3,
            scoreFormula: "0.2*BT + 0.2*GK + 0.6*CK",
            scoreBT: 10,
            scoreGK: 10,
            scoreCK: 10,
            average__10: 10,
            average__4: 4.0,
        },
        {
            key: "10",
            name: "Xác suất thống kê",
            credits: 3,
            scoreFormula: "0.2*BT + 0.2*GK + 0.6*CK",
            scoreBT: 10,
            scoreGK: 10,
            scoreCK: 10,
            average__10: 10,
            average__4: 4.0,
        },
        {
            key: "11",
            name: "Xác suất thống kê",
            credits: 3,
            scoreFormula: "0.2*BT + 0.2*GK + 0.6*CK",
            scoreBT: 10,
            scoreGK: 10,
            scoreCK: 10,
            average__10: 10,
            average__4: 4.0,
        },
        {
            key: "12",
            name: "Xác suất thống kê",
            credits: 3,
            scoreFormula: "0.2*BT + 0.2*GK + 0.6*CK",
            scoreBT: 10,
            scoreGK: 10,
            scoreCK: 10,
            average__10: 10,
            average__4: 4.0,
        },
        {
            key: "13",
            name: "Xác suất thống kê",
            credits: 3,
            scoreFormula: "0.2*BT + 0.2*GK + 0.6*CK",
            scoreBT: 10,
            scoreGK: 10,
            scoreCK: 10,
            average__10: 10,
            average__4: 4.0,
        },
        {
            key: "14",
            name: "Xác suất thống kê",
            credits: 3,
            scoreFormula: "0.2*BT + 0.2*GK + 0.6*CK",
            scoreBT: 10,
            scoreGK: 10,
            scoreCK: 10,
            average__10: 10,
            average__4: 4.0,
        },
        {
            key: "15",
            name: "Xác suất thống kê",
            credits: 3,
            scoreFormula: "0.2*BT + 0.2*GK + 0.6*CK",
            scoreBT: 10,
            scoreGK: 10,
            scoreCK: 10,
            average__10: 10,
            average__4: 4.0,
        },
        {
            key: "16",
            name: "Xác suất thống kê",
            credits: 3,
            scoreFormula: "0.2*BT + 0.2*GK + 0.6*CK",
            scoreBT: 10,
            scoreGK: 10,
            scoreCK: 10,
            average__10: 10,
            average__4: 4.0,
        },
        {
            key: "17",
            name: "Xác suất thống kê",
            credits: 3,
            scoreFormula: "0.2*BT + 0.2*GK + 0.6*CK",
            scoreBT: 10,
            scoreGK: 10,
            scoreCK: 10,
            average__10: 10,
            average__4: 4.0,
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
            title: "Tên học phần",
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
            title: "TC",
            align: "center",
            dataIndex: "credits",
            key: "credits",
            width: "50px",
            ellipsis: {
                showTitle: false,
            },
            render: (credits) => (
                <Tooltip placement="topLeft" title={credits}>
                    {credits}
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
                <Tooltip placement="topLeft" title={scoreFormula}>
                    {scoreFormula}
                </Tooltip>
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
                    width: "60px",
                    ellipsis: {
                        showTitle: false,
                    },
                    render: (scoreBT) => (
                        <Tooltip placement="topLeft" title={scoreBT}>
                            {scoreBT.toLocaleString(undefined, {
                                minimumFractionDigits: 1,
                            })}
                        </Tooltip>
                    ),
                },
                {
                    title: "GK",
                    align: "center",
                    dataIndex: "scoreGK",
                    key: "scoreGK",
                    width: "60px",
                    ellipsis: {
                        showTitle: false,
                    },
                    render: (scoreGK) => (
                        <Tooltip placement="topLeft" title={scoreGK}>
                            {scoreGK.toLocaleString(undefined, {
                                minimumFractionDigits: 1,
                            })}
                        </Tooltip>
                    ),
                },
                {
                    title: "CK",
                    align: "center",
                    dataIndex: "scoreCK",
                    key: "scoreCK",
                    width: "60px",
                    ellipsis: {
                        showTitle: false,
                    },
                    render: (scoreCK) => (
                        <Tooltip placement="topLeft" title={scoreCK}>
                            {scoreCK.toLocaleString(undefined, {
                                minimumFractionDigits: 1,
                            })}
                        </Tooltip>
                    ),
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
                    width: "60px",
                    ellipsis: {
                        showTitle: false,
                    },
                    render: (average__10) => (
                        <Tooltip placement="topLeft" title={average__10}>
                            {average__10.toLocaleString(undefined, {
                                minimumFractionDigits: 1,
                            })}
                        </Tooltip>
                    ),
                },
                {
                    title: "T4",
                    align: "center",
                    dataIndex: "average__4",
                    key: "average__4",
                    width: "60px",
                    ellipsis: {
                        showTitle: false,
                    },
                    render: (average__4) => (
                        <Tooltip placement="topLeft" title={average__4}>
                            {average__4.toLocaleString(undefined, {
                                minimumFractionDigits: 1,
                            })}
                        </Tooltip>
                    ),
                },
            ],
        },
    ];

    return (
        <div id="score">
            <h3 className="title">SCORE</h3>
            <Table
                className="students-table"
                dataSource={dataSource}
                columns={columns}
                bordered
                size="small"
                pagination={false}
                // pagination={{
                //     position: ["topRight"],
                //     defaultPageSize: 10,
                //     showSizeChanger: true,
                //     pageSizeOptions: ["10", "20", "50", "100"],
                // }}
            />
        </div>
    );
}
