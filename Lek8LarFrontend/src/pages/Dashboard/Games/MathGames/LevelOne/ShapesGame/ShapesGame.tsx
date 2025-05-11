import { observer } from "mobx-react-lite";
import { ShapesGamePresenter } from "./ShapesGamePresenter";
import { Card, GameButton, Flex, Text, Title } from "../../../../../../components/LekLarComponentLibrary";
import { PageLayout } from "../../../../../../components/PageLayout/PageLayout";
import { usePresenter } from "../../../../../../hooks/usePresenter";

export const ShapesGame = observer(() => {
    const presenter = usePresenter(ShapesGamePresenter);
    const { question } = presenter;
    const vm = presenter.viewModel;
    if (!vm) return null;

    if (presenter.gameOver) {
        return (
            <PageLayout>
                <Card title="🎉 Spelet är klart!" headerBgColor="pink">
                    <Title level="2" title={vm.fiveStarText} />
                    <Text text={vm.starText} />
                    {vm.isPerfect && <Text text={vm.finnishedLevelText} />}
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
                <Card title={vm.gameTitle} headerBgColor="pink">
                    <Flex justify="center" style={{ marginBottom: 32 }}>
                        <img
                            src={`images/gameImages/shapes/${question.shapeImageUrl}`}
                            alt="Visad form"
                            width={120}
                        />
                    </Flex>

                    <Flex justify="center" gap={20} style={{ flexWrap: "wrap" }}>
                        {vm.options.map((opt) => (
                            <GameButton key={opt} onClick={() => presenter.submitAnswer(opt)}>
                                {opt}
                            </GameButton>
                        ))}
                    </Flex>
                    {vm.feedback && <Text text={vm.feedback} />}
                </Card>
            </Flex>
        </PageLayout>
    );
});
