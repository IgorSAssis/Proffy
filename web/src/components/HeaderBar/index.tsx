import React from "react";
import { useHistory } from "react-router-dom"
import arrowBack from "../../assets/images/icons/back.svg";
import logo from "../../assets/images/logo.svg";

import "./styles.css";

interface HeaderBarProps {
    currentPage: string;
    pageToComeBack?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ currentPage, pageToComeBack = "/home" }) => {

    let history = useHistory();

    function handleGoBackToHomePage() {
        history.goBack();
    }

    return (
        <header className="page-navigation-header-container">
            <button onClick={handleGoBackToHomePage}>
                <img src={arrowBack} alt="Arrow back" />
            </button>
            <span>{currentPage}</span>
            <img src={logo} alt="Logo" />
        </header>
    )
}

export default HeaderBar;