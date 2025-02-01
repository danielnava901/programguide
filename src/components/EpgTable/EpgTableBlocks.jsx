import React from "react";

const array24col = [-1, ...[...Array(24).keys()]];
const array12col = [...[...Array(12).keys()]];


const EpgTableBlocks = ({colSpan = 1, showText = true}) => {
    return <tr>
        {
            array24col
                .map((hour) => {
                    return array12col.map((min) => {
                        return <th key={`${hour}-${min}`} colSpan={colSpan}>
                            {
                                showText ? `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}hrs}` : null
                            }
                        </th>
                    });
                })
        }
    </tr>
}

export default EpgTableBlocks;