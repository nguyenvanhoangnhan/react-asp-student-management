import React from 'react'
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom'
import CreateClass from './Create'
import ClassList from './List'
import { Radio } from 'antd'
import { useHistory } from 'react-router-dom'
export default function ClassManagement({ setLoading }) {
    let { path } = useRouteMatch()
    const navigate = useHistory()
    const handleFnSelect = (e) => {
        navigate.push(`${path}/${e.target.value}`)
    }

    let defaultRdGrValue = document.location.pathname.includes('list') ? 'list' : 'create'

    return (
        <div id="class-management">
            <h3 className="title">Quản lý lớp sinh hoạt</h3>
            <Radio.Group
                defaultValue={defaultRdGrValue}
                buttonStyle="solid"
                onChange={handleFnSelect}>
                <Radio.Button value="create">Tạo lớp sinh hoạt</Radio.Button>
                <Radio.Button value="list">Danh sách lớp sinh hoạt</Radio.Button>
            </Radio.Group>
            <div className="fns pt-5">
                <Switch>
                    <Route path={`${path}/create`}>
                        <CreateClass setLoading={setLoading} />
                    </Route>
                    <Route path={`${path}/list`}>
                        <ClassList setLoading={setLoading} />
                    </Route>
                    <Redirect to={`${path}/create`} />
                </Switch>
            </div>
        </div>
    )
}
