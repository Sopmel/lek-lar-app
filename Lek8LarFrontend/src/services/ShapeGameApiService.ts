import { apiService } from "../services/ApiService";
import { ShapeQuestion, GameResult } from "../pages/Dashboard/Games/MathGames/LevelOne/ShapesGame/ShapesGameTypes";

export class ShapeGameApiService {
    async startGame(): Promise<{ sessionId: string }> {
        return apiService.post("ShapeGame/start", {});
    }

    async fetchQuestion(sessionId: string): Promise<ShapeQuestion | GameResult> {
        return apiService.get("ShapeGame/question", { sessionId });
    }

    async submitAnswer(
        questionId: number, answer: string, sessionId: string
    ): Promise<{ correct: boolean; gameOver: boolean; stars: number }> {
        return apiService.post("ShapeGame/answer", {
            sessionId,
            questionId,
            answer,
        });
    }
}
