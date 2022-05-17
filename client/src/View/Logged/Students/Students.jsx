import React from 'react'
import { Table, Tooltip } from 'antd'
export default function Students() {
  const someLink = 'https://imgflip.com/s/meme/Doge.jpg';
  const dataSource = [
    {
      key: '1',
      avatar: <img src={someLink} className="students-table-avatar" alt="#"/>,
      name: 'Nguyễn Văn Hoàng Nhân',
      studentID: '102200312',
      studentClass: '20TCLC_Nhat1',
    },
    {
      key: '2',
      avatar: <img src={someLink} className="students-table-avatar" alt="#"/>,
      name: 'Nguyễn Văn Hoàng Nhân',
      studentID: '102200312',
      studentClass: '20TCLC_Nhat1',
    },
    {
      key: '3',
      avatar: <img src={someLink} className="students-table-avatar" alt="#"/>,
      name: 'Nguyễn Văn Hoàng Nhân',
      studentID: '102200312',
      studentClass: '20TCLC_Nhat1',
    },
    {
      key: '4',
      avatar: <img src={someLink} className="students-table-avatar" alt="#"/>,
      name: 'Nguyễn Văn Hoàng Nhân',
      studentID: '102200312',
      studentClass: '20TCLC_Nhat1',
    },
    {
      key: '5',
      avatar: <img src={someLink} className="students-table-avatar" alt="#"/>,
      name: 'Nguyễn Văn Hoàng Nhân',
      studentID: '102200312',
      studentClass: '20TCLC_Nhat1',
    },
    {
      key: '6',
      avatar: <img src={someLink} className="students-table-avatar" alt="#"/>,
      name: 'Nguyễn Văn Hoàng Nhân',
      studentID: '102200312',
      studentClass: '20TCLC_Nhat1',
    },
    {
      key: '7',
      avatar: <img src={someLink} className="students-table-avatar" alt="#"/>,
      name: 'Nguyễn Văn Hoàng Nhân',
      studentID: '102200312',
      studentClass: '20TCLC_Nhat1',
    },
    {
      key: '8',
      avatar: <img src={someLink} className="students-table-avatar" alt="#"/>,
      name: 'Nguyễn Văn Hoàng Nhân',
      studentID: '102200312',
      studentClass: '20TCLC_Nhat1',
    },
    {
      key: '9',
      avatar: <img src={someLink} className="students-table-avatar" alt="#"/>,
      name: 'Nguyễn Văn Hoàng Nhân',
      studentID: '102200312',
      studentClass: '20TCLC_Nhat1',
    },
    {
      key: '10',
      avatar: <img src={someLink} className="students-table-avatar" alt="#"/>,
      name: 'Nguyễn Văn Hoàng Nhân',
      studentID: '102200312',
      studentClass: '20TCLC_Nhat1',
    },
    {
      key: '11',
      avatar: <img src={someLink} className="students-table-avatar" alt="#"/>,
      name: 'Nguyễn Văn Hoàng Nhân',
      studentID: '102200312',
      studentClass: '20TCLC_Nhat1',
    },
    {
      key: '12',
      avatar: <img src={someLink} className="students-table-avatar" alt="#"/>,
      name: 'Nguyễn Văn Hoàng Nhân',
      studentID: '102200312',
      studentClass: '20TCLC_Nhat1',
    },
    {
      key: '13',
      avatar: <img src={someLink} className="students-table-avatar" alt="#"/>,
      name: 'Nguyễn Văn Hoàng Nhân',
      studentID: '102200312',
      studentClass: '20TCLC_Nhat1',
    },
    {
      key: '14',
      avatar: <img src={someLink} className="students-table-avatar" alt="#"/>,
      name: 'Nguyễn Văn Hoàng Nhân',
      studentID: '102200312',
      studentClass: '20TCLC_Nhat1',
    },
    {
      key: '15',
      avatar: <img src={someLink} className="students-table-avatar" alt="#"/>,
      name: 'Nguyễn Văn Hoàng Nhân',
      studentID: '102200312',
      studentClass: '20TCLC_Nhat1',
    },
    {
      key: '16',
      avatar: <img src={someLink} className="students-table-avatar" alt="#"/>,
      name: 'Nguyễn Văn Hoàng Nhân',
      studentID: '102200312',
      studentClass: '20TCLC_Nhat1',
    },
    {
      key: '17',
      avatar: <img src={someLink} className="students-table-avatar" alt="#"/>,
      name: 'Nguyễn Văn Hoàng Nhân',
      studentID: '102200312',
      studentClass: '20TCLC_Nhat1',
    },
  ];

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'avatar',
      key: 'avatar',
      width: '80px',
    },
    {
      title: 'MSSV',
      dataIndex: 'studentID',
      key: 'studentID',
      width: '18%',
      ellipsis: {
        showTitle: false
      },
      render: studentID => (
        <Tooltip placement="topLeft" title={studentID}>
          {studentID}
        </Tooltip>
      ),
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
      ellipsis: {
        showTitle: false
      },
      width: '30%',
      render: name => (
        <Tooltip placement="topLeft" title={name}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: 'Lớp SH',
      dataIndex: 'studentClass',
      key: 'studentClass',
      ellipsis: {
        showTitle: false
      },
      render: studentClass => (
        <Tooltip placement="topLeft" title={studentClass}>
          {studentClass}
        </Tooltip>
      ),
    },
  ];
  return (
    <div id="students">
      <h3 className="title">STUDENTS</h3>
      <Table className='students-table'
        dataSource={dataSource}
        columns={columns}
        pagination={
          {
            position: ['topRight'],
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
          }
        }
      />
    </div>
  )
}
