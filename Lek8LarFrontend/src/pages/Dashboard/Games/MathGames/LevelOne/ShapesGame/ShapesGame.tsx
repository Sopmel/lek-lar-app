import { observer } from "mobx-react-lite";
import { ShapesGamePresenter } from "./ShapesGamePresenter";
import { Card, GameButton, Flex, Text, Title } from "../../../../../../components/LekLarComponentLibrary";
import { PageLayout } from "../../../../../../components/PageLayout/PageLayout";
import { usePresenter } from "../../../../../../hooks/usePresenter";
import { useNavigate } from "react-router-dom";

export const ShapesGame = observer(() => {
    const presenter = usePresenter(ShapesGamePresenter);
    const navigate = useNavigate();
    const { question } = presenter;
    const vm = presenter.viewModel;
    if (!vm) return null;

    if (presenter.gameOver) {
        return (
            <PageLayout>
                <Card title={vm.cardTitle} headerBgColor="pink">
                    <Title level="2" title={vm.stars.fiveStarText} />
                    <Text text={vm.stars.starText} />
                    {vm.isPerfect && <Text text={vm.game.finnishedLevelText} />}
                    <Flex justify="center" style={{ marginTop: 24, gap: 16 }}>
                        <GameButton onClick={() => navigate("/dashboard")}>
                            {vm.backToDashboardSymbol}
                        </GameButton>
                        <GameButton onClick={() => presenter.startGame()}>
                            {vm.playAgainSymbol}
                        </GameButton>
                        <GameButton onClick={() => navigate("/math")}>{vm.nextGameSymbol}</GameButton>
                    </Flex>
                </Card>
            </PageLayout>
        );
    }

    if (!question) {
        return presenter.isLoading ? (
            <PageLayout>
                <Text text={vm.isLoadingMessage} />
            </PageLayout>
        ) : null;
    }


    return (
        <PageLayout>
            <Flex justify="center" align="center" style={{ padding: "32px 0" }}>
                <Card title={vm.game.gameTitle} headerBgColor="pink">
                    <Flex justify="center" align="center" style={{ marginBottom: 32, gap: 12 }}>
                        <div style={{ position: "relative", display: "inline-block" }}>
                            <img
                                src={`images/gameImages/shapes/${question.shapeImageUrl}`}
                                alt="Visad form"
                                width={120}
                            />
                            {vm.answerFeedback && (
                                <div style={{
                                    position: "absolute",
                                    top: -8,
                                    right: -8,
                                    fontSize: "1.75rem",
                                    backgroundColor: vm.answerFeedback.correct ? "#d4edda" : "#f8d7da",
                                    color: vm.answerFeedback.correct ? "#155724" : "#721c24",
                                    borderRadius: 8,
                                    padding: "2px 6px",
                                    fontWeight: "bold",
                                }}>
                                    {vm.answerFeedback.correct ? "✓" : "✗"}
                                </div>
                            )}
                        </div>
                    </Flex>


                    <Flex justify="center" gap={20} style={{ flexWrap: "wrap" }}>
                        {vm.options.map((opt) => (
                            <GameButton key={opt} onClick={() => presenter.submitAnswer(opt)}>
                                {opt}
                            </GameButton>
                        ))}
                    </Flex>
                    {vm.game.feedback && <Text text={vm.game.feedback} />}
                </Card>
            </Flex>
        </PageLayout>
    );
});
