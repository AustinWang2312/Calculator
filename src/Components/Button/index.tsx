import React from 'react';
import './Button.css'

interface ButtonProps {
    label: string;
    onClick: (value: string) => void;
    className?: string;
    style?: React.CSSProperties;
}


//Basic button component
const Button: React.FC<ButtonProps> = ({ label, onClick, className, style }) => {
    return (
        <button
            className={`button ${className ? className : ''}`}
            onClick={() => onClick(label)}
            style={style}
        >
            {label}
        </button>
    );
}

export default Button;