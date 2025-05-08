import { Flex } from "../LekLarComponentLibrary"; // justera sökväg vid behov
import React from "react";

type GameRowProps = {
    title: string;
    backgroundColor: string;
    children: React.ReactNode;
};

export const GameRow: React.FC<GameRowProps> = ({ title, backgroundColor, children }) => {
    return (
        <>
            <div
                style={{
                    backgroundColor,
                    color: "#222",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: "12px 0",
                    borderRadius: "12px",
                    margin: "32px 0 16px",
                }}
            >
                {title}
            </div>
            <Flex gap={20} wrap={false} justify="center">
                {children}
            </Flex>
        </>
    );
};
