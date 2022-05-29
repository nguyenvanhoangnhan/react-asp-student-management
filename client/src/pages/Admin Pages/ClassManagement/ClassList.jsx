import React, { useEffect, useState } from "react";
import { Table, Tooltip, Select } from "antd";
import axios from "axios";
import ManageSingleClassModal from "./ManageSingleClassModal"
import { Switch, useRouteMatch, Route, useHistory } from "react-router-dom";

export default function UserList({ setLoading }) {
    document.title = "Danh sách lớp sinh hoạt";
    let { path, url } = useRouteMatch();
    let navigate = useHistory();

    const columns = [
        {
            title: "Mã lớp",
            dataIndex: "id",
            key: "id",
            width: "18%",
            ellipsis: {
                showTitle: false,
            },
            render: (id) => (
                <Tooltip placement="topLeft" title={id}>
                    {id}
                </Tooltip>
            ),
        },
        {
            title: "Tên lớp",
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
            title: "Khoa",
            dataIndex: "faculty",
            key: "faculty",
            ellipsis: {
                showTitle: false,
            },
            render: (faculty) => (
                <Tooltip placement="topLeft" title={faculty}>
                    {faculty}
                </Tooltip>
            ),
        },
    ];

    const [faculties, setFaculties] = useState([]);
    const [classes, setClasses] = useState([]);

    // fetch a list of faculty, each faculty include a class list
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

    // on <Select /> value change => Class select option list change
    const handleSelectFaculty = (data) => {
        data = JSON.parse(data);
        console.log(data);
        let id = data.facultyId;

        if (id === 0) {
            let tempClasses = []
            faculties.forEach((faculty) => {   
                tempClasses = tempClasses.concat(faculty.classes.map(_class => {
                    return {
                        key: _class.id,
                        id: _class.id,
                        name: _class.name,
                        faculty: faculty.facultyName,
                    }
                }))
            });
            setClasses(tempClasses);
            return;
        }
    
        setClasses(data.classes.map(_class => {
            return {
                key: _class.id,
                id: _class.id,
                name: _class.name,
                faculty: data.facultyName,
            }
        }) );
    };

    const handleDeleteClass = (id) => {
        axios.delete(`/api/classroom/${id}`).then((res) => {
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
                    console.error("Error:", err);
                });
            setClasses(classes.filter(_class => _class.key != id)); //don't use !== here
        }).catch(err => {
            console.log(err)
        }) 
    }

    return (
        <div id="user-list">
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
                            value={JSON.stringify(item)}
                        >
                            {item.facultyName}
                        </Select.Option>
                    ))}
                </Select>
            </div>

            <Table
                className="students-table"
                dataSource={classes}
                columns={columns}
                pagination={{
                    position: ["topRight"],
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],
                }}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            navigate.push(`${path}/class/${record.key}`)
                        },
                    };
                }}
            />

            <Switch>
                <Route path={`${path}/class/:id`}>
                    <ManageSingleClassModal handleDeleteClass={handleDeleteClass} />
                </Route>
            </Switch>

        </div>
    );
}
