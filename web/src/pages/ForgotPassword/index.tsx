import React from "react";
import { Link, Redirect } from "react-router-dom"

import "./styles.css"
import { FiArrowLeft } from "react-icons/fi"

import Logo from "../../components/Logo/index";

function ForgotPassword() {
    return (
        <div id="forgot-password-page" className="page-container">

            <div className="page-content">
                <div className="forgot-password-content">
                    <Link to="/" className="arrowLeft">
                        <FiArrowLeft />
                    </Link>

                    <hgroup>
                        <h1>Eita, esqueceu <br />sua senha?</h1>
                        <h4>Não esquenta, vamos dar um jeito nisso.</h4>
                    </hgroup>
                    <form>
                        <input type="email" placeholder="E-mail" required></input>
                        <button>Enviar</button>
                    </form>
                </div>
            </div>
            <Logo />
        </div>
    )
}

export default ForgotPassword;