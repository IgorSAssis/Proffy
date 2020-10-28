import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiEye, FiEyeOff, FiAlertOctagon } from "react-icons/fi"
import { useForm } from "react-hook-form";

import api from "../../services/api";

import "./styles.css";

import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import Logo from "../../components/Logo";
import ErrorMessage from "../../components/ErrorMessage/index"

type LoginValues = {
    email: string;
    password: string;
}

function Landing() {

    const { register, handleSubmit, errors } = useForm<LoginValues>({ mode: "onBlur" });
    const [passwordShown, setPasswordShown] = useState(false);
    let history = useHistory();

    function togglePasswordVisible() {
        setPasswordShown(!passwordShown);
    }

    function onSubmit(data: LoginValues) {
        const { email, password } = data;
        const credentials = Buffer.from(`${email}:${password}`, "utf-8").toString("base64");

        api.get("login", {
            headers: {
                "Authorization": `Basic ${credentials}`
            }
        })
            .then((response) => {
                const { userId, token } = response.data;
                localStorage.setItem("token", token);
                history.push(`/home/${userId}`)
            }).catch((reject) => {
                console.log(reject)
                alert("Falha ao efetuar o login!")
            })
    }

    return (

        <div id="page-container">
            <Logo />
            <div className="form-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <legend>Faça o login</legend>
                        <div className="input-group">
                            <input
                                name="email"
                                placeholder="E-mail"
                                type="text"
                                ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
                            />
                            {errors.email && errors.email.type === "required" && (
                                <ErrorMessage message="Preencha esse campo!" />
                            )}
                            {errors.email && errors.email.type === "pattern" && (
                                <ErrorMessage message="E-mail inválido" />
                            )}
                            <div className="password-input-content">
                                <input
                                    name="password"
                                    type={passwordShown ? "text" : "password"}
                                    placeholder="Senha"
                                    ref={register({ required: true })}
                                />
                                <image type="button" onClick={togglePasswordVisible}>
                                    {passwordShown ? <FiEyeOff /> : <FiEye />}
                                </image>
                            </div>
                            {errors.password && (
                                <ErrorMessage message="Preencha esse campo!" />
                            )}
                        </div>
                        <div className="passwords-options-container">
                            <div className="checkbox-container">
                                <input type="checkbox" id="rememberMe" />
                                <label htmlFor="rememberMe">Lembrar-me</label>
                            </div>
                            <Link to="/password/reset">Esqueci minha senha</Link>
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