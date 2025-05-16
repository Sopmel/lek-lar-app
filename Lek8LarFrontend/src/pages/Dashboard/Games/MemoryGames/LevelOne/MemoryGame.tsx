import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { usePresenter } from "../../../../../hooks/usePresenter";
import { Text, Title, PageLayout, Card, GameButton, Flex } from "../../../../../components/LekLarComponentLibrary";
import { MemoryGamePresenter } from "./MemoryGamePresenter";
import styles from "./MemoryGame.module.css";

export const MemoryGame = observer(() => {
    const presenter = usePresenter(MemoryGamePresenter);
    const vm = presenter.viewModel;
    const navigate = useNavigate();

    if (vm.isLoading) {
        return (
            <PageLayout>
                <Card title="⏳ Laddar">
                    <Text text={vm.loadingMessage} />
                </Card>
            </PageLayout>
        );
    }

    if (vm.isGameOver) {
        return (
            <PageLayout>
                <Card title={vm.game.finishedText} headerBgColor="#d4edda">
                    <Title level="2" title={vm.stars.fiveStarText} />
                    <Text text={vm.stars.starText} />
                    {vm.isPerfect && <Text text={vm.game.finishedText} />}

                    <Flex justify="center" style={{ marginTop: 24, gap: 16 }}>
                        <GameButton onClick={() => navigate("/dashboard")}>
                            {vm.symbols.backToDashboard}
                        </GameButton>
                        <GameButton onClick={() => presenter.loadGame()}>
                            {vm.symbols.playAgain}
                        </GameButton>
                        <GameButton onClick={() => navigate("/abc")}>
                            {vm.symbols.nextGame}
                        </GameButton>
                    </Flex>
                </Card>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <Card title={vm.game.gameTitle} headerBgColor="#e0f7ff">
                <div className={styles.grid}>
                    {vm.cards.map((card) => (
                        <div
                            key={card.id}
                            className={`${styles.card} ${card.isFlipped || card.isMatched ? styles.flipped : ""}`}
                            onClick={() => presenter.flipCard(card)}
                        >
                            <div className={styles.cardInner}>
                                <div className={styles.cardFront}>?</div>
                                <div className={styles.cardBack}>
                                    <img src={`images/gameImages/${card.image}`} alt="memory-kort" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {vm.isAnswerFeedbackVisible && (
                    <div style={{ textAlign: "center", marginTop: 24 }}>
                        <p style={{ fontSize: "1.2rem" }}>
                            {vm.isAnswerCorrect ? vm.game.correctText : vm.game.incorrectText}
                        </p>
                    </div>
                )}
            </Card>
        </PageLayout>
    );
});
