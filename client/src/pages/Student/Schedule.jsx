import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import axios from 'axios'

export default function Schedule({ user, setLoading }) {
    document.title = 'Lịch học'
    const localizer = momentLocalizer(moment)
    const [events, setEvents] = useState([])
    const periodList = {
        1: { startHour: 7, startMinute: 0, endHour: 7, endMinute: 50 },
        2: { startHour: 8, startMinute: 0, endHour: 8, endMinute: 50 },
        3: { startHour: 9, startMinute: 0, endHour: 9, endMinute: 50 },
        4: { startHour: 10, startMinute: 0, endHour: 10, endMinute: 50 },
        5: { startHour: 11, startMinute: 0, endHour: 11, endMinute: 50 },
        6: { startHour: 12, startMinute: 30, endHour: 13, endMinute: 20 },
        7: { startHour: 13, startMinute: 30, endHour: 14, endMinute: 20 },
        8: { startHour: 14, startMinute: 30, endHour: 15, endMinute: 20 },
        9: { startHour: 15, startMinute: 30, endHour: 16, endMinute: 20 },
        10: { startHour: 16, startMinute: 30, endHour: 17, endMinute: 20 }
    }

    const getDayInWeek = (day) => {
        const today = new Date()
        const first = today.getDate() - today.getDay() + day - 1
        return new Date(today.setDate(first))
    }

    const eventsFromClassesData = (classesData) => {
        let events = []
        let id = 0
        classesData.forEach((item) => {
            item.schedule.forEach((scheduleItem) => {
                let startPeriod = scheduleItem.startPeriod
                let endPeriod = scheduleItem.endPeriod
                let startPeriodTime = periodList[startPeriod]
                let endPeriodTime = periodList[endPeriod]
                let date = getDayInWeek(scheduleItem.dateInWeek)
                events.push({
                    id: id,
                    allDay: false,
                    title: (
                        <span className="whitespace-pre-wrap">{`${item.name}\n${item.teacher}\n${scheduleItem.room}`}</span>
                    ),
                    start: new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        startPeriodTime.startHour,
                        startPeriodTime.startMinute
                    ),
                    end: new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        endPeriodTime.endHour,
                        endPeriodTime.endMinute
                    )
                })
                id++
            })
        })
        return events
    }

    const fetchData = async () => {
        let data = []
        setLoading(true)
        try {
            const { data: courseClassroomsData } = await axios.get(
                `/api/course-classroom/user/${user.name}`
            )
            for (let index = 0; index < courseClassroomsData.length; index++) {
                let item = courseClassroomsData[index]
                if (item.courseClassroom.isComplete === true) continue
                const { data: course } = await axios.get(
                    `/api/course/${item.courseClassroom.courseId}`
                )
                if (course.isAvailable === true) continue
                data.push({
                    name: course.name,
                    teacher: item.teacherName,
                    schedule: item.schedule
                })
            }
        } catch (err) {
            console.log(err)
        } finally {
            setEvents(eventsFromClassesData(data))
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div id="schedule">
            <h3 className="title">LỊCH HỌC</h3>
            <div className="calendar-container">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    views=""
                    toolbar={false}
                    min={new Date(0, 0, 0, 6, 0, 0)}
                    max={new Date(0, 0, 0, 20, 0, 0)}
                />
            </div>
        </div>
    )
}
