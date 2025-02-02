import React, {useState} from "react";
import {getDateFormatted} from "../../utils/formatter.js";
import {useFetchData} from "../../hooks/useFetchData.js";
import {EpgTable} from "../EpgTable/index.js";
import {Event} from "../Event/index.js";


const buldUrl = () => {
    const dates = getDateFormatted();
    return "https://mfwkweb-api.clarovideo.net/services/epg/channel?" +
        "device_id=web&" +
        "device_category=web&" +
        "device_model=web&" +
        "device_type=web&" +
        "device_so=Chrome&" +
        "format=json&" +
        "device_manufacturer=generic&" +
        "authpn=webclient&" +
        "authpt=tfg1h3j4k6fd7&" +
        "api_version=v5.93&" +
        "region=guatemala&" +
        "HKS=web61144bb49d549&" +
        "user_id=54343080&" +
        `date_from=${dates.now}&` +
        `date_to=${dates.tomorrow}&` +
        "quantity=200"
}

const Epg = () => {
    const url= buldUrl();
    const [indexEnd, setIndexEnd] = useState(10);
    const {data, loading, error} = useFetchData(url, indexEnd);
    const [currentEvent, setCurrentEvent] = useState(null);

    const onScrollEnd = () => {
        setIndexEnd(prev => {
            return prev + 10
        });
    }

    //TODO: Componentes Loading y Error
    if (loading) return <div style={{display: "flex", width: "100vw", height: "100vh",
        justifyContent: "center", alignItems: "center"}}>Cargando...</div>;
    if (error) return <p>Error: {error}</p>;

    return <>
        <Event event={currentEvent} />
        <EpgTable
            data={data}
            loading={loading}
            onSelectEvent={(event) => {setCurrentEvent(event)}}
            onScrollEnd={onScrollEnd} />
    </>
}

export default Epg;