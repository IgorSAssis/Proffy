import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";

import "./styles.css";

import Logo from "../../components/Logo";

import api from "../../services/api";

function Register() {

    const [ name, setName ] = useState("")
    const [ surname, setSurname ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("");

    const [ passwordShown, setPasswordShown ] = useState(false);


    let history = useHistory();

    function handleFinishRegister() {
    }

    function togglePasswordVisible() {
        setPasswordShown(!passwordShown);
    }

    function handleRegisterUser() {

        api.post("register", {
            name,
            surname,
            email,
            password
        }).then(resolve => {
            localStorage.setItem("token", resolve.data.token)
            history.push("/");
        }).catch(reject => {
            console.log(reject)
            alert("Erro ao efetuar o cadastro!")
        })
    }


    return (
        <div id="page-container">
            <div className="register-container">
                <div className="register-content">
                    <Link to="/login" className="arrowLeft">
                        <FiArrowLeft />
                    </Link>
                    <form onSubmit={handleRegisterUser}>
                        <fieldset>
                            <legend>Cadastro</legend>
                            <h4>Preencha os dados abaixo<br />para começar</h4>
                            <div className="inputs">
                                <input placeholder="Nome"
                                       type="text" 
                                       value={name} 
                                       onChange={event => setName(event.target.value)} 
                                       required
                                       />
                                <input placeholder="Sobrenome" 
                                       type="text" 
                                       value={surname}
                                       onChange={event => setSurname(event.target.value)}
                                       required 
                                       />
                                <input  placeholder="E-mail"
                                        type="email" 
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                        required 
                                        />
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