import React from 'react';

interface ButtonProps {
    className: string;
    onClick: () => void;
    children: React.ReactNode;
    disabled: boolean | undefined;
};

const Button = ({onClick, disabled, children, className}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={className}>{children}
        </button>
    );
};

export default Button;