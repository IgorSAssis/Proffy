import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";

import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";


function Landing() {
    return (

        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img alt="Proffy logo" src={ logoImg } />
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
                <img 
                    alt="" 
                    src={ landingImg } 
                    className="hero-image" 
                    />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img alt="Study icon" src={ studyIcon } />
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes" >
                        <img alt="Give class icon" src={ giveClassesIcon } />
                        Dar aula
                    </Link>
                </div>
                <span className="total-connections" >
                    Total de : 0 conexões já realizadas.
                    <img alt="Purple heart icon" src={ purpleHeartIcon } ></img>
                </span>

            </div>
        </div>

    );
}

export default Landing;