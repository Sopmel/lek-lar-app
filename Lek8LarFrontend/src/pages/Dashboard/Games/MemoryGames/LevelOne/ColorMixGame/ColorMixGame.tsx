import React from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { usePresenter } from "../../../../../../hooks/usePresenter";
import { ColorMixGamePresenter } from "./ColorMixGamePresenter";
import {
    Card,
    Flex,
    GameButton,
    PageLayout,
    Text,
    Title,
} from "../../../../../../components/LekLarComponentLibrary";

function darkenColor(color: string, amount: number): string {
    try {
        const fakeEl = document.createElement("div");
        fakeEl.style.color = color;
        document.body.appendChild(fakeEl);
        const rgb = getComputedStyle(fakeEl).color.match(/\d+/g)?.map(Number);
        document.body.removeChild(fakeEl);

        if (!rgb || rgb.length < 3) return color;
        const [r, g, b] = rgb;
        return `rgb(${Math.max(0, r - r * amount)}, ${Math.max(0, g - g * amount)}, ${Math.max(0, b - b * amount)})`;
    } catch {
        return color;
    }
}

const paintBlobStyle = (color: string): React.CSSProperties => ({
    position: "relative",
    background: `radial-gradient(circle at 30% 30%, ${color}, ${darkenColor(color, 0.2)})`,
    width: 100,
    height: 80,
    borderRadius: "60% 40% 50% 70% / 60% 40% 70% 50%",
    boxShadow: `
        inset -4px -4px 6px rgba(255,255,255,0.4),
        inset 4px 4px 6px rgba(0,0,0,0.1),
        0 4px 10px rgba(0,0,0,0.2)
    `,
    border: "2px solid rgba(0, 0, 0, 0.1)",
    transform: "rotate(-2deg)",
    overflow: "hidden",
});

export const ColorMixGame = observer(() => {
    const presenter = usePresenter(ColorMixGamePresenter);
    const vm = presenter.viewModel;
    const navigate = useNavigate();

    if (vm.isLoading) {
        return <div style={{ padding: 40, textAlign: "center" }}>🎨 Laddar färgmix-spelet...</div>;
    }

    const renderPaintBlob = (color: string) => (
        <div style={paintBlobStyle(color)}>
            <div style={{
                position: "absolute",
                top: "15%",
                left: "20%",
                width: "30%",
                height: "20%",
                background: "rgba(255, 255, 255, 0.4)",
                borderRadius: "50%",
                transform: "rotate(-20deg)",
                filter: "blur(1px)",
            }} />
        </div>
    );

    if (vm.gameOver) {
        return (
            <PageLayout>
                <Card title="🎉 Färgmixaren är klar!" headerBgColor="#a0d8ef">
                    <Title level="2" title={vm.stars.fiveStarText} />
                    <Text text={vm.stars.starText} />
                    <Flex justify="center" style={{ marginTop: 24, gap: 16 }}>
                        <GameButton onClick={() => presenter.startGame()}>
                            {vm.symbols.playAgain}
                        </GameButton>
                        <GameButton onClick={() => navigate("/dashboard")}>
                            {vm.symbols.backToDashboard}
                        </GameButton>
                    </Flex>
                </Card>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <Card title="🖌️ Färgmixaren" headerBgColor="#fef6ff">
                <Text
                    text="Vilken färg får vi om vi blandar..."
                    style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
                />

                {/* Färgkombination */}
                <Flex justify="center" align="center" style={{ marginTop: 24, gap: 32 }}>
                    <Flex direction="column" align="center">
                        {renderPaintBlob(vm.color1)}
                        <span style={{ marginTop: 8, fontWeight: "bold", fontSize: 18, color: vm.color1 }}>
                            {vm.color1.charAt(0).toUpperCase() + vm.color1.slice(1)}
                        </span>
                    </Flex>
                    <span style={{ fontSize: 32, fontWeight: "bold" }}>+</span>
                    <Flex direction="column" align="center">
                        {renderPaintBlob(vm.color2)}
                        <span style={{ marginTop: 8, fontWeight: "bold", fontSize: 18, color: vm.color2 }}>
                            {vm.color2.charAt(0).toUpperCase() + vm.color2.slice(1)}
                        </span>
                    </Flex>
                </Flex>

                {/* Resultatvisning */}
                <div style={{ marginTop: 24, textAlign: "center" }}>
                    {vm.selectedAnswer && (
                        <>
                            <Text text="Du valde..." style={{ fontSize: 22, marginBottom: 12 }} />
                            <div style={{ display: "inline-block", position: "relative" }}>
                                {renderPaintBlob(vm.selectedAnswer)}
                                <span style={{
                                    position: "absolute",
                                    top: -10,
                                    right: -20,
                                    fontSize: 28,
                                    color: vm.feedback.includes("Rätt") ? "green" : "red"
                                }}>
                                    {vm.feedback.includes("Rätt") ? "✅" : "❌"}
                                </span>
                            </div>
                            <div style={{ marginTop: 8, fontWeight: "bold", fontSize: 18 }}>
                                {vm.selectedAnswer}
                            </div>
                        </>
                    )}
                </div>

                {/* Svarsalternativ */}
                {!vm.selectedAnswer && (
                    <Flex justify="center" wrap style={{ gap: 24, margin: "32px 0" }}>
                        {vm.options.map((color) => (
                            <Flex direction="column" align="center" key={color}>
                                <button
                                    onClick={() => presenter.submitAnswer(color)}
                                    style={{
                                        ...paintBlobStyle(color),
                                        cursor: "pointer",
                                        border: "2px solid white",
                                        transition: "transform 0.2s ease",
                                        position: "relative",
                                    }}
                                    title={color}
                                >
                                    <div style={{
                                        position: "absolute",
                                        top: "15%",
                                        left: "20%",
                                        width: "30%",
                                        height: "20%",
                                        background: "rgba(255, 255, 255, 0.4)",
                                        borderRadius: "50%",
                                        transform: "rotate(-20deg)",
                                        filter: "blur(1px)",
                                    }} />
                                </button>
                                <span style={{ marginTop: 8, fontWeight: "bold", color: "#444" }}>
                                    {color.charAt(0).toUpperCase() + color.slice(1)}
                                </span>
                            </Flex>
                        ))}
                    </Flex>
                )}
            </Card>
        </PageLayout>
    );
});
