import "./FullMenu.css";
import {useEffect, useState} from "react";
import Markdown from "react-markdown";

export const FullMenu = ({option}) => {
    const [content, setContent] = useState("");

    useEffect(() => {
        if(option === "readme") {
            fetch("/README.md")
                .then((response) => response.text())
                .then((text) => setContent(text))
                .catch((error) => console.error("Error cargando el README:", error));
        }

    }, [option]);

    return (
        <div className="fullmenu-container">
            <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
                <Markdown>{content}</Markdown>
            </div>
        </div>
    )
}