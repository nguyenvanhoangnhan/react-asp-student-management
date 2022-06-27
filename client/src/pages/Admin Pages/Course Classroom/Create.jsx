import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Form, Input, InputNumber, Button, Select } from "antd";
import MsgModal from "../../../components/MsgModal";
import SelectScheduleFields from "../../../components/SelectScheduleFields";
const { Option } = Select;
export default function CreateCourse({ setLoading }) {
    document.title = "Tạo lớp học phần";
    const [courses, setCourses] = useState([]);
    const [sessions, setSessions] = useState(1);
    const [modal, setModal] = useState({
        isShow: false,
        Fn: () => {},
        isDanger: false,
        msg: "",
    });
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/api/course");
                setCourses(res.data);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        let data = {
            courseClassId: e.courseClassId,
            teacherName: e.teacher,
            courseId: e.course,
        };
        let schedule = [];

        for (let i = 0; i < e.sessions; i++) {
            let startDate = e[`startPeriod${i}`].split("-")[0];
            let endDate = e[`endPeriod${i}`].split("-")[0];
            let startPeriod = e[`startPeriod${i}`].split("-")[1];
            let endPeriod = e[`endPeriod${i}`].split("-")[1];
            let room = e[`room${i}`];

            // Validating
            if (startDate !== endDate || endPeriod <= startPeriod) {
                setModal({
                    isShow: true,
                    Fn: () => setModal({ ...modal, isShow: false }),
                    isDanger: true,
                    msg: `Dữ liệu tiết học buổi ${i + 1} không hợp lệ`,
                });
                return;
            }

            schedule.push({
                dateInWeek: startDate,
                startPeriod: startPeriod,
                endPeriod: endPeriod,
                room: room,
                courseClassId: e.courseClassId,
            });
        }
        setLoading(true);
        try {
            await axios.post("/api/course-classroom", data);

            try {
                schedule.forEach(async (session) => {
                    await axios.post("/api/schedules", session);
                });
            } catch (err) {
                await axios.delete(`/api/course-classroom/${e.courseClassId}`);
                throw err;
            }

            setModal({
                isShow: true,
                Fn: () => setModal({ ...modal, isShow: false }),
                isDanger: false,
                msg: "Thêm thành công",
            });
        } catch (err) {
            console.log(err);

            setModal({
                isShow: true,
                Fn: () => setModal({ ...modal, isShow: false }),
                isDanger: true,
                msg: "Thêm thất bại.\nKiểm tra lại dữ liệu",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSessionsChange = (e) => {
        setSessions(e);
    };

    return (
        <div id="create-account">
            <MsgModal
                msg={modal.msg}
                Fn={modal.Fn}
                show={modal.isShow}
                danger={modal.isDanger}
            />
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 10,
                }}
                size="default"
                onFinish={handleSubmit}
                initialValues={{ sessions: 1 }}
            >
                <Form.Item
                    label="Mã lớp học phần"
                    name="courseClassId"
                    rules={[{ required: true, message: "Bạn chưa nhập mã!" }]}
                >
                    <Input className="courseClassId" />
                </Form.Item>
                <Form.Item
                    label="Học phần"
                    name="course"
                    rules={[
                        { required: true, message: "Bạn chưa chọn học phần!" },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Chọn học phần"
                        filterOption={(input, option) =>
                            option.children
                                .join(" ")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                    >
                        {courses.map((item) => (
                            <Option key={item.courseId} value={item.courseId}>
                                {item.courseId} - {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Giảng viên"
                    name="teacher"
                    rules={[
                        {
                            required: true,
                            message: "Bạn chưa nhập tên giảng viên!",
                        },
                    ]}
                >
                    <Input className="teacher" />
                </Form.Item>
                <Form.Item
                    label="Số buổi"
                    name="sessions"
                    rules={[
                        { required: true, message: "Bạn chưa nhập số buổi!" },
                    ]}
                >
                    <InputNumber
                        min={1}
                        name="sessions"
                        className="sessions"
                        onChange={handleSessionsChange}
                    />
                </Form.Item>

                <SelectScheduleFields number={sessions} />

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Tạo
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
