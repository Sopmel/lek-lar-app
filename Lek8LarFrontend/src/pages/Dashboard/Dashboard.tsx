import { useNavigate } from "react-router-dom";
import { useInjection } from "inversify-react";
import { GameProgressManager } from "../Dashboard/Services/GameProgressManager/GameProgressManager";
import { DashboardPresenter } from "./DashboardPresenter";
import { PageLayout } from "../../components/PageLayout/PageLayout";
import { AccessibleCard, Card, GameRow } from "../../components/LekLarComponentLibrary";
import { usePresenter } from "../../hooks/usePresenter";

const Dashboard = () => {
    const presenter = usePresenter(DashboardPresenter);
    const vm = presenter.viewModel;
    const navigate = useNavigate();
    const progress = useInjection<GameProgressManager>(GameProgressManager);
    const countGameStars = progress.getStars("CountGame", 1) ?? 0;
    const shapeGameStars = progress.getStars("ShapesGame", 1) ?? 0;
    const plusGameStars = progress.getStars("PlusGame", 1) ?? 0;
    const letterHuntStars = progress.getStars("LetterHunt", 1) ?? 0;
    const wordMatchStars = progress.getStars("WordMatch", 1) ?? 0;
    const letterBubblesStars = progress.getStars("LetterBubbles", 1) ?? 0;



    return (
        <PageLayout>
            <Card title={vm.cardTitle}>
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
                        description="Lös enkla matteproblem på ett kul sätt."
                        onClick={() => navigate("/math")}
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
                        title="🧠 Memory 3"
                        description="Tredje memoryspelet."
                        onClick={() => navigate("/math")}
                        style={{ width: 240, minHeight: 180 }}
                    />

                </GameRow>
            </Card>
        </PageLayout>
    );
};

export default Dashboard;
