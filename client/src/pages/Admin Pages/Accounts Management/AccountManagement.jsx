import React from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import CreateAccount from "./CreateAccount";
import UserList from "./UserList";
import GenerateAccounts from "./GenerateAccounts";
import { Radio } from 'antd'
import { useHistory } from 'react-router-dom'
export default function AccountManagement({setLoading}) {
    let { path, url } = useRouteMatch();
    const navigate = useHistory()
    const handleFnSelect = (e) => {
        navigate.push(`${path}/${e.target.value}`);
    } 

    let defaultRdGrValue = document.location.pathname.includes("list") ? "list" : 
        (document.location.pathname.includes("generate") ? "generate" : "create"); 
    console.log(defaultRdGrValue)
    return (
        <div id="account-management">
            <h3 className="title">Quản lý tài khoản</h3>
            <Radio.Group defaultValue={defaultRdGrValue} buttonStyle="solid" onChange={handleFnSelect}>
                <Radio.Button value="create">Tạo tài khoản</Radio.Button>
                <Radio.Button value="generate">Sinh tài khoản</Radio.Button>
                <Radio.Button value="list">Danh sách tài khoản</Radio.Button>
            </Radio.Group>
            <div className="fns pt-5">
                <Switch>
                    <Route path={`${path}/create`}>
                        <CreateAccount setLoading={setLoading}/>
                    </Route>
                    <Route path={`${path}/list`}>
                        <UserList setLoading={setLoading}/>
                    </Route>
                    <Route path={`${path}/generate`}>
                        <GenerateAccounts setLoading={setLoading}/>
                    </Route>
                    <Redirect to={`${path}/create`} />
                </Switch>
            </div>
            
        </div>
    )
}
