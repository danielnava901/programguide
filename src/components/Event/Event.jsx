import React from "react";
import "./Event.css";
import {getDateMinimal, getDurationFormat} from "../../utils/formatter.js";

const Event = ({event}) => {
    if(!event) return <div className="event-container">No hay información</div>;

    return (
        <div className="event-container">
            <div className="event-detail">
                <div className="event-title">{event.name}</div>
                <div className="event-duration">
                    <span style={{marginRight: "10px"}}>
                        De {getDateMinimal(event.unix_begin)} a {getDateMinimal(event.unix_end)}
                    </span>
                    <span style={{marginRight: "10px"}}>
                        {getDurationFormat(event.unix_end - event.unix_begin)}
                    </span>
                    <span className="event-parental">{event.parental_rating}</span>
                </div>
                <div className="event-description">{event.description}</div>
            </div>
            <div className="event-image" style={{
                backgroundImage: `url(${event.ext_eventimage_name})`,
            }}>&nbsp;
            </div>
        </div>
    )
}

export default Event;