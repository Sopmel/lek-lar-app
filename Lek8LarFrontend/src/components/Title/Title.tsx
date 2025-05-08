import React from "react";

type Size = "1" | "2" | "3" | "4";

type Props = {
    level?: Size;
    title: string;
    style?: React.CSSProperties;
};

const sizeMap: Record<Size, string> = {
    1: "2rem",
    2: "1.5rem",
    3: "1.2rem",
    4: "1rem",
};

export const Title: React.FC<Props> = ({ level = "1", title, style }) => {
    return (
        <h2
            style={{
                fontSize: sizeMap[level],
                fontWeight: "bold",
                color: "#444",
                textAlign: "center",
                margin: 0,
                ...style,
            }}
        >
            {title}
        </h2>
    );
};