import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";

import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";

function Landing() {

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get("connections").then(response => {
            const { total } = response.data;
            setTotalConnections(total);
        })
    }, []);

    return (

        <div id="page-container">
            <div className="logo-container">
                <div className="logo-content">
                    <img alt="Proffy logo" src={logoImg} />
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
            </div>
            <div className="form-container">
                <form>
                    <fieldset>
                        <legend>Faça o login</legend>
                        <div className="input-group">
                            <input placeholder="E-mail"></input>
                            <input placeholder="Senha"></input>
                        </div>
                    </fieldset>
                    <div className="passwords-options-container">
                        <div className="checkbox-container">
                            <input type="checkbox" id="rememberMe" />
                            <label htmlFor="rememberMe">Lembrar-me</label>
                        </div>
                        <a href="#">Esqueci minha senha</a>
                    </div>
                    <button>Entrar</button>
                    <div className="register">
                        <span>Não tem conta? <br/>
                            <a href="#">Cadastre-se</a>
                        </span>
                        <span>
                            É de graça
                            <img alt="Heart" src={purpleHeartIcon} />
                        </span>

                    </div>
                </form>
            </div>
        </div >

    );
}

export default Landing;