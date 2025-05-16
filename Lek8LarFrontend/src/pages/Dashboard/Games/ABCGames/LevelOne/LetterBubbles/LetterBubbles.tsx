import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { LetterBubblesPresenter } from "./LetterBubblesPresenter";
import { GameButton, Card, Flex, PageLayout, Text, Title } from "../../../../../../components/LekLarComponentLibrary";
import { usePresenter } from "../../../../../../hooks/usePresenter";
import styles from './LetterBubbles.module.css';
import { useNavigate } from "react-router-dom";

export const LetterBubbles = observer(() => {
    const presenter = usePresenter(LetterBubblesPresenter);
    const navigate = useNavigate();
    const vm = presenter.viewModel;

    useEffect(() => {
        presenter.load();
    }, []);

    if (vm.isLoading) {
        return (
            <PageLayout>
                <Card title="⏳ Laddar">
                    <p>{vm.texts.loadingMessage}</p>
                </Card>
            </PageLayout>
        );
    }

    if (vm.gameOver) {
        return (
            <PageLayout>
                <Card title={vm.texts.finishedText} headerBgColor="#d4edda">
                    <Title level="2" title={vm.stars.fiveStarText} />
                    <Text text={vm.stars.starText} />
                    {vm.isPerfect && <Text text={vm.texts.finishedText} />}

                    <Flex justify="center" style={{ marginTop: 24, gap: 16 }}>
                        <GameButton onClick={() => navigate("/dashboard")}>{vm.backToDashboardSymbol}</GameButton>
                        <GameButton onClick={() => presenter.load()}>{vm.texts.playAgain}</GameButton>
                        <GameButton onClick={() => navigate("/abc")}>{vm.nextGameSymbol}</GameButton>
                    </Flex>
                </Card>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <Card title={vm.texts.gameTitle} headerBgColor="pink">
                <div style={{ textAlign: "center", marginTop: 16 }}>
                    <span style={{ fontSize: "1.4rem", fontWeight: 600 }}>
                        {vm.texts.instruction}
                    </span>
                    <span style={{ fontSize: "2.2rem", marginLeft: 8 }}>
                        {vm.targetLetter}
                    </span>
                </div>

                <Flex
                    justify="center"
                    style={{ gap: 32, flexWrap: "wrap", marginTop: 32 }}
                >
                    {vm.options.map((option) => (
                        <button
                            key={option}
                            onClick={() => presenter.answer(option)}
                            disabled={vm.showAnswerFeedback}
                            className={styles.bubbleButton}
                            style={{ animationDelay: `${Math.random()}s` }}
                        >
                            {option}
                        </button>
                    ))}
                </Flex>

                {vm.showAnswerFeedback && (
                    <div style={{ textAlign: "center", marginTop: 24 }}>
                        <p style={{ fontSize: "1.2rem", marginBottom: 16 }}>
                            {vm.isAnswerCorrect ? vm.texts.correctText : vm.texts.incorrectText}
                        </p>
                    </div>
                )}

            </Card>
        </PageLayout>
    );
});
