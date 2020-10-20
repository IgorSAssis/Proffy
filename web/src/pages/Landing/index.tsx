import React from "react"
import { Link } from "react-router-dom";
import { FiPower } from "react-icons/fi"

import "./styles.css"
import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";
import purpleHeart from "../../assets/images/icons/purple-heart.svg";
import giveClasses from "../../assets/images/icons/give-classes.svg";
import study from "../../assets/images/icons/study.svg";


function Landing() {
    return (
        <div id="home-page-container">

            <div className="home-page-upper-content">

                <div className="upper-container">
                    <div className="user-container">
                        <div className="user-content">
                            <Link className="user-icon" to="/teacher-profile"></Link>
                            <h4>Nome do usuário</h4>
                        </div>
                        <div className="logoff-container">
                            <button>
                                <FiPower />
                            </button>
                        </div>
                    </div>

                    <div className="logo-proffy-container">
                        <div className="logo-proffy-content">
                            <img src={logoImg} alt="Proffy logo"></img>
                            <h2>Sua plataforma de <br />estudos online</h2>
                        </div>
                        <img src={landingImg} alt="Hero"></img>

                    </div>

                </div>
            </div>
            <div className="home-page-lesser-content">
                <div className="lesser-container">

                    <h4>Seja bem-vindo!<br /><strong>O que deseja fazer?</strong></h4>
                    <div className="total-connections-container">
                        <p>Total de 0 conexões <br />já realizadas <img src={purpleHeart} alt="heart icon"></img></p>
                    </div>

                    <div className="button-group-container">
                        <Link to="">
                            <img src={study} alt="Study" />
                            Estudar
                        </Link>

                        <Link to="">
                            <img src={giveClasses} alt="Give classes" />
                            Dar aulas
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Landing;