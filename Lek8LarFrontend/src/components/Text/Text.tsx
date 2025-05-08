import React from "react";

type Size = "1" | "2" | "3";

type Props = {
    size?: Size;
    text: string;
    style?: React.CSSProperties;
};

const sizeMap: Record<Size, string> = {
    1: "1.25rem",
    2: "1rem",
    3: "0.875rem",
};

export const Text: React.FC<Props> = ({ size = "1", text, style }) => {
    return (
        <p
            style={{
                fontSize: sizeMap[size],
                textAlign: "center",
                color: "#333",
                margin: "12px 0",
                ...style,
            }}
        >
            {text}
        </p>
    );
};
