import React from "react";

type BoxProps = {
    children: React.ReactNode;
    padding?: number | string;
    margin?: number | string;
    background?: string;
    style?: React.CSSProperties;
};

export const Box: React.FC<BoxProps> = ({ children, padding, margin, background, style }) => (
    <div
        style={{
            padding,
            margin,
            backgroundColor: background,
            ...style,
        }}
    >
        {children}
    </div>
);
