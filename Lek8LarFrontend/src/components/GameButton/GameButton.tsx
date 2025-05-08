import React from "react";

type GameButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    style?: React.CSSProperties;
    disabled?: boolean;
    color?: "pink" | "blue" | "green";
};

const colorMap = {
    pink: "#ff69b4",
    blue: "#87cefa",
    green: "#90ee90",
};

export const GameButton: React.FC<GameButtonProps> = ({
    children,
    onClick,
    style,
    disabled = false,
    color = "pink",
}) => {
    const bgColor = colorMap[color] || colorMap.pink;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                padding: "18px 28px",
                fontSize: "1.6rem",
                borderRadius: "50px",
                backgroundColor: disabled ? "#ddd" : bgColor,
                color: "#fff",
                border: "none",
                fontWeight: "bold",
                cursor: disabled ? "not-allowed" : "pointer",
                transition: "transform 0.2s ease, background-color 0.2s ease",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
                transform: disabled ? "none" : "scale(1)",
                outline: "none",
                minWidth: 100,
                textAlign: "center",
                ...style,
            }}
            onMouseDown={(e) => {
                if (!disabled) e.currentTarget.style.transform = "scale(0.96)";
            }}
            onMouseUp={(e) => {
                if (!disabled) e.currentTarget.style.transform = "scale(1)";
            }}
            onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !disabled && onClick) {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            {children}
        </button>
    );
};
