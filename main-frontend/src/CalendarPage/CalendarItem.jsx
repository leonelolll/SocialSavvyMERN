import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import * as boostrap from "bootsrap";
import "bootstrap/dist/css/boostrap.min.css";

function CalendarItem(){
    const events = [
        {
            title: "",
            start: "",
            end: "",
        }
    ]

    return(

        <div>
            <Fullcalendar
            plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
            initialView={"dayGridMonth"}
            headerToolbar={{
                start: "today prev,next",
                center: "title",
                end: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            height={"90vh"}
            />
        </div>
    );
}

export default CalendarItem;