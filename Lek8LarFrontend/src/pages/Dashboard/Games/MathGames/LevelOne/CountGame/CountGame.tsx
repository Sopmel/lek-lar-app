import { observer } from "mobx-react-lite";
import { CountGamePresenter } from "./CountGamePresenter";
import { usePresenter } from "../../../../../../hooks/usePresenter";
import { Card, Flex, GameButton, Title, Text } from "../../../../../../components/LekLarComponentLibrary";
import { PageLayout } from "../../../../../../components/PageLayout/PageLayout";
import { useNavigate } from "react-router-dom";

export const CountGame = observer(() => {
    const presenter = usePresenter(CountGamePresenter);
    const navigate = useNavigate();
    const { question } = presenter;
    const vm = presenter.viewModel;

    if (presenter.gameOver && vm) {
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
            <Card title={vm.game.gameTitle} headerBgColor="pink">
                <Flex style={{ flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 24 }}>
                    {vm.imageElements.map((img) => (
                        <img key={img.key} src={img.src} alt={img.alt} width={70} style={{ borderRadius: 12 }} />
                    ))}
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
        </PageLayout>
    );
});
