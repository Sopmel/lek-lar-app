import React from "react";

type GridProps = {
    children: React.ReactNode;
    columns?: number;
    gap?: number;
    style?: React.CSSProperties;
};

export const Grid: React.FC<GridProps> = ({ children, columns = 3, gap = 16, style }) => (
    <div
        style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap,
            ...style,
        }}
    >
        {children}
    </div>
);
