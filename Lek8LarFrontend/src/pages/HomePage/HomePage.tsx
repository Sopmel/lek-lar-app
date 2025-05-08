import { useState } from "react";
import { PageLayout } from "../../components/PageLayout/PageLayout";
import { Flex, Card } from "../../components/LekLarComponentLibrary";
import { Modal } from "../../components/Modal/Modal";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const navigate = useNavigate();

    const buttonBase: React.CSSProperties = {
        width: "100%",
        padding: "14px",
        borderRadius: "20px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        border: "none",
        transition: "all 0.2s ease-in-out",
    };

    return (
        <PageLayout>
            <main
                style={{
                    width: "100%",
                    maxWidth: "960px",
                    margin: "0 auto",
                    padding: "32px 16px",
                    fontFamily: "'Comic Sans MS', cursive, sans-serif",
                }}
            >
                <Card
                    title={<h1 style={{ margin: 0, fontSize: "2.5rem", color: "#222" }}>Välkommen! <span role="img" aria-label="vinka">👋</span></h1>}
                    headStyle={{ backgroundColor: "#ffc0cb", textAlign: "center", borderRadius: "12px 12px 0 0" }}
                    style={{
                        backgroundColor: "#fff",
                        padding: 24,
                        borderRadius: 24,
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Flex justify="space-between" align="center" gap={50} style={{ flexWrap: "wrap" }}>
                        <section style={{ flex: 1, minWidth: 280 }}>
                            <p style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
                                Välkommen till <strong>LEK&LÄR</strong> – en rolig inlärningsplattform där barn får träna matte, språk och logik genom lek.<br />
                                Välj att logga in eller registrera dig för att börja spela!
                            </p>
                        </section>

                        <section aria-label="Login and registration" style={{ flex: 1, minWidth: 280 }}>
                            <Card
                                style={{
                                    textAlign: "center",
                                    padding: "24px",
                                    borderRadius: "24px",
                                    backgroundColor: "#fff",
                                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <button
                                    style={{
                                        ...buttonBase,
                                        backgroundColor: "#ff69b4",
                                        color: "white",
                                        marginBottom: "16px",
                                    }}
                                    onClick={() => setIsLoginOpen(true)}
                                >
                                    Logga in
                                </button>

                                <button
                                    style={{
                                        ...buttonBase,
                                        backgroundColor: "#ffe6f0",
                                        color: "#333",
                                        border: "1px solid #ffb6c1",
                                    }}
                                    onClick={() => setIsRegisterOpen(true)}
                                >
                                    Registrera
                                </button>
                            </Card>
                        </section>
                    </Flex>
                </Card>
            </main>

            <Modal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} title="Logga in">
                <LoginPage
                    onClose={() => setIsLoginOpen(false)}
                    onSuccess={() => {
                        setIsLoginOpen(false);
                        navigate("/dashboard");
                    }}
                />
            </Modal>

            <Modal open={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} title="Registrera">
                <RegisterPage onClose={() => setIsRegisterOpen(false)} />
            </Modal>
        </PageLayout>
    );
};

export default HomePage;