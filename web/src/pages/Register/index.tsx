import React, { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";

import "./styles.css";

import Logo from "../../components/Logo/index";
import CardError from "../../components/CardError/index"

import api from "../../services/api";

type FormValues = {
    name: string;
    surname: string;
    email: string;
    password: string;
}

function Register() {

    const { register, handleSubmit, errors } = useForm<FormValues>({ mode: "onBlur" });

    const [passwordShown, setPasswordShown] = useState(false);

    let history = useHistory();

    function togglePasswordVisible() {
        setPasswordShown(!passwordShown);
    }

    function onSubmit(data: FormValues) {
        console.log(data)
        // api.post("signUp", data)
        // .then(resolve => {
        //     history.push("/login");
        // }).catch(reject => {
        //     console.log(reject)
        //     alert("Erro ao efetuar o cadastro!")
        // })
    }

    return (
        <div id="page-container">
            <div className="register-container">
                <div className="register-content">
                    <Link to="/login" className="arrowLeft">
                        <FiArrowLeft />
                    </Link>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>
                            <legend>Cadastro</legend>
                            <h4>Preencha os dados abaixo<br />para começar</h4>
                            <div className="inputs">

                                <div className="input-wrapper">
                                    <input
                                        name="name"
                                        placeholder="Nome"
                                        type="text"
                                        ref={register({ required: true, minLength: 3 })}
                                    />
                                    {errors.name && errors.name.type === "required" && (
                                        <CardError description="Campo obrigatório!" />
                                    )}
                                    {errors.name && errors.name.type === "minLength" && (
                                        <CardError description="Este campo deve conter no mínimo 3 letras." />
                                    )}
                                </div>


                                <div className="input-wrapper">
                                    <input
                                        name="surname"
                                        placeholder="Sobrenome"
                                        type="text"
                                        ref={register({ required: true, minLength: 3 })}
                                    />
                                    {errors.surname && errors.surname.type === "required" && (
                                        <CardError description="Campo obrigatório!" />
                                    )}
                                    {errors.surname && errors.surname.type === "minLength" && (
                                        <CardError description="Este campo deve conter no mínimo 3 letras." />
                                    )}

                                </div>

                                <div className="input-wrapper">
                                    <input
                                        name="email"
                                        placeholder="E-mail"
                                        type="text"
                                        ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
                                    />
                                    {errors.email && errors.email.type === "required" && (
                                        <CardError description="Campo obrigatório!" />
                                    )}
                                    {errors.email && errors.email.type === "pattern" && (
                                        <CardError description="Por-favor, insira um email válido." />
                                    )}
                                </div>

                                <div className="input-wrapper">
                                    <div className="password-input-content">
                                        <input
                                            name="password"
                                            type={passwordShown ? "text" : "password"}
                                            placeholder="Senha"
                                            ref={register({ required: true, minLength: 6 })}
                                        />
                                        <button type="button" onClick={togglePasswordVisible}>
                                            {passwordShown ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </div>
                                    {errors.password && errors.password.type === "required" && (
                                        <CardError description="Campo obrigatório!" />
                                    )}
                                    {errors.password && errors.password.type === "minLength" && (
                                        <CardError description="A senha deve conter no mínimo 6 letras ou dígitos." />
                                    )}
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