import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { CountGame } from "./pages/Dashboard/Games/MathGames/LevelOne/CountGame/CountGame";
import { ShapesGame } from "./pages/Dashboard/Games/MathGames/LevelOne/ShapesGame/ShapesGame";

const App = () => {

  const onCloseHandler = () => {
    // Logic to handle closing the modal or performing any other action
    console.log("Modal closed");
  };
  return (

    <Routes>
      <Route path="/login" element={<LoginPage onClose={onCloseHandler} />} />
      <Route path="/register" element={<RegisterPage onClose={onCloseHandler} />} />
      <Route path="/countgame" element={<CountGame />} />
      <Route path="/shapes" element={<ShapesGame />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routes>

  );
};

export default App;
