import { useState } from "react";
import { Button, Input, Flex, Typography } from "antd";
import { SmileOutlined, CloseOutlined } from "@ant-design/icons";
import { loginPresenter } from "./LoginPresenter";

const { Title } = Typography;

interface LoginPageProps {
    onClose: () => void;
    onSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onClose, onSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await loginPresenter.login(username, password);
            alert("Inloggning lyckades! 🚀");
            onClose();
            onSuccess();
        } catch {
            alert("Fel användarnamn eller lösenord");
        }
    };

    return (
        <Flex
            vertical
            align="center"
            gap={20}
            style={{
                padding: "32px",
                backgroundColor: "#fff0f5",
                borderRadius: "20px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                fontFamily: "'Comic Sans MS', cursive, sans-serif",
                width: "100%",
                maxWidth: "400px",
            }}
        >
            <Title level={3} style={{ color: "#FF69B4", textAlign: "center", marginBottom: 0 }}>
                Logga in <SmileOutlined />
            </Title>

            <Input
                placeholder="Användarnamn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                    padding: "12px",
                    fontSize: "18px",
                    borderRadius: "15px",
                    border: "2px solid #FF69B4",
                }}
            />

            <Input.Password
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                    padding: "12px",
                    fontSize: "18px",
                    borderRadius: "15px",
                    border: "2px solid #FF69B4",
                }}
            />

            <Button
                type="primary"
                block
                onClick={handleLogin}
                style={{
                    backgroundColor: "#FF69B4",
                    borderColor: "#FF69B4",
                    borderRadius: "15px",
                    fontWeight: "bold",
                    fontSize: "16px",
                }}
            >
                Logga in 🚀
            </Button>

            <Button
                danger
                block
                onClick={onClose}
                style={{
                    backgroundColor: "#f2d7d5",
                    borderRadius: "15px",
                    fontWeight: "bold",
                    fontSize: "16px",
                }}
            >
                <CloseOutlined /> Stäng
            </Button>
        </Flex>
    );
};

export default LoginPage;
