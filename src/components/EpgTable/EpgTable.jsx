import React, {useCallback, useEffect, useRef, useState} from "react";
import "./EpgTable.css";
import {getTodayEpoch} from "../../utils/formatter.js";
import {EpgTableHeader, EpgTableTd} from "./index.js";


const EpgTable = ({data, onSelectEvent, onScrollEnd, loading}) => {
    const lastItemRef = useRef(null);
    let epochDates = getTodayEpoch();

    const lastElementRef = useCallback((node) => {
        if (loading) return;
        if (lastItemRef.current) lastItemRef.current.disconnect();

        lastItemRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                onScrollEnd()
            }
        });

        if (node) lastItemRef.current.observe(node);
    }, [loading]);

    return <div className="epgtable-table-container">
            <table>
                <thead>
                    <EpgTableHeader/>
                </thead>
                <tbody>
                {
                    data.map((channel, indexChannel) => {
                        return <tr key={channel.id}
                                   ref={indexChannel === (data.length - 1) ? lastElementRef : null}>
                            {
                                channel.events.map((event, indexEvent) => {
                                    let unixEnd = event.unix_end;
                                    let unixBegin = event.unix_begin;
                                    let duration = Math.ceil((unixEnd - unixBegin)) / 3600 ;
                                    let colSpan = duration * 12
                                    let startedAt = 0;

                                    //Si el evento inició el dia anterior, Se calculan las horas de haber comenzado
                                    // y se le restan los colspan que equivalgan al cálculo
                                    if(epochDates.dayStart > unixBegin) {
                                        startedAt = Math.ceil((epochDates.dayStart - unixBegin)) / 3600;
                                        colSpan = colSpan - (startedAt * 12)
                                    }

                                    if(indexEvent === 0) {
                                        return <>
                                            <td key={`${channel.id}-${event.id}`} colSpan={12}>
                                                <div className="td-channel">
                                                    <div className="td-box-image">
                                                        <img src={channel.image} alt={channel.name}/>
                                                    </div>
                                                    <div className="td-box-title">{channel.name}</div>
                                                </div>
                                            </td>
                                            <EpgTableTd
                                                key={event.id}
                                                colSpan={colSpan}
                                                duration={duration}
                                                event={event}
                                                onClick={() => {
                                                    onSelectEvent(event);
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
                                            onSelectEvent(event);
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

}

export default EpgTable;