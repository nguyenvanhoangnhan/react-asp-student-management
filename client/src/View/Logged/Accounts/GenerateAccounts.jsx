import React from "react";
import { Select } from "antd";
export default function GenerateAccounts() {
    const Option = Select.Option;
    const classes = [
        "20T1", "20T2", "20TCLC_DT1", "20TCLC_DT2", "20TCLC_DT3",
        "20TCLC_DT4", "20TCLC_DT5", "20TCLC_KHDL", "20TCLC_Nhat1", "20TCLC_Nhat2",
    ]
    return (
        <div id="gen-accounts">
            <h3 className="title">Sinh tài khoản</h3>
            <form onSubmit={e => {e.preventDefault()}}
            >
                <div className="select-field">
                    <span>Lớp</span>
                    <Select
                        showSearch
                        placeholder="Chọn một lớp"
                        optionFilterProp="children"
                        // onChange={onChange}
                        // onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {classes.map(item => (
                            <Option value={item}>{item}</Option>
                        ))}
                    </Select>
                </div>
            </form>
        </div>
    );
}
