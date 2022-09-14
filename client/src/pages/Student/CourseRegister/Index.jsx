import React from 'react'
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom'
import CourseList from './CourseList'
import CourseClassroomList from './CourseClassroomList'
import RegisteredList from './RegisteredList'
import { Radio } from 'antd'
import { useHistory } from 'react-router-dom'
export default function CourseClassManagement({ setLoading, user }) {
    document.title = 'Đăng ký học phần'

    let { path } = useRouteMatch()
    const navigate = useHistory()
    const handleFnSelect = (e) => {
        navigate.push(`${path}/${e.target.value}`)
    }

    let defaultRdGrValue = 'list'
    defaultRdGrValue = document.location.pathname.includes('registered')
        ? 'registered'
        : defaultRdGrValue

    return (
        <div id="course-class-management">
            <h3 className="title">Quản lý lớp học phần</h3>
            <Radio.Group
                defaultValue={defaultRdGrValue}
                buttonStyle="solid"
                onChange={handleFnSelect}>
                <Radio.Button value="list">Đăng ký lớp học phần</Radio.Button>
                <Radio.Button value="registered">Danh sách lớp đã đăng ký</Radio.Button>
            </Radio.Group>
            <div className="fns pt-5">
                <Switch>
                    <Route path={`${path}/registered`}>
                        <RegisteredList user={user} setLoading={setLoading} />
                    </Route>
                    <Route path={`${path}/list/:courseId`}>
                        <CourseClassroomList user={user} setLoading={setLoading} />
                    </Route>
                    <Route path={`${path}/list`}>
                        <CourseList user={user} setLoading={setLoading} />
                    </Route>
                    <Redirect to={`${path}/list`} />
                </Switch>
            </div>
        </div>
    )
}
