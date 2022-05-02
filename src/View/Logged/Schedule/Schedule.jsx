import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function Schedule(props) {
    const localizer = momentLocalizer(moment); 
    const sampleEvents = [
        {
            id: 0,
            title: "Lý thuyết thông tin",
            start: new Date(2022, 3, 1, 8, 0),
            end: new Date(2022, 3, 1, 11, 50),
        },
        {
            id: 1,
            title: "Lập trình hướng đối tượng",
            start: new Date(2022, 3, 1, 13, 30),
            end: new Date(2022, 3, 1, 17, 2),
        },
    ]
    return (
        <div id="schedule">
            <h3 className="title">LỊCH HỌC</h3>
            <div className="calendar-container">
                <Calendar
                    localizer={localizer}
                    events={sampleEvents}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    views=''
                    toolbar={false}
                    min={new Date(0, 0, 0, 7, 0, 0)}
                    max={new Date(0, 0, 0, 22,0 , 0)}
                />
            </div>
        </div>
    );
}
