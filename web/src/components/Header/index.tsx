import React from "react";
import { Link } from "react-router-dom"
import arrowBack from "../../assets/images/icons/back.svg";
import logo from "../../assets/images/logo.svg";

import "./styles.css";

interface HeaderProps {
    pageToComeBack?: string;
}

const Header: React.FC<HeaderProps> = ({ pageToComeBack = "/home" }) => {
    return (
        <header>
            <Link to={pageToComeBack}>
                <img src={arrowBack} alt="Arrow back" />
            </Link>
            <span>Meu perfil</span>
            <img src={logo} alt="Logo" />
        </header>
    )
}

export default Header;