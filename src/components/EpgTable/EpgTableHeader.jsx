import React from "react";

const array24col = [-1, ...[...Array(24).keys()]];
const array12col = [...[...Array(12).keys()]];


const EpgTableHeader = React.memo(() => {
    return <>
        <tr>
            {
                array24col
                    .map((hour) => {
                        return array12col.map((min) => {
                            return <th key={`block-${hour}-${min}`}></th>
                        });
                    })
            }
        </tr>
        <tr>
            <th colSpan={12} >Hoy</th>
            {
                [...[...Array(24).keys()]]
                    .map((hour, indexHr) => {
                        return [0, 30].map((min, indexMin) => {
                            return <th key={`hour-${hour}-${min}`}
                                       colSpan={6}>
                                {String(hour).padStart(2, "0")}:{String(min).padStart(2, "0")}hrs
                            </th>
                        });
                    })
            }
        </tr>
        </>
});

export default EpgTableHeader;