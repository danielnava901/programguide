import React from "react";
import "./EpgGrid.css";
import {getTodayEpoch} from "../../utils/formatter.js";

const bloques = [0, 30 ];
const Blocks = React.memo(() => {
    return <>
        <div className="sticky-top hoy" key="hoy">Hoy</div>
        {
            [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
                .map((hour, indexHr) => {
                    return bloques.map((min, indexMin) => {
                        return <div key={`${hour}-${min}`} className="sticky-top" >
                            {String(hour).padStart(2, "0")}:{String(min).padStart(2, "0")}hrs
                        </div>
                    });
            })
        }
    </>
});

const EpgGrid = ({data}) => {
    let epochDates = getTodayEpoch();

    return (
        <div className="table-container">
            <div className="grid-table">
                <Blocks />
                {
                    data.map((channel) => {
                        let currentCol = 1;
                        return <>
                            <div className="sticky-left" key={channel.id}>
                                {channel.name}
                            </div>
                            {
                                channel.events.map((event) => {

                                    let unixEnd = event.unix_end;
                                    let unixBegin = event.unix_begin;
                                    let duration = Math.ceil((unixEnd - unixBegin)) / 3600 ;
                                    let colSpan = duration * 2

                                    let comenzado = 0;
                                    let widthBox = Math.floor((duration * 2 * 100) / Math.ceil(colSpan));

                                    //PG inició el dia anterior
                                    if(epochDates.dayStart > unixBegin) {
                                        comenzado = Math.ceil((epochDates.dayStart - unixBegin)) / 3600;
                                        colSpan = colSpan - (comenzado * 2)
                                    }
                                    let gridColumn = `${currentCol} / ${currentCol + colSpan}`;
                                    currentCol = colSpan;

                                    console.log({gridColumn});

                                    return <div key={event.id}
                                        className="cell"
                                        style={{gridColumn: gridColumn}}
                                    >
                                        <div className="title">{event.name}</div>
                                        <div className="hours">{
                                            `${event.date_begin.split(" ")[1].split(":").slice(0,2).join(":")} - 
                                            ${event.date_end.split(" ")[1].split(":").slice(0,2).join(":")}`
                                        }</div>
                                        <div>{duration}</div>
                                    </div>
                                })
                            }
                        </>
                    })
                }
            </div>
        </div>
    );
}


export default EpgGrid;