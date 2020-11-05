import React from "react";
import { FiAlertOctagon } from "react-icons/fi";

import "./styles.css"

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="warn-message">
            <FiAlertOctagon size={20} color="#FFF" />
            <p>
                {message}
            </p>
        </div>
    )
}

export default ErrorMessage;
