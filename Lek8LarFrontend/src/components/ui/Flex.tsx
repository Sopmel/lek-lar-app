import React from "react";

type FlexProps = {
    justify?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around";
    align?: "center" | "flex-start" | "flex-end" | "stretch";
    gap?: number;
    direction?: "row" | "column";
    wrap?: boolean;
    style?: React.CSSProperties;
    children: React.ReactNode;
};

export const Flex: React.FC<FlexProps> = ({
    justify = "flex-start",
    align = "stretch",
    gap = 0,
    direction = "row",
    wrap = false,
    style,
    children
}) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: justify,
                alignItems: align,
                flexDirection: direction,
                flexWrap: wrap ? "wrap" : "nowrap",
                gap,
                ...style,
            }}
        >
            {children}
        </div>
    );
};
