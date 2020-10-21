import React from "react";
import { useHistory } from "react-router-dom";

import { FiCheck } from "react-icons/fi";

import "./styles.css";

interface ConclusionPageProps {
    title: string;
    description: string;
    textButton: string;
    redirectTo?: string;
}

const ConclusionPage: React.FC<ConclusionPageProps> = ({ title, description, textButton, redirectTo = "/login" }) => {

    const history = useHistory();

    function handleRedirect() {
        history.push(redirectTo)
    }

    return (
        <div id="conclusion-page">
            <div className="icon-container">
                <FiCheck />
            </div>
            <div className="conclusion-page-content">
                <hgroup>
                    <h1>{title}</h1>
                    <h4>{description}</h4>
                </hgroup>
            </div>
            <button onClick={handleRedirect}>{textButton}</button>
        </div>
    )
}

export default ConclusionPage;