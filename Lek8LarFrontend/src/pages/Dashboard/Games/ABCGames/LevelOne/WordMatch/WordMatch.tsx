import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { usePresenter } from "../../../../../../hooks/usePresenter";
import { WordMatchPresenter } from "./WordMatchPresenter";
import {
    Card,
    Flex,
    GameButton,
    Title,
    Text,
} from "../../../../../../components/LekLarComponentLibrary";
import { PageLayout } from "../../../../../../components/PageLayout/PageLayout";

export const WordMatch = observer(() => {
    const presenter = usePresenter(WordMatchPresenter);
    const vm = presenter.viewModel;
    const navigate = useNavigate();

    if (presenter.gameOver) {
        return (
            <PageLayout>
                <Card title={vm.game.finishedText} headerBgColor="#d4edda">
                    <Title level="2" title={vm.stars.fiveStarText} />
                    <Text text={vm.stars.starText} />
                    {vm.isPerfect && <Text text={vm.game.finishedText} />}
                    <Flex justify="center" style={{ marginTop: 24, gap: 16 }}>
                        <GameButton onClick={() => navigate("/dashboard")}>{vm.backToDashboardSymbol}</GameButton>
                        <GameButton onClick={() => presenter.startGame()}>{vm.playAgainSymbol}</GameButton>
                        <GameButton onClick={() => navigate("/abc")}>{vm.nextGameSymbol}</GameButton>
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
            <Card title={vm.game.gameTitle} headerBgColor="#fff3cd">

                <Flex direction="column" align="center" style={{ marginBottom: 24 }}>
                    <Flex align="center" gap={12}>
                        <img
                            src={vm.mainImage}
                            alt="Huvudbild"
                            width={120}
                            style={{ borderRadius: 12 }}
                        />
                        <div style={{ fontSize: "2.5rem" }}>
                            {vm.showAnswerFeedback
                                ? vm.isCorrectAnswer
                                    ? "✅"
                                    : "❌"
                                : "❓"}
                        </div>
                    </Flex>

                    <Flex justify="center" gap={20} style={{ flexWrap: "wrap", marginTop: 24 }}>
                        {vm.optionImages.map((img) => (
                            <div
                                key={img.key}
                                onClick={() => presenter.submitAnswer(img.src.split("/").pop()!)}
                                style={{
                                    width: 100,
                                    height: 100,
                                    border: vm.showAnswerFeedback && img.src.includes(vm.selectedImage ?? "")
                                        ? `3px solid ${vm.isCorrectAnswer ? "green" : "red"}`
                                        : "3px solid transparent",
                                    borderRadius: 12,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    backgroundColor: "#fff",
                                    boxShadow: "0 0 6px rgba(0,0,0,0.1)",
                                    transition: "border 0.3s ease",
                                }}
                            >
                                <img
                                    src={img.src}
                                    alt=""
                                    style={{
                                        maxWidth: "80%",
                                        maxHeight: "80%",
                                        objectFit: "contain",
                                    }}
                                />
                            </div>
                        ))}
                    </Flex>


                    {vm.game.feedback && <Text text={vm.game.feedback} />}
                </Flex>
            </Card>
        </PageLayout>
    );
});
