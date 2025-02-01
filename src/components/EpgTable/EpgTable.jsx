import React, {useState} from "react";
import "./EpgTable.css";
import {getTodayEpoch} from "../../utils/formatter.js";
import {EpgTableBlocks, EpgTableHeader, EpgTableTd} from "./index.js";
import {Event} from "../Event";


const EpgTable = ({data}) => {
    const [currentEvent, setCurrentEvent] = useState(null);
    let epochDates = getTodayEpoch();


    return <div className="EpgTable">
        <div className="EpgTable-description">
            {
                !!currentEvent && <Event event={currentEvent} />
            }
        </div>
        <div className="EpgTable-table-container">
            <table>
                <thead>
                <EpgTableBlocks colSpan={1} showText={false} />
                <EpgTableHeader/>
                </thead>
                <tbody>
                {
                    data.map((channel) => {

                        return <tr key={channel.id}>
                            {
                                channel.events.map((event, indexEvent) => {
                                    let unixEnd = event.unix_end;
                                    let unixBegin = event.unix_begin;
                                    let duration = Math.ceil((unixEnd - unixBegin)) / 3600 ;
                                    let colSpan = duration * 12

                                    let startedAt = 0;

                                    //Si el evento inició el dia anterior
                                    if(epochDates.dayStart > unixBegin) {
                                        startedAt = Math.ceil((epochDates.dayStart - unixBegin)) / 3600;
                                        colSpan = colSpan - (startedAt * 12)
                                    }

                                    if(indexEvent === 0) {
                                        return <>
                                            <td key={`${channel.id}-${event.id}`}
                                                colSpan={12}>
                                                <div className="td-box">
                                                    <div className="title">{channel.name}</div>
                                                </div>
                                            </td>
                                            <EpgTableTd
                                                key={event.id}
                                                colSpan={colSpan}
                                                duration={duration}
                                                event={event}
                                                onClick={() => {
                                                    setCurrentEvent(event);
                                                }}
                                            />
                                        </>
                                    }

                                    return <EpgTableTd
                                        key={event.id}
                                        colSpan={colSpan}
                                        duration={duration}
                                        event={event}
                                        onClick={() => {
                                            setCurrentEvent(event);
                                       }}
                                    />
                                })
                            }
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    </div>
}

export default EpgTable;