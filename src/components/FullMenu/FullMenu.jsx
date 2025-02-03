import React from "react";
import "./FullMenu.css";
import {useEffect, useState} from "react";
import Markdown from "react-markdown";

export const FullMenu = ({option}) => {
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if(option === "readme") {
            fetch("/README.md")
                .then((response) => response.text())
                .then((text) => setContent(text))
                .catch((error) => {
                    console.error("Error de carga", error);
                    setError(error.message);
                });
        }
    }, [option]);

    if(!!error) return <div>{error}</div>

    return (<div className="fullmenu-container">
            <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
                {option === "readme" && <Markdown>{content}</Markdown>}
            </div>
        </div>
    )
}