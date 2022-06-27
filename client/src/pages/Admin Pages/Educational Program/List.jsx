import React, { useEffect, useState, useRef  } from "react";
import { Table, Tooltip, Select, Button } from "antd";
import axios from "axios";
// import ManageSingleEduProgramModal from "./SingleModal"
import { Switch, useRouteMatch, Route, useHistory } from "react-router-dom";
import InputField from "../../../components/InputField";
export default function UserList({ setLoading }) {
    document.title = "Danh sách chương trình học";
    let { path, url } = useRouteMatch();
    let navigate = useHistory();

    const columns = [
        {
            title: "Mã CTĐT",
            dataIndex: "educationalProgramId",
            key: "educationalProgramId",
            width: "200px",
            ellipsis: {
                showTitle: false,
            },
            render: (educationalProgramId) => (
                <Tooltip placement="topLeft" title={educationalProgramId}>
                    {educationalProgramId}
                </Tooltip>
            ),
        },
        {
            title: "Tên CTĐT",
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
            title: "Xóa",
            dataIndex: "educationalProgramId",
            key: "delete",
            width: "80px",
            ellipsis: {
                showTitle: false,
            },
            render: (educationalProgramId) => {
                return (
                    <Button type="primary" danger onClick={() => handleDelete(educationalProgramId)}>
                        Xóa
                    </Button>
                )
            }
        },
    ];
    
    const [searchText, setSearchText] = useState("");
    const [programs, setPrograms] = useState([]);
    const inputSearchEl = useRef(null);

    const objectToString = (classObject) => {
        return Object.values(classObject).join(" ");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchText(inputSearchEl.current.value);
    }
    
    const handleDelete = async (id) => {
        setLoading(true)
        try {
            await axios.delete(`/api/education-program/${id}`)
            setPrograms(programs.filter(item => item.educationalProgramId !== id))
        }
        catch (err) {
            console.log(err);
        }
        setLoading(false);
    }
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/api/education-program/")
                setPrograms(res.data);
            }
            catch (err) {
                console.log(err);
            }
            setLoading(false)
        }
        fetchData();
    }, []);


    return (
        <div id="user-list">
            <form onSubmit={handleSearch} action="" className="mx-auto w-96 courses-search items-end flex mb-3">
                    <InputField type="text" label="Tìm kiếm" ref={inputSearchEl} />
                    <Button type="primary" size="medium" htmlType="submit" className="ml-5">Search</Button>
                </form>

            <Table
                className="students-table"
                dataSource={programs.filter(
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
                rowKey="educationalProgramId"
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            navigate.push(`${path}/program/${record.educationalProgramId}`)
                        },
                    };
                }}
            />

            <Switch>
                <Route path={`${path}/program/:id`}>
                    {/* <ManageSingleEduProgramModal/> */}
                </Route>
            </Switch>

        </div>
    );
}
