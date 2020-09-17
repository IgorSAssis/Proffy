import React, { useState, useEffect, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi"

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/images/logo.svg";

import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import Logo from "../../components/Logo";

function Landing() {

    const [totalConnections, setTotalConnections] = useState(0);

    function toggleShowPassword(event: MouseEvent) {
        console.log(event)
    }

    useEffect(() => {
        api.get("connections").then(response => {
            const { total } = response.data;
            setTotalConnections(total);
        })
    }, []);

    return (

        <div id="page-container">
            <Logo />
            <div className="form-container">
                <form>
                    <fieldset>
                        <legend>Faça o login</legend>
                        <div className="input-group">
                            <input placeholder="E-mail" />
                            <div className="password-input-content">
                                <input placeholder="Senha" />
                                <image onClick={toggleShowPassword}><FiEye /></image>
                            </div>
                        </div>
                        <div className="passwords-options-container">
                            <div className="checkbox-container">
                                <input type="checkbox" id="rememberMe" />
                                <label htmlFor="rememberMe">Lembrar-me</label>
                            </div>
                            <a href="#">Esqueci minha senha</a>
                        </div>
                        <button>Entrar</button>
                        <div className="register">
                            <span>Não tem conta? <br />
                                <Link to="/register" >Cadastre-se</Link>
                            </span>
                            <span>
                                É de graça
                            <img alt="Heart" src={purpleHeartIcon} />
                            </span>

                        </div>
                    </fieldset>
                </form>
            </div>
        </div >

    );
}

export default Landing;