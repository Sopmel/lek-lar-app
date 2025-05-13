import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { CountGame } from "./pages/Dashboard/Games/MathGames/LevelOne/CountGame/CountGame";
import { ShapesGame } from "./pages/Dashboard/Games/MathGames/LevelOne/ShapesGame/ShapesGame";
import { PlusGame } from "./pages/Dashboard/Games/MathGames/LevelOne/PlusGame/PlusGame";
import { LetterHunt } from "./pages/Dashboard/Games/ABCGames/LevelOne/LetterHunt/LetterHunt";
import { WordMatch } from "./pages/Dashboard/Games/ABCGames/LevelOne/WordMatch/WordMatch";

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<HomePage />} />
      <Route path="/register" element={<HomePage />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/countgame" element={<CountGame />} />
      <Route path="/shapes" element={<ShapesGame />} />
      <Route path="/plus" element={<PlusGame />} />
      <Route path="/letters" element={<LetterHunt />} />
      <Route path="/wordmatch" element={<WordMatch />} />
    </Routes>

  );
};

export default App;
