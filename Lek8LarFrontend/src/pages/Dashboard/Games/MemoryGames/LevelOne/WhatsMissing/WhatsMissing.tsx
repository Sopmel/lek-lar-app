import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { usePresenter } from "../../../../../../hooks/usePresenter";
import { WhatsMissingPresenter } from "./WhatsMissingPresenter";
import { Card, Flex, GameButton, PageLayout, Text, Title } from "../../../../../../components/LekLarComponentLibrary";
import useSound from "use-sound";

export const WhatsMissing = observer(() => {
    const presenter = usePresenter(WhatsMissingPresenter);
    const vm = presenter.viewModel;
    const navigate = useNavigate();

    const [playSound] = useSound("/sounds/disappear.mp3", { volume: 0.5 });

    useEffect(() => {
        if (!vm.isLoading && !vm.gameOver && vm.showingFullSet) {
            playSound();
            setTimeout(() => {
                presenter.hideFullSet();
            }, 2000);
        }
    }, [vm.isLoading]);

    if (vm.isLoading) {
        return (
            <PageLayout>
                <Text text="🔄 Laddar nästa fråga..." />
            </PageLayout>
        );
    }

    if (vm.gameOver) {
        return (
            <PageLayout>
                <Card title="🎉 Bra jobbat!" headerBgColor="#d4edda">
                    <Title level="2" title={vm.stars.fiveStarText} />
                    <Text text={vm.stars.starText} />
                    {vm.isPerfect && <Text text="🌟 Perfekt omgång!" />}
                    <Flex justify="center" style={{ marginTop: 24, gap: 16 }}>
                        <GameButton onClick={() => navigate("/dashboard")}>{vm.symbols.backToDashboard}</GameButton>
                        <GameButton onClick={() => presenter.startGame()}>{vm.symbols.playAgain}</GameButton>
                        <GameButton onClick={() => navigate("/abc")}>{vm.symbols.nextGame}</GameButton>
                    </Flex>
                </Card>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <Card title="🕵️ Vad försvann?" headerBgColor="#fff3cd">
                <Text text={vm.showingFullSet ? "👀 Titta noga – memorera bilderna..." : "Titta noga – vilken bild saknas?"} />

                <Flex wrap={true} justify="center" style={{ gap: 12, marginTop: 16 }}>
                    {vm.visibleImages.map((img, index) => (
                        <img
                            key={index}
                            src={`images/gameImages/${img}`}
                            alt="bild"
                            style={{ width: 80, height: 80, borderRadius: 12 }}
                        />
                    ))}
                </Flex>

                {!vm.showingFullSet && (
                    <>
                        {vm.feedback && (
                            <Text
                                text={vm.feedback}
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    color: vm.feedback.includes("✅") ? "#28a745" : "#dc3545",
                                    textAlign: "center",
                                    marginTop: 16,
                                }}
                            />
                        )}

                        <Flex justify="center" wrap={true} style={{ gap: 16, marginTop: 24 }}>
                            {vm.options.map((opt, i) => (
                                <GameButton key={i} onClick={() => presenter.submitAnswer(opt)}>
                                    <img
                                        src={`images/gameImages/${opt}`}
                                        alt="val"
                                        style={{ width: 60, height: 60 }}
                                    />
                                </GameButton>
                            ))}
                        </Flex>
                        <Flex justify="center" style={{ marginTop: 16 }}>
                            <GameButton onClick={() => presenter.showFullSetAgain()}>
                                👁️ Visa bilderna igen
                            </GameButton>
                        </Flex>
                    </>
                )}
            </Card>
        </PageLayout>
    );
});
