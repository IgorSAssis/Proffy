import React from "react";
import { Link } from "react-router-dom"
import arrowBack from "../../assets/images/icons/back.svg";
import logo from "../../assets/images/logo.svg";

import "./styles.css";

interface HeaderBarProps {
    currentPage: string;
    pageToComeBack?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ currentPage, pageToComeBack = "/home" }) => {
    return (
        <header>
            <Link to={pageToComeBack}>
                <img src={arrowBack} alt="Arrow back" />
            </Link>
            <span>{currentPage}</span>
            <img src={logo} alt="Logo" />
        </header>
    )
}

export default HeaderBar;