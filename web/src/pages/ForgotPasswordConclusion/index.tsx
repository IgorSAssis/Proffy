import React from "react";

import { useHistory } from "react-router-dom";

import "./styles.css";
import { FiCheck } from "react-icons/fi"

function ForgotPasswordConclusion() {

    let history = useHistory();

    function returnToLandingPage() {
        history.push("/");
    }

    return (
        <div id="forgot-conclusion-page">
            <div className="forgot-conclusion-page-content">
                <div className="icon-container">
                    <i>
                        <FiCheck />
                    </i>
                </div>
                <hgroup>
                    <h1>Redefinição enviada!</h1>
                    <h4>Boa, agora é só checar o e-mail que foi enviado para você</h4>
                    <h4>redefinir sua senha e aproveitar os estudos.</h4>
                </hgroup>

                <button onClick={ returnToLandingPage }>Fazer login</button>
            </div>
        </div>
    )
}

export default ForgotPasswordConclusion;