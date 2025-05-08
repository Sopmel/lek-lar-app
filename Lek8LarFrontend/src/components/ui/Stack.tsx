import React from "react";

type StackProps = {
    children: React.ReactNode;
    gap?: number;
    align?: React.CSSProperties["alignItems"];
    style?: React.CSSProperties;
};

export const Stack: React.FC<StackProps> = ({ children, gap = 16, align = "stretch", style }) => (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            gap,
            alignItems: align,
            ...style,
        }}
    >
        {children}
    </div>
);
