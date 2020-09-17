import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi"

import "./styles.css";

import Logo from "../../components/Logo";

function Register() {

    let history = useHistory();

    function handleFinishRegister(){
        history.push("/")
    }


    return (
        <div id="page-container">
            <div className="register-container">
                <div className="register-content">
                    <Link to="/" className="arrowLeft">
                        <FiArrowLeft />
                    </Link>
                    <form onSubmit={handleFinishRegister}>
                        <fieldset>
                            <legend>Cadastro</legend>
                            <h4>Preencha os dados abaixo<br />para começar</h4>
                            <div className="inputs">
                                <input placeholder="Nome" />
                                <input placeholder="Sobrenome" />
                                <input placeholder="E-mail" />
                                <input placeholder="Senha" />
                            </div>
                        </fieldset>
                        <button type="submit">Concluir cadastro</button>
                    </form>
                </div>
            </div>

            <Logo />
        </div>
    )
}

export default Register;