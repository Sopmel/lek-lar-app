import React from "react";
import { Flex } from "../../components/LekLarComponentLibrary";

interface DashboardHeaderProps {
    playerName: string;
    totalStars: number;
    level: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ playerName, totalStars, level }) => {
    return (
        <Flex
            direction="column"
            style={{
                padding: "24px 28px",
                background: "#ffe0f0",
                borderRadius: "16px",
                marginBottom: 16,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
            }}
        >
            <Flex justify="space-between" align="center" style={{ width: "100%" }}>
                <h2 style={{ margin: 0, color: "#ff3399", fontSize: "2rem" }}>
                    🎉 Hej <span style={{ textTransform: "capitalize" }}>{playerName}</span>!
                </h2>

                <div
                    style={{
                        backgroundColor: "#fff3cd",
                        color: "#ff9900",
                        fontSize: "1.8rem",
                        padding: "10px 22px",
                        borderRadius: "50px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <div>
                        ☀️ Nivå {level}
                    </div>
                </div>
            </Flex>

            <p style={{ marginTop: 12, marginBottom: 8, fontSize: "1rem", color: "#666" }}>
                {level < 5
                    ? `Samla stjärnor för att låsa upp nivå ${level + 1}`
                    : "Maxnivå uppnådd 🎉"}
            </p>


            <div style={{ width: "100%", height: "20px", backgroundColor: "#eee", borderRadius: "10px" }}>
                <div
                    style={{
                        width: `${(totalStars / 35) * 100}%`,
                        height: "100%",
                        background: "linear-gradient(to right, #ff99cc, #66ccff)",
                        borderRadius: "10px",
                        transition: "width 0.3s ease",
                    }}
                />
            </div>

            <p style={{ alignSelf: "flex-end", fontSize: "0.9rem", color: "#444", marginTop: 6 }}>
                {totalStars}/35 stjärnor
            </p>
        </Flex>
    );
};
