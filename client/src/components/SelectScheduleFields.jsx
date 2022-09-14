import React from 'react'
import { Form, TreeSelect, Input } from 'antd'
import classNames from 'classnames'
export default function SelectScheduleFields(props) {
    const treeData = [
        {
            title: 'Chủ nhật',
            value: '1',
            children: [
                {
                    title: 'Chủ nhật - Tiết 1',
                    value: '1-1'
                },
                {
                    title: 'Chủ nhật - Tiết 2',
                    value: '1-2'
                },
                {
                    title: 'Chủ nhật - Tiết 3',
                    value: '1-3'
                },
                {
                    title: 'Chủ nhật - Tiết 4',
                    value: '1-4'
                },
                {
                    title: 'Chủ nhật - Tiết 5',
                    value: '1-5'
                },
                {
                    title: 'Chủ nhật - Tiết 6',
                    value: '1-6'
                },
                {
                    title: 'Chủ nhật - Tiết 7',
                    value: '1-7'
                },
                {
                    title: 'Chủ nhật - Tiết 8',
                    value: '1-8'
                },
                {
                    title: 'Chủ nhật - Tiết 9',
                    value: '1-9'
                },
                {
                    title: 'Chủ nhật - Tiết 10',
                    value: '1-10'
                }
            ]
        },
        {
            title: 'Thứ 2',
            value: '2',
            children: [
                {
                    title: 'Thứ 2 - Tiết 1',
                    value: '2-1'
                },
                {
                    title: 'Thứ 2 - Tiết 2',
                    value: '2-2'
                },
                {
                    title: 'Thứ 2 - Tiết 3',
                    value: '2-3'
                },
                {
                    title: 'Thứ 2 - Tiết 4',
                    value: '2-4'
                },
                {
                    title: 'Thứ 2 - Tiết 5',
                    value: '2-5'
                },
                {
                    title: 'Thứ 2 - Tiết 6',
                    value: '2-6'
                },
                {
                    title: 'Thứ 2 - Tiết 7',
                    value: '2-7'
                },
                {
                    title: 'Thứ 2 - Tiết 8',
                    value: '2-8'
                },
                {
                    title: 'Thứ 2 - Tiết 9',
                    value: '2-9'
                },
                {
                    title: 'Thứ 2 - Tiết 10',
                    value: '2-10'
                }
            ]
        },
        {
            title: 'Thứ 3',
            value: '3',
            children: [
                {
                    title: 'Thứ 3 - Tiết 1',
                    value: '3-1'
                },
                {
                    title: 'Thứ 3 - Tiết 2',
                    value: '3-2'
                },
                {
                    title: 'Thứ 3 - Tiết 3',
                    value: '3-3'
                },
                {
                    title: 'Thứ 3 - Tiết 4',
                    value: '3-4'
                },
                {
                    title: 'Thứ 3 - Tiết 5',
                    value: '3-5'
                },
                {
                    title: 'Thứ 3 - Tiết 6',
                    value: '3-6'
                },
                {
                    title: 'Thứ 3 - Tiết 7',
                    value: '3-7'
                },
                {
                    title: 'Thứ 3 - Tiết 8',
                    value: '3-8'
                },
                {
                    title: 'Thứ 3 - Tiết 9',
                    value: '3-9'
                },
                {
                    title: 'Thứ 3 - Tiết 10',
                    value: '3-10'
                }
            ]
        },
        {
            title: 'Thứ 4',
            value: '4',
            children: [
                {
                    title: 'Thứ 4 - Tiết 1',
                    value: '4-1'
                },
                {
                    title: 'Thứ 4 - Tiết 2',
                    value: '4-2'
                },
                {
                    title: 'Thứ 4 - Tiết 3',
                    value: '4-3'
                },
                {
                    title: 'Thứ 4 - Tiết 4',
                    value: '4-4'
                },
                {
                    title: 'Thứ 4 - Tiết 5',
                    value: '4-5'
                },
                {
                    title: 'Thứ 4 - Tiết 6',
                    value: '4-6'
                },
                {
                    title: 'Thứ 4 - Tiết 7',
                    value: '4-7'
                },
                {
                    title: 'Thứ 4 - Tiết 8',
                    value: '4-8'
                },
                {
                    title: 'Thứ 4 - Tiết 9',
                    value: '4-9'
                },
                {
                    title: 'Thứ 4 - Tiết 10',
                    value: '4-10'
                }
            ]
        },
        {
            title: 'Thứ 5',
            value: '5',
            children: [
                {
                    title: 'Thứ 5 - Tiết 1',
                    value: '5-1'
                },
                {
                    title: 'Thứ 5 - Tiết 2',
                    value: '5-2'
                },
                {
                    title: 'Thứ 5 - Tiết 3',
                    value: '5-3'
                },
                {
                    title: 'Thứ 5 - Tiết 4',
                    value: '5-4'
                },
                {
                    title: 'Thứ 5 - Tiết 5',
                    value: '5-5'
                },
                {
                    title: 'Thứ 5 - Tiết 6',
                    value: '5-6'
                },
                {
                    title: 'Thứ 5 - Tiết 7',
                    value: '5-7'
                },
                {
                    title: 'Thứ 5 - Tiết 8',
                    value: '5-8'
                },
                {
                    title: 'Thứ 5 - Tiết 9',
                    value: '5-9'
                },
                {
                    title: 'Thứ 5 - Tiết 10',
                    value: '5-10'
                }
            ]
        },
        {
            title: 'Thứ 6',
            value: '6',
            children: [
                {
                    title: 'Thứ 6 - Tiết 1',
                    value: '6-1'
                },
                {
                    title: 'Thứ 6 - Tiết 2',
                    value: '6-2'
                },
                {
                    title: 'Thứ 6 - Tiết 3',
                    value: '6-3'
                },
                {
                    title: 'Thứ 6 - Tiết 4',
                    value: '6-4'
                },
                {
                    title: 'Thứ 6 - Tiết 5',
                    value: '6-5'
                },
                {
                    title: 'Thứ 6 - Tiết 6',
                    value: '6-6'
                },
                {
                    title: 'Thứ 6 - Tiết 7',
                    value: '6-7'
                },
                {
                    title: 'Thứ 6 - Tiết 8',
                    value: '6-8'
                },
                {
                    title: 'Thứ 6 - Tiết 9',
                    value: '6-9'
                },
                {
                    title: 'Thứ 6 - Tiết 10',
                    value: '6-10'
                }
            ]
        },
        {
            title: 'Thứ 7',
            value: '7',
            children: [
                {
                    title: 'Thứ 7 - Tiết 1',
                    value: '7-1'
                },
                {
                    title: 'Thứ 7 - Tiết 2',
                    value: '7-2'
                },
                {
                    title: 'Thứ 7 - Tiết 3',
                    value: '7-3'
                },
                {
                    title: 'Thứ 7 - Tiết 4',
                    value: '7-4'
                },
                {
                    title: 'Thứ 7 - Tiết 5',
                    value: '7-5'
                },
                {
                    title: 'Thứ 7 - Tiết 6',
                    value: '7-6'
                },
                {
                    title: 'Thứ 7 - Tiết 7',
                    value: '7-7'
                },
                {
                    title: 'Thứ 7 - Tiết 8',
                    value: '7-8'
                },
                {
                    title: 'Thứ 7 - Tiết 9',
                    value: '7-9'
                },
                {
                    title: 'Thứ 7 - Tiết 10',
                    value: '7-10'
                }
            ]
        }
    ]
    let selectFields = []
    for (let i = 0; i < props.number; i++) {
        selectFields.push(
            <div key={i}>
                <div className="ant-row">
                    <span className="ant-col ant-col-offset-6">BUỔI {i + 1}</span>
                </div>
                <Form.Item
                    name={'room' + i}
                    key={'room' + i}
                    labelCol={{
                        span: 6
                    }}
                    wrapperCol={{
                        span: 10
                    }}
                    label="Phòng"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa nhập trường này!'
                        }
                    ]}>
                    <Input className={'room' + i} />
                </Form.Item>
                <Form.Item
                    name={'startPeriod' + i}
                    key={'startPeriod' + i}
                    labelCol={{
                        span: 6
                    }}
                    wrapperCol={{
                        span: 10
                    }}
                    label="Tiết bắt đầu"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa chọn trường này!'
                        }
                    ]}>
                    <TreeSelect
                        treeData={treeData}
                        dropdownClassName={classNames('custom-select-dropdown')}
                    />
                </Form.Item>
                <Form.Item
                    name={'endPeriod' + i}
                    key={'endPeriod' + i}
                    labelCol={{
                        span: 6
                    }}
                    wrapperCol={{
                        span: 10
                    }}
                    label="Tiết kết thúc"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa chọn trường này!'
                        }
                    ]}>
                    <TreeSelect
                        treeData={treeData}
                        dropdownClassName={classNames('custom-select-dropdown')}
                    />
                </Form.Item>
            </div>
        )
    }
    return <>{selectFields}</>
}
