import React from "react";

import { useHistory } from "react-router-dom";

import "./styles.css";
import { FiCheck } from "react-icons/fi"

function RegisterConclusion() {

    let history = useHistory();

    function returnToLandingPage() {
        history.push("/");
    }

    return (
        <div id="conclusion-page">
            <div className="conclusion-page-content">
                <div className="icon-container">
                    <i>
                        <FiCheck />
                    </i>
                </div>
                <hgroup>
                    <h1>Cadastro concluído</h1>
                    <h4>Agora você faz parte da plataforma da Proffy</h4>
                    <h4>Tenha uma ótima experiencia.</h4>
                </hgroup>

                <button onClick={ returnToLandingPage }>Fazer login</button>
            </div>
        </div>
    )
}

export default RegisterConclusion;