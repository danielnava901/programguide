import React from "react";
import "./Event.css";
import {getDateMinimal} from "../../utils/formatter.js";

const Event = ({event}) => {
    console.log({event});
    return (
        <div className="event-container">
            <div className="event-detail">
                <div className="event-title">{event.name}</div>
                <div className="event-duration">
                    {getDateMinimal(event.unix_begin)} a {getDateMinimal(event.unix_end)}
                </div>
                <div className="event-description">{event.description}</div>
            </div>
            <div className="event-img">

            </div>
        </div>
    )
}

export default Event;