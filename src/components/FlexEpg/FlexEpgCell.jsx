import React from "react";

const FlexEpgCell = ({event, width, onClick, isSelected, endToday}) => {
    return <div
            key={event.id}
            style={{
                width: `${width}px`, borderRight: endToday && "1px solid white"
            }}
            className={`flex-td ${isSelected ? "selected" : ""}`}
            onClick={onClick} >
                <div className="td-box-title">{event.name}</div>
                <div className="td-box-hours">{
                    (!!event && !!event.date_begin && !!event.date_end)  &&
                        `${event.date_begin.split(" ")[1].split(":").slice(0,2).join(":")} - 
                            ${event.date_end.split(" ")[1].split(":").slice(0,2).join(":")}`
                }</div>
    </div>
}

export default FlexEpgCell;