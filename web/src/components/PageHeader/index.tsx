import React from "react";

import "./styles.css";

import rocket from "../../assets/images/icons/rocket.svg"
import smile from "../../assets/images/icons/smile.svg"

interface PageHeaderProps {
    title: string;
    description?: string;
    icon?: string;
    totalConnections?: number;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, icon, children, totalConnections = 0 }) => {

    return (

        <header className="page-header">
            <div className="header-content">
                <strong>{title}</strong>
                {icon === "rocket" ? (
                    <div className="page-header-icon-content">
                        <img src={rocket} alt="icon" />
                        <span>Prepare-se!<br />vai ser o máximo.</span>
                    </div>
                ) : (
                        <div className="page-header-icon-content">
                            <img src={smile} alt="icon" />
                            <span>Nós temos {totalConnections}<br />professores.</span>
                        </div>
                    )}
                {description && <p>{description}</p>}
                {children}

            </div>
        </header>

    );
}

export default PageHeader;