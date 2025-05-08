import { observer } from "mobx-react-lite";
import { ShapesGamePresenter } from "./ShapesGamePresenter";
import { Card, Button, Flex } from "../../../../../../components/LekLarComponentLibrary";
import { PageLayout } from "../../../../../../components/PageLayout/PageLayout";
import { Typography } from "antd";

const { Paragraph } = Typography;
const presenter = new ShapesGamePresenter();

export const ShapesGame = observer(() => {
    const question = presenter.question;
    const renderStars = (count: number) => {
        return "⭐".repeat(count).padEnd(5, "☆");
    };

    if (presenter.gameOver) {
        return (
            <PageLayout>
                <Flex justify="center" align="center" style={{ padding: "32px 0" }}>

                    <Card
                        title="🎉 Spelet är klart!"
                        headerBgColor="#ffcc00"
                    >
                        <Paragraph style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#444" }}>
                            Du fick 5 stjärnor:<br />
                            <span style={{ fontSize: "2rem", color: "#ffcc00" }}>{renderStars(presenter.stars)}</span>
                        </Paragraph>
                        {presenter.stars === 5 && (
                            <Paragraph style={{ fontSize: "1.3rem", color: "#ff69b4", fontWeight: "bold" }}>
                                🥳 Superbra jobbat! Du klarade nivå 1!
                            </Paragraph>
                        )}
                    </Card>
                </Flex>
            </PageLayout>
        );
    }

    if (!question) {
        return (
            <PageLayout>
                <Flex justify="center" align="center" style={{ padding: "32px 0" }}>
                    <Paragraph>Laddar fråga...</Paragraph>
                </Flex>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <Flex justify="center" align="center" style={{ padding: "32px 0" }}>

                <Card
                    title="🔷 Vilken form är detta?"
                    headStyle={{ backgroundColor: "lightblue", textAlign: "center" }}
                    style={{ width: 600, textAlign: "center", backgroundColor: "#f0f8ff" }}
                >
                    <img
                        src={`images/gameImages/shapes/${question.shapeImageUrl}`}
                        alt="Visad form"
                        width={120}
                        style={{ marginBottom: 32 }}
                    />

                    <Flex justify="center" gap={20} style={{ flexWrap: "wrap" }}>
                        {question.options.map((option: string) => (
                            <Button
                                key={option}
                                onClick={() => presenter.submitAnswer(option)}
                                style={{
                                    padding: "12px 24px",
                                    fontSize: "18px",
                                    borderRadius: "15px",
                                    backgroundColor: "#87cefa",
                                    border: "none",
                                    fontWeight: "bold",
                                }}
                            >
                                {option}
                            </Button>
                        ))}
                    </Flex>

                    {presenter.feedback && (
                        <Paragraph style={{ marginTop: 24, fontWeight: "bold", fontSize: "18px" }}>
                            {presenter.feedback}
                        </Paragraph>
                    )}
                </Card>
            </Flex>
        </PageLayout>
    );
});
