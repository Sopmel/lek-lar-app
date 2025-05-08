import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    variant?: "primary" | "secondary";
    style?: React.CSSProperties;
};

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = "primary",
    style,
}) => {
    const baseStyle: React.CSSProperties = {
        padding: "12px 24px",
        fontSize: "18px",
        borderRadius: "15px",
        fontWeight: "bold",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.2s ease-in-out",
    };

    const variantStyles: Record<string, React.CSSProperties> = {
        primary: {
            backgroundColor: "#ff69b4",
            color: "white",
        },
        secondary: {
            backgroundColor: "#ffe6f0",
            color: "#333",
            border: "1px solid #ffb6c1",
        },
    };

    return (
        <button onClick={onClick} style={{ ...baseStyle, ...variantStyles[variant], ...style }}>
            {children}
        </button>
    );
};
