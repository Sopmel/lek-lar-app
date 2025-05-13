import { observer } from "mobx-react-lite";
import { PlusGamePresenter } from "./PlusGamePresenter";
import { usePresenter } from "../../../../../../hooks/usePresenter";
import { Card, Flex, GameButton, Title, Text } from "../../../../../../components/LekLarComponentLibrary";
import { PageLayout } from "../../../../../../components/PageLayout/PageLayout";
import { useNavigate } from "react-router-dom";

export const PlusGame = observer(() => {
    const presenter = usePresenter(PlusGamePresenter);
    const vm = presenter.viewModel;
    const navigate = useNavigate();

    if (presenter.gameOver) {
        return (
            <PageLayout>
                <Card title={vm.cardTitle} headerBgColor="pink">
                    <Title level="2" title={vm.stars.fiveStarText} />
                    <Text text={vm.stars.starText} />
                    {vm.isPerfect && <Text text={vm.game.finnishedLevelText} />}
                    <Flex justify="center" style={{ marginTop: 24, gap: 16 }}>
                        <GameButton onClick={() => navigate("/dashboard")}>{vm.backToDashboardSymbol}</GameButton>
                        <GameButton onClick={() => presenter.startGame()}>{vm.playAgainSymbol}</GameButton>
                        <GameButton onClick={() => navigate("/math")}>{vm.nextGameSymbol}</GameButton>
                    </Flex>
                </Card>
            </PageLayout>
        );
    }

    if (vm.isLoading) {
        return (
            <PageLayout>
                <Text text={vm.isLoadingMessage} />
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <Card title={vm.game.gameTitle} headerBgColor="pink">
                <Flex justify="center" align="center" style={{ flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
                    {vm.groupAImages.map(img => (
                        <img key={img.key} src={`images/gameImages/${img.src}`} alt={img.alt} width={70} />
                    ))}
                    <span style={{ fontSize: "2rem" }}>➕</span>
                    {vm.groupBImages.map(img => (
                        <img key={img.key} src={`images/gameImages/${img.src}`} alt={img.alt} width={70} />
                    ))}
                    <Flex align="center" style={{ minHeight: 40, gap: 8 }}>
                        <Text text="=" style={{ fontSize: "2rem", margin: 0 }} />
                        <Text
                            text={vm.showAnswerFeedback ? `${vm.game.rightAnswer}` : ""}
                            style={{
                                fontSize: "2.5rem",
                                fontWeight: "bold",
                                minWidth: 24,
                                margin: 0,
                            }}
                        />
                        <Text
                            text={vm.showAnswerFeedback ? (vm.isCorrectAnswer ? "✅" : "❌") : ""}
                            style={{
                                fontSize: "2rem",
                                minWidth: 30,
                                margin: 0,
                            }}
                        />
                    </Flex>


                </Flex>

                <Flex justify="center" gap={20} style={{ flexWrap: "wrap" }}>
                    {vm.options.map(opt => (
                        <GameButton key={opt} onClick={() => presenter.submitAnswer(opt)}>
                            {opt}
                        </GameButton>
                    ))}
                </Flex>

                {vm.game.feedback && <Text text={vm.game.feedback} />}
            </Card>
        </PageLayout>
    );
});
