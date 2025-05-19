import { useNavigate } from "react-router-dom";
import { DashboardPresenter } from "./DashboardPresenter";
import { PageLayout } from "../../components/PageLayout/PageLayout";
import { AccessibleCard, Card, GameRow, Flex } from "../../components/LekLarComponentLibrary";
import { usePresenter } from "../../hooks/usePresenter";
import { observer } from "mobx-react-lite";
import { DashboardHeader } from "./DashboardHeader";

const Dashboard = observer(() => {
    const presenter = usePresenter(DashboardPresenter);
    const vm = presenter.viewModel;
    const navigate = useNavigate();
    const countGameStars = vm.starsPerGame.CountGame ?? 0;
    const shapeGameStars = vm.starsPerGame.ShapesGame ?? 0;
    const plusGameStars = vm.starsPerGame.PlusGame ?? 0;
    const letterHuntStars = vm.starsPerGame.LetterHunt ?? 0;
    const wordMatchStars = vm.starsPerGame.WordMatch ?? 0;
    const letterBubblesStars = vm.starsPerGame.LetterBubbleGame ?? 0;
    const memoryGameStars = vm.starsPerGame.MemoryGame ?? 0;
    const whatsMissingStars = vm.starsPerGame.WhatsMissing ?? 0;
    console.log("Dashboard stars", vm.starsPerGame);





    return (
        <PageLayout>

            <Card title={vm.cardTitle}>

                <DashboardHeader
                    playerName={vm.playerName}
                    level={vm.currentLevel}
                    totalStars={vm.totalStars}
                />

                <GameRow title={vm.mathGameRowTitle} backgroundColor="#ffe6f0">

                    <AccessibleCard
                        hoverable
                        title="🔢 Räkna saker"
                        description={`Stjärnor: ${"⭐".repeat(countGameStars).padEnd(5, "☆")}`}
                        onClick={() => navigate("/countgame?level=1")}
                        style={{ width: 240, minHeight: 180 }}
                    />

                    <AccessibleCard
                        hoverable
                        title="⭐ Formjakten"
                        description={`Stjärnor: ${"⭐".repeat(shapeGameStars).padEnd(5, "☆")}`}
                        onClick={() => navigate("/shapes")}
                        style={{ width: 240, minHeight: 180 }}
                    />
                    <AccessibleCard
                        hoverable
                        title="➕ Plus tal"
                        description={`Stjärnor: ${"⭐".repeat(plusGameStars).padEnd(5, "☆")}`}
                        onClick={() => navigate("/plus")}
                        style={{ width: 240, minHeight: 180 }}
                    />

                </GameRow>

                <GameRow title={vm.ABCGameRowTitle} backgroundColor="#e0f7ff">

                    <AccessibleCard
                        hoverable
                        title="🔤 Bokstäver"
                        description={`Stjärnor: ${"⭐".repeat(letterHuntStars).padEnd(5, "☆")}`}
                        onClick={() => navigate("/letters")}
                        style={{ width: 240, minHeight: 180 }}
                    />
                    <AccessibleCard
                        hoverable
                        title="📚 Ord"
                        description={`Stjärnor: ${"⭐".repeat(wordMatchStars).padEnd(5, "☆")}`}
                        onClick={() => navigate("/wordmatch")}
                        style={{ width: 240, minHeight: 180 }}
                    />
                    <AccessibleCard
                        hoverable
                        title="✍️ Stava"
                        description={`Stjärnor: ${"⭐".repeat(letterBubblesStars).padEnd(5, "☆")}`}
                        onClick={() => navigate("/letterbubbles")}
                        style={{ width: 240, minHeight: 180 }}
                    />

                </GameRow>

                <GameRow title={vm.memoryGameRowTitle} backgroundColor="#e0ffe0">

                    <AccessibleCard
                        hoverable
                        title="🧠 Memory"
                        description={`Stjärnor: ${"⭐".repeat(memoryGameStars).padEnd(5, "☆")}`}
                        onClick={() => navigate("/memorygame")}
                        style={{ width: 240, minHeight: 180 }}
                    />
                    <AccessibleCard
                        hoverable
                        title="🧠 Memory 2"
                        description="Var uppmärksam och matcha rätt."
                        onClick={() => navigate("/math")}
                        style={{ width: 240, minHeight: 180 }}
                    />
                    <AccessibleCard
                        hoverable
                        title="🧠 Vad saknas?"
                        description={`Stjärnor: ${"⭐".repeat(whatsMissingStars).padEnd(5, "☆")}`}
                        onClick={() => navigate("/whatsmissing")}
                        style={{ width: 240, minHeight: 180 }}
                    />

                </GameRow>
            </Card>
        </PageLayout>
    );
});

export default Dashboard;
