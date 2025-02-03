import React from "react";
import "./LoadingEvent.css";


const LoadingEvent = () => {
    return <div className="loading-event-container">
        <div className="loading-skeleton loading-event-title"></div>
        <div className="loading-skeleton loading-event-detail"></div>
        <div className="loading-skeleton loading-event-description"></div>
    </div>
}

export default LoadingEvent;