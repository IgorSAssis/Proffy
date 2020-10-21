import React from "react";
import { Link, useHistory } from "react-router-dom"

import "./styles.css"
import { FiArrowLeft } from "react-icons/fi"

import Logo from "../../components/Logo/index";

function ForgotPassword() {

    let history = useHistory();

    function openForgotPasswordConclusion() {
        history.push("/password/reset/conclusion");
    }

    return (
        <div id="forgot-password-page" className="page-container">

            <div className="page-content">
                <div className="forgot-password-content">
                    <Link to="/login" className="arrowLeft">
                        <FiArrowLeft />
                    </Link>

                    <hgroup>
                        <h1>Eita, esqueceu <br />sua senha?</h1>
                        <h4>Não esquenta, vamos dar um jeito nisso.</h4>
                    </hgroup>
                    <form onSubmit={openForgotPasswordConclusion}>
                        <input type="email" placeholder="E-mail" required></input>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
            <Logo />
        </div>
    )
}

export default ForgotPassword;