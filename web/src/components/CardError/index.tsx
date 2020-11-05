import React from "react"
import { FiAlertOctagon } from "react-icons/fi";

import "./styles.css"

interface CardErrorProps {
    description: string;
}

const CardError: React.FC<CardErrorProps> = ({ description }) => {

    return (
        <div className="card-error">
            <div className="icon-container">
                <FiAlertOctagon size={24} color="#FFF" />
            </div>
            <p>{description}</p>
        </div>
    )
}

export default CardError;