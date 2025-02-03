import React from "react";

const EpgTableTd = ({event, colSpan, onClick, className = ''}) => {
    return <td colSpan={colSpan} key={event.id}>
        <div className={`td-box ${className}`} onClick={onClick} >
            <div className="td-box-title">{event.name}</div>
            <div className="td-box-hours">{
                (!!event && !!event.date_begin && !!event.date_end)  && `${event.date_begin.split(" ")[1].split(":").slice(0,2).join(":")} - 
                    ${event.date_end.split(" ")[1].split(":").slice(0,2).join(":")}`
            }</div>
        </div>
    </td>
}

export default EpgTableTd;