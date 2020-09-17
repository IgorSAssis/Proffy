import React from "react";

import "./styles.css";
import logoImg from "../../assets/images/logo.svg";

function Logo() {
    return (
        <div className="logo-container">
            <div className="logo-content">
                <img alt="Proffy logo" src={logoImg} />
                <h2>Sua plataforma de estudos online.</h2>
            </div>
        </div>
    )
}

export default Logo;