import React from "react";
import "./Event.css";
import {getDateMinimal, getDurationFormat} from "../../utils/formatter.js";

const Event = ({event}) => {
    if(!event) return <div className="event-container"></div>;

    return (
        <div className="event-container">
            <div className="event-detail">
                <div className="event-title">{event.name}</div>
                <div className="event-duration">
                    <span style={{marginRight: "15px"}}>
                        De {getDateMinimal(event.unix_begin)} a {getDateMinimal(event.unix_end)}
                    </span>
                    <span style={{marginRight: "15px"}}>
                        Dur: {getDurationFormat(event.unix_end - event.unix_begin)}
                    </span>
                    <span className="event-parental">{event.parental_rating}</span>
                </div>
                <div className="event-description">{event.description}</div>
            </div>
        </div>
    )
}

export default Event;