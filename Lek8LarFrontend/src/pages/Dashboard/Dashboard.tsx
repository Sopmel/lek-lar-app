import { useNavigate } from "react-router-dom";
import { PageLayout } from "../../components/PageLayout/PageLayout";
import { AccessibleCard, Card, GameRow } from "../../components/LekLarComponentLibrary";


const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <PageLayout>
            <Card title="🎮 Välj ett spel">
                <GameRow title="➕ Matte – Nivå 1" backgroundColor="#ffe6f0">

                    <AccessibleCard
                        hoverable
                        title="🔢 Räkna saker"
                        description="Räkna hur många objekt du ser."
                        onClick={() => navigate("/countgame")}
                        style={{ width: 240, minHeight: 180 }}
                    />
                    <AccessibleCard
                        hoverable
                        title="⭐ Formjakten"
                        description="Gissa rätt form på bilden."
                        onClick={() => navigate("/shapes")}
                        style={{ width: 240, minHeight: 180 }}
                    />
                    <AccessibleCard
                        hoverable
                        title="➕ Pluss tal"
                        description="Träna enkla additioner."
                        onClick={() => navigate("/math")}
                        style={{ width: 240, minHeight: 180 }}
                    />

                </GameRow>

                <GameRow title="🔤 ABC – Nivå 1" backgroundColor="#e0f7ff">

                    <AccessibleCard
                        hoverable
                        title="🔤 Bokstäver"
                        description="Lär dig stava genom roliga utmaningar."
                        onClick={() => navigate("/spelling")}
                        style={{ width: 240, minHeight: 180 }}
                    />
                    <AccessibleCard
                        hoverable
                        title="📚 Ord"
                        description="Träna ordförståelse."
                        onClick={() => navigate("/spelling")}
                        style={{ width: 240, minHeight: 180 }}
                    />
                    <AccessibleCard
                        hoverable
                        title="✍️ Stava"
                        description="Stavningsövningar."
                        onClick={() => navigate("/spelling")}
                        style={{ width: 240, minHeight: 180 }}
                    />

                </GameRow>

                <GameRow title="🧠 Memory – Nivå 1" backgroundColor="#e0ffe0">

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
