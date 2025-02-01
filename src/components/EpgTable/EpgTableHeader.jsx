import React from "react";

const EpgTableHeader = React.memo(() => {
    return <tr>
        <th colSpan={12}>Hoy</th>
        {
            [...[...Array(24).keys()]]
                .map((hour, indexHr) => {
                    return [0, 30].map((min, indexMin) => {
                        return <th key={`${hour}-${min}`}
                                   colSpan={6}>
                            {String(hour).padStart(2, "0")}:{String(min).padStart(2, "0")}hrs
                        </th>
                    });
                })
        }
    </tr>
});

export default EpgTableHeader;