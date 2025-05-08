import { useState } from "react";
import { Button, Input, Card, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { registerPresenter } from "./RegisterPresenter";
import { SmileOutlined, CloseOutlined } from "@ant-design/icons"; // Ikoner

const { Title } = Typography;

interface RegisterPageProps {
    onClose: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onClose }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const result = await registerPresenter.register(username, password);
            if (result.success) {
                alert("Registrering lyckades! 🚀");
                onClose();
                navigate("/dashboard");
            } else {
                alert(result.message);
            }
        } catch {
            alert("Något gick fel vid registreringen.");
        }
    };

    return (
        <Flex vertical align="center" gap={20} style={{ padding: "24px" }}>
            <Title level={3} style={{ color: "#FF69B4", textAlign: "center" }}>
                Registrera <SmileOutlined />
            </Title>

            <Input
                placeholder="Användarnamn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                    padding: "12px",
                    fontSize: "18px",
                    borderRadius: "15px",
                    marginBottom: "15px",
                    borderColor: "#FF69B4",
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
                    marginBottom: "20px",
                    borderColor: "#FF69B4",
                }}
            />

            <Button
                type="primary"
                block
                onClick={handleRegister}
                style={{
                    marginTop: 10,
                    backgroundColor: "#FF69B4",
                    borderColor: "#FF69B4",
                    borderRadius: "15px",
                }}
            >
                Registrera 🚀
            </Button>
            <Button
                block
                onClick={() => navigate("/login")}
                style={{
                    backgroundColor: "#FFB6C1",
                    borderRadius: "15px",
                    marginTop: 10,
                }}
            >
                Redan registrerad? Logga in
            </Button>
            <Button
                danger
                block
                onClick={onClose}
                style={{
                    backgroundColor: "#f2d7d5",
                    borderRadius: "15px",
                    marginTop: 10,
                }}
            >
                <CloseOutlined /> Stäng
            </Button>
        </Flex>
    );
};

export default RegisterPage;
