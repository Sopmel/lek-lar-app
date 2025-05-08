import { observer } from "mobx-react-lite";
import { CountGamePresenter } from "./CountGamePresenter";
import { Card, Flex, GameButton, Title, Text } from "../../../../../../components/LekLarComponentLibrary";
import { PageLayout } from "../../../../../../components/PageLayout/PageLayout";

const presenter = new CountGamePresenter();

export const CountGame = observer(() => {
    const vm = presenter.viewModel;

    if (presenter.gameOver && vm) {
        return (
            <PageLayout>
                <Card
                    title="🎉 Spelet är klart!"
                    headerBgColor="pink"
                >
                    <Title level={"2"} title={vm.fiveStarText} />

                    <Text text={vm.starText} />

                    {vm.isPerfect && (
                        <Text text={vm.finnishedLevelText} />
                    )}
                </Card>
            </PageLayout>
        );
    }

    if (!vm) {
        return (
            <PageLayout>
                <Text text="Laddar fråga..." />
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <Card
                title={vm.gameTitle}
                headerBgColor="pink"
            >
                <Flex
                    style={{ flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 24 }}
                >
                    {vm.imageElements.map((img) => (
                        <img
                            key={img.key}
                            src={img.src}
                            alt={img.alt}
                            width={70}
                            style={{ borderRadius: 12 }}
                        />
                    ))}
                </Flex>
                <Flex justify="center" gap={20} style={{ flexWrap: "wrap" }}>
                    {vm.options.map((opt) => (
                        <GameButton onClick={() => presenter.submitAnswer(opt)} key={opt}
                        >
                            {opt}
                        </GameButton>
                    ))}
                </Flex>
                {vm.feedback && (
                    <Text text={vm.feedback} />
                )}
            </Card>
        </PageLayout>
    );
});
