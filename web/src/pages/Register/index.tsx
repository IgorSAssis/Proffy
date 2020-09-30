import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";

import "./styles.css";

import Logo from "../../components/Logo";

function Register() {

    const [ password, setPassword ] = useState("");
    const [ passwordShown, setPasswordShown ] = useState(false);


    let history = useHistory();

    function handleFinishRegister() {
        history.push("/register-conclusion")
    }

    function togglePasswordVisible() {
        setPasswordShown(!passwordShown);
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
                                <input placeholder="Nome" type="text" required/>
                                <input placeholder="Sobrenome" type="text" required />
                                <input placeholder="E-mail" type="email" required />
                                <div className="password-input-content">
                                    <input 
                                        type={passwordShown ? "text" : "password"}
                                        placeholder="Senha"
                                        value={ password }
                                        onChange={event => setPassword(event.target.value)}
                                        required
                                        />
                                    <button type="button" onClick={togglePasswordVisible}>
                                        { passwordShown ? <FiEyeOff /> : <FiEye /> }
                                    </button>
                                </div>
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