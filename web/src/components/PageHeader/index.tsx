import React from "react";

import "./styles.css";

import rocket from "../../assets/images/icons/rocket.svg"
import smile from "../../assets/images/icons/smile.svg"

interface PageHeaderProps {
    title: string;
    description?: string;
    icon?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, icon, children }) => {

    return (

        <header className="page-header">
            <div className="header-content">
                <strong>{title}</strong>
                {description && <p>{description}</p>}
                {children}
                {icon === "rocket" ?(
                    <div className="page-header-icon-content">
                        <img src={rocket} alt="icon" />
                        <span>Prepare-se!<br/>vai ser o máximo.</span>
                    </div>
                ) : (
                    <div className="page-header-icon-content">
                        <img src={smile} alt="icon" />
                        <span>Nós temos 32<br/>professores.</span>
                    </div>
                )}
            </div>
        </header>

    );
}

export default PageHeader;