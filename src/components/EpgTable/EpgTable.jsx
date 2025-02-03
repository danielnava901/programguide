import React, {useCallback, useEffect, useRef, useState} from "react";
import "./EpgTable.css";
import {getTodayEpoch} from "../../utils/formatter.js";
import {EpgTableHeader, EpgTableTd} from "./index.js";


const EpgTable = ({data, onSelectEvent, onScrollEnd, loading}) => {
    const lastItemRef = useRef(null);
    const [current, setCurrent] = useState(null);
    let epochDates = getTodayEpoch();

    const lastElementRef = useCallback((node) => {
        //if (loading || !window.IntersectionObserver) return;
        if (loading) return;
        if (lastItemRef.current) lastItemRef.current.disconnect();

        lastItemRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                onScrollEnd()
            }
        });

        if (node) lastItemRef.current.observe(node);
    }, [loading]);

    if (loading) return <div style={{
        position: "absolute", left: 0, right:0, bottom: 0, top: 0,
        display: "flex", width: "100vw", height: "100vh",
        justifyContent: "center", alignItems: "center"}}>Cargando...</div>;

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
                                    let startedAt = 0;
                                    let unixEnd = event.unix_end;
                                    let unixBegin = event.unix_begin;
                                    let duration = Math.ceil((unixEnd - unixBegin)) / 3600 ; //Duración en hrs
                                    let colSpan = Math.ceil(duration * 12); //1hr equivale a 12 cols del theader

                                    if(duration < 1 && duration % 0.5) {
                                        if(duration < 0.5) {
                                            colSpan = Math.floor(duration * 12);
                                        }else {
                                            colSpan = Math.ceil(duration * 12);
                                        }
                                    }

                                    //Si el evento inició el dia anterior, Se calculan las horas de haber comenzado
                                    // y se le restan los colspan que equivalgan al cálculo
                                    if(epochDates.dayStart > unixBegin) {
                                        startedAt = Math.ceil((epochDates.dayStart - unixBegin)) / 3600;
                                        colSpan = colSpan - (startedAt * 12) // se le restan los col equivalentes a el tiempo ocurrido desde que comenzó
                                    }


                                    return <React.Fragment key={event.id}>
                                        {
                                            indexEvent === 0 ? (
                                                <td key={`${channel.id}-${event.id}`} colSpan={12}>
                                                    <div className="td-channel">
                                                        <div className="td-box-image">
                                                            <img src={channel.image} alt={channel.name}/>
                                                        </div>
                                                        <div className="td-box-title">{channel.name}</div>
                                                    </div>
                                                </td>
                                            ) : null

                                        }
                                        <EpgTableTd
                                            key={event.id}
                                            colSpan={colSpan}
                                            duration={duration}
                                            event={event}
                                            onClick={() => {
                                                onSelectEvent(event);
                                                setCurrent(event);
                                            }}
                                            className={(!!current && current.id === event.id) ? "selected" : ""}
                                        />
                                    </React.Fragment>
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