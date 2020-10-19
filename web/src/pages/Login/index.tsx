import React, { useState, useEffect, MouseEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi"

import api from "../../services/api";

import "./styles.css";

import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import Logo from "../../components/Logo";

function Landing() {

    const [totalConnections, setTotalConnections] = useState(0);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordShown, setPasswordShown ] = useState(false);

    let history = useHistory();

    function toggleShowPassword(event: MouseEvent) {
        console.log(event)
    }

    function togglePasswordVisible() {
        setPasswordShown(!passwordShown);
    }

    useEffect(() => {
        api.get("connections").then(response => {
            const { total } = response.data;
            setTotalConnections(total);
        })
    }, []);

    function handleLogin(event: FormEvent) {
        event.preventDefault()

        api.post("login", {
            email,
            password
        }).then((resolve) => {
            history.push("/lading")
        }).catch((reject) => {
            alert("Falha ao efetuar o login!")
        })
    }

    return (

        <div id="page-container">
            <Logo />
            <div className="form-container">
                <form>
                    <fieldset>
                        <legend>Faça o login</legend>
                        <div className="input-group">
                            <input placeholder="E-mail"
                                    type="email"
                                    value={email}
                                    onChange = {event => setEmail(event.target.value)}
                            />
                            <div className="password-input-content">
                                <input
                                    type={passwordShown ? "text" : "password"}
                                    placeholder="Senha"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                                <image type="button" onClick={togglePasswordVisible}>
                                    {passwordShown ? <FiEyeOff /> : <FiEye />}
                                </image>
                            </div>
                        </div>
                        <div className="passwords-options-container">
                            <div className="checkbox-container">
                                <input type="checkbox" id="rememberMe" />
                                <label htmlFor="rememberMe">Lembrar-me</label>
                            </div>
                            <Link to="/reset-password">Esqueci minha senha</Link>
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