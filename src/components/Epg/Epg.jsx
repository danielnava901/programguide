import React, {useState} from "react";
import {getDateFormatted} from "../../utils/formatter.js";
import {useFetchData} from "../../hooks/useFetchData.js";
import {EpgTable} from "../EpgTable/index.js";


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

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return <div>
        <EpgTable data={data} />
    </div>
}

export default Epg;