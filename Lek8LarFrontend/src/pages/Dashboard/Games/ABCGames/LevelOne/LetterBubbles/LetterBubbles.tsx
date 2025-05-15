import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { LetterBubblesPresenter } from "./LetterBubblesPresenter";
import { GameButton, Card, Flex, PageLayout } from "../../../../../../components/LekLarComponentLibrary";
import { usePresenter } from "../../../../../../hooks/usePresenter";
import styles from './LetterBubbles.module.css'


export const LetterBubbles = observer(() => {
    const presenter = usePresenter(LetterBubblesPresenter);
    const vm = presenter;

    useEffect(() => {
        const init = async () => {
            await presenter.load();
            presenter.next();
        };
        init();
    }, []);

    if (vm.gameOver) {
        return (
            <PageLayout>
                <Card title="🎉 Klart!">
                    <p>Du fick {vm.result.correctAnswers} av {vm.result.totalQuestions} rätt!</p>
                    <GameButton onClick={() => presenter.load()}>Spela igen</GameButton>
                </Card>
            </PageLayout>
        );
    }

    const question = vm.currentQuestion;

    return (
        <PageLayout>
            <Card title="🫧 Bokstavsbubblor" headerBgColor="pink">
                {question && (
                    <>
                        <div style={{ textAlign: "center", marginTop: 16 }}>
                            <span style={{ fontSize: "1.4rem", fontWeight: 600 }}>
                                Hitta bokstaven:
                            </span>
                            <span style={{ fontSize: "2.2rem", marginLeft: 8 }}>
                                {question.targetLetter}
                            </span>
                        </div>

                        <Flex
                            justify="center"
                            style={{ gap: 32, flexWrap: "wrap", marginTop: 32 }}
                        >
                            {question.options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => vm.answer(option)}
                                    disabled={vm.isAnswerCorrect !== null}
                                    className={styles.bubbleButton}
                                    style={{ animationDelay: `${Math.random()}s` }}
                                >
                                    {option}
                                </button>
                            ))}
                        </Flex>

                        {vm.isAnswerCorrect !== null && (
                            <div style={{ textAlign: "center", marginTop: 24 }}>
                                <p style={{ fontSize: "1.2rem", marginBottom: 16 }}>
                                    {vm.isAnswerCorrect ? "✅ Rätt!" : "❌ Fel bokstav!"}
                                </p>

                            </div>
                        )}
                    </>
                )}
            </Card>
        </PageLayout>
    );
});
