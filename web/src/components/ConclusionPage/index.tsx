import React from "react";
import { } from "react-router-dom";

import "./styles.css"

interface ConclusionPageProperties {
    title: string;
    description: string;
    buttonMessage: string;
}

const ConclusionPage: React.FC<ConclusionPageProperties> = ({ title, description, buttonMessage }) => {
    return (
        <div id="conclusion-page">

            <hgroup>
                <h1>{title}</h1>
                <h4>{description}</h4>
            </hgroup>
            
            <button>{buttonMessage}</button>

        </div>
    )
}