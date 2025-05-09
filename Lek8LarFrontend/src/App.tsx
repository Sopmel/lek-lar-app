import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { CountGame } from "./pages/Dashboard/Games/MathGames/LevelOne/CountGame/CountGame";
import { ShapesGame } from "./pages/Dashboard/Games/MathGames/LevelOne/ShapesGame/ShapesGame";

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<HomePage />} />
      <Route path="/register" element={<HomePage />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/countgame" element={<CountGame />} />
      <Route path="/shapes" element={<ShapesGame />} />
    </Routes>

  );
};

export default App;
