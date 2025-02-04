import "./FlexEpg.css"
import React from "react";
import {LoadingTable} from "../LoadingTable/LoadingTable.jsx";
import {useCallback, useRef, useState} from "react";
import {getTodayEpoch} from "../../utils/formatter.js";
import {FlexEpgCell} from "./index.js";

const array24col = [...Array(24).keys()];


export function FlexEpg({data, onSelectEvent, onScrollEnd, loading}) {
    const [current, setCurrent] = useState(null);
    const lastItemRef = useRef(null);
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

    if (loading) return <LoadingTable />;

    if(data.length === 0) return <div style={{ width: "100%", padding: "10px", textAlign: "center"}}>
        <span>No hay datos para mostrar, intente más tarde</span>
    </div>

    return (
        <div className="flex-container">
            <div className="flex-container-wrapper">
                <div className="flex-tr flex-header">
                    <div className="flex-hoy">Hoy</div>
                    {/*
                        Crea las columnas de la tabla, colocando una columna correspondiente a "30min"
                    */}
                    {
                        [...array24col]
                            .map((hour, indexHr) => {
                                return [0, 30].map((min, indexMin) => {
                                    return <div key={`hour-${hour}-${min}`} className="flex-th">
                                        {String(hour).padStart(2, "0")}:{String(min).padStart(2, "0")}hrs
                                    </div>
                                });
                            })
                    }
                </div>

                {
                    data
                        .map((channel, indexChannel) => {
                        return <div key={indexChannel}
                                    className="flex-tr"
                                    ref={indexChannel === (data.length - 1) ? lastElementRef : null}>
                            {
                                channel.events
                                    .filter((event) => {

                                        // Caso en el que el evento comienza hasta 23 min antes de media noche
                                        // ya no se mostraría
                                        return !(event.unix_begin > (epochDates.dayEnd - 1381))
                                    })
                                    .map((event, indexEvent) => {
                                    let startedAt = 0;
                                    let hr = 400; //px
                                    let unixEnd = event.unix_end;
                                    let unixBegin = event.unix_begin;
                                    let duration = Math.ceil(unixEnd - unixBegin) / 3600; //Duración en hrs
                                    let colSpan = Math.floor(duration * hr); //1hr equivale a 200px


                                    //Si el evento inició el dia anterior,
                                    // Se calculan las horas de haber comenzado
                                    // y se le restan los colspan que equivalgan al cálculo
                                    if (epochDates.dayStart > unixBegin) {
                                        startedAt = Math.ceil((epochDates.dayStart - unixBegin)) / 3600;
                                        // se le restan los col equivalentes a el tiempo ocurrido desde que comenzó
                                        colSpan = colSpan - (startedAt * hr)
                                    }else if(epochDates.dayEnd < unixEnd) {
                                        //si el evento termina el siguiente día, se corta al final de la tabla
                                        //para evitar se desborde
                                        let a = Math.ceil(epochDates.dayEnd - unixBegin) / 3600;
                                        colSpan = hr * a;
                                    }


                                    return <React.Fragment key={`F-${event.id}`}>
                                        {
                                            //Coloca div para mostrar nombre del channel,
                                            //solo ocurre si es el primer evento
                                            indexEvent === 0 ? (
                                                <div key={`${indexEvent}-${channel.id}-${event.id}`}
                                                     className="flex-channel"
                                                >
                                                    <div className="td-channel">
                                                        <div className="td-box-image">
                                                            <img src={channel.image} alt={channel.name}/>
                                                        </div>
                                                        <div className="td-box-title">{channel.name}</div>
                                                    </div>
                                                </div>
                                            ) : null

                                        }
                                        <FlexEpgCell
                                            key={`${event.id}-${channel.id}-${indexEvent}`}
                                            event={event}

                                            onClick={() => {
                                                onSelectEvent(event);
                                                setCurrent(event);
                                            }}
                                            width={colSpan}
                                            endToday={unixEnd < epochDates.dayEnd}
                                            isSelected={!!current && current.id === event.id}
                                        />
                                    </React.Fragment>
                                })
                            }
                        </div>
                    })
                }


            </div>
        </div>
    )
}
