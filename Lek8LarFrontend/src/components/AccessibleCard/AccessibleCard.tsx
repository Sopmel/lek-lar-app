import React, { useState } from "react";

type AccessibleCardProps = {
    title?: string;
    description?: string;
    onClick?: () => void;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    hoverable?: boolean;
};

export const AccessibleCard: React.FC<AccessibleCardProps> = ({
    title,
    description,
    onClick,
    children,
    style,
    hoverable = false,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const isClickable = typeof onClick === "function";

    return (
        <article
            role={isClickable ? "button" : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onClick={onClick}
            onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && isClickable) {
                    e.preventDefault();
                    onClick();
                }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                border: "2px solid #ccc",
                borderRadius: 16,
                padding: 24,
                backgroundColor: "#fff",
                cursor: isClickable ? "pointer" : "default",
                boxShadow: hoverable && isHovered
                    ? "0 6px 24px rgba(0, 0, 0, 0.15)"
                    : "0 4px 8px rgba(0, 0, 0, 0.1)",
                transform: hoverable && isHovered ? "scale(1.02)" : "scale(1)",
                transition: "all 0.2s ease-in-out",
                outline: "none",
                ...style,
            }}
        >
            {title && (
                <div
                    style={{
                        backgroundColor: "#ffe6f0",
                        padding: "8px 12px",
                        margin: "-24px -24px 16px",
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                    }}
                >
                    <h3
                        style={{
                            margin: 0,
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            color: "#222",
                        }}
                    >
                        {title}
                    </h3>
                </div>
            )}

            {description && (
                <p style={{ marginBottom: 16, textAlign: "center", fontSize: "1rem" }}>
                    {description}
                </p>
            )}

            {children && (
                <div style={{ marginTop: 8 }}>
                    {children}
                </div>
            )}
        </article>
    );
};
