// Bokstavsjakten.tsx
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { usePresenter } from "../../../../../../hooks/usePresenter";
import { LetterHuntPresenter } from "./LetterHuntPresenter";
import { PageLayout } from "../../../../../../components/PageLayout/PageLayout";
import {
    Card,
    Flex,
    GameButton,
    Title,
    Text,
} from "../../../../../../components/LekLarComponentLibrary";

export const LetterHunt = observer(() => {
    const presenter = usePresenter(LetterHuntPresenter);
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
            <Card title={vm.game.gameTitle} headerBgColor="#fce4ec">
                <Flex direction="column" align="center" style={{ marginBottom: 24 }}>
                    <img
                        src={vm.imageUrl}
                        alt="Bokstavsbild"
                        width={120}
                        style={{ borderRadius: 12 }}
                    />
                    <Flex style={{ fontSize: "2.5rem", fontWeight: "bold", marginTop: 12 }}>
                        {vm.showAnswerFeedback
                            ? `${vm.game.correctLetter}${vm.game.partialWord} ${vm.isCorrectAnswer ? "✅" : "❌"}`
                            : `_${vm.game.partialWord}`}
                    </Flex>
                </Flex>
                <Flex justify="center" gap={20} style={{ flexWrap: "wrap" }}>
                    {vm.options.map((opt) => (
                        <GameButton key={opt} onClick={() => presenter.submitAnswer(opt)}>
                            {opt.toUpperCase()}
                        </GameButton>
                    ))}
                </Flex>
                {vm.game.feedback && <Text text={vm.game.feedback} />}
            </Card>
        </PageLayout>
    );
});
