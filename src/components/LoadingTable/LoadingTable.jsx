import React from "react";
import "./LoadingTable.css";

export const LoadingTable = () => {
    return (<>
        <div style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            Cargando...
        </div>

        <div className="loading-skeleton-container">
            <div className="loading-skeleton">&nbsp;</div>
            <div className="loading-skeleton">&nbsp;</div>
            <div className="loading-skeleton">&nbsp;</div>
            <div className="loading-skeleton">&nbsp;</div>
            <div className="loading-skeleton">&nbsp;</div>
            <div className="loading-skeleton">&nbsp;</div>
        </div>
    </>)
}

