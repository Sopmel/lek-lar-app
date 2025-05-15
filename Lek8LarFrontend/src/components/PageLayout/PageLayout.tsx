import { GameButton } from "../LekLarComponentLibrary";
import { useNavigate } from "react-router-dom";

type PageLayoutProps = {
    children: React.ReactNode;
};

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const isHomePage = location.pathname === "/";

    const handleLogout = () => {
        navigate("/");
    };


    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                overflowY: "auto",
                position: "relative",
            }}
        >
            {!isHomePage && (
                <div style={{ position: "absolute", top: 16, right: 16 }}>
                    <GameButton onClick={handleLogout}>
                        Logga ut
                    </GameButton>
                </div>
            )}

            <div
                style={{
                    width: "100%",
                    maxWidth: 960,
                }}
            >
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/images/leklarlogo.png"
                        alt="Lek & Lär logga"
                        style={{
                            width: "420px",
                            maxWidth: "80vw",
                            height: "auto",
                            opacity: 0.95,
                        }}
                    />
                    <img
                        src="/images/maskot-vink.png"
                        alt="Maskot"
                        style={{
                            width: "300px",
                            maxWidth: "20vw",
                            height: "auto",
                            marginLeft: "8px",
                        }}
                    />
                </div>
                {children}
            </div>
        </div>
    );
};
