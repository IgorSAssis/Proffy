import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

import logoImg from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/icons/back.svg";

interface PageHeaderProps {
    title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => {
    return (

        <header className="page-header">
        <div className="top-bar-container">
            <Link to="/">
                <img alt="To back icon" src={ backIcon }></img>
            </Link>
            <img alt="Proffy logo" src={ logoImg }></img>
        </div>

         <div className="header-content">
            <strong>{ title }</strong>
            { children }
          </div>
        </header>

    );
}

export default PageHeader;