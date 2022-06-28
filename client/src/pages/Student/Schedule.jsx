import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function Schedule(props) {
    const localizer = momentLocalizer(moment)
    const [events, setEvents] = useState([])
    const [classes, setClasses] = useState(        [
        {
            name: 'Tiếng Nhật 3',
            schedule: [null ,{room: 'H102', period: '6-7'}, {room: 'A134', period: '6-7'}, null ,{room: 'A134', period: '4-5'},null ,null]
        },
        {
            name: 'Lập trình .NET',
            schedule: [null ,null ,{room: 'E209', period: '3-5'},null ,null ,null ,null]
        },
        {
            name: 'Công nghệ phần mềm',
            schedule: [null , null ,{room: 'E209', period: '1-2'},null ,null ,null ,null]
        },
        {
            name: 'Chủ nghĩa XHKH',
            schedule: [null , null ,null ,{room: 'F309', period: '1-2'},null ,null ,null]
        },
    ]) 
    const periodList = {
        '1': {  startHour: 7, startMinute: 0, endHour: 7, endMinute: 50 },
        '2': {  startHour: 8, startMinute: 0, endHour: 8, endMinute: 50 },
        '3': {  startHour: 9, startMinute: 0, endHour: 9, endMinute: 50 },
        '4': {  startHour: 10, startMinute: 0, endHour: 10, endMinute: 50 },
        '5': {  startHour: 11, startMinute: 0, endHour: 11, endMinute: 50 },
        '6': {  startHour: 12, startMinute: 30, endHour: 13, endMinute: 20 },
        '7': {  startHour: 13, startMinute: 30, endHour: 14, endMinute: 20 },
        '8': {  startHour: 14, startMinute: 30, endHour: 15, endMinute: 20 },
        '9': {  startHour: 15, startMinute: 30, endHour: 16, endMinute: 20 },
        '10': {  startHour: 16, startMinute: 30, endHour: 17, endMinute: 20 },
    }

    const getDayInWeek = (day) => {
        const today = new Date();
        const first = today.getDate() - today.getDay() + day;
        return new Date(today.setDate(first));
    }

    const eventsFromRawData = (data) => {
        let events = []
        let id = 0;
        data.forEach(item => {
            item.schedule.forEach((scheduleItem, index) => {
                if (scheduleItem) {
                    let startPeriod = scheduleItem.period.split("-")[0];
                    let endPeriod = scheduleItem.period.split("-")[1];
                    let startPeriodTime = periodList[startPeriod];
                    let endPeriodTime = periodList[endPeriod];
                    let date = getDayInWeek(index);
                    events.push({
                        id: id,
                        title: `${item.name} (${scheduleItem.room})`,
                        start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), startPeriodTime.startHour, startPeriodTime.startMinute),
                        end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), endPeriodTime.endHour, endPeriodTime.endMinute)
                    })
                    id++;
                }
            })
        })
        return events;
    }

    useEffect(() => {
        document.title = 'Lịch học'
        setEvents(eventsFromRawData(classes))
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
                    views=''
                    toolbar={false}
                    min={new Date(0, 0, 0, 6, 0, 0)}
                    max={new Date(0, 0, 0, 20,0 , 0)}
                />
            </div>
        </div>
    );
}
