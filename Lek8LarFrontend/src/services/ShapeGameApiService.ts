import { apiService } from "./ApiService";
import { ShapeQuestion, GameResult } from "../pages/Dashboard/Games/MathGames/LevelOne/ShapesGame/ShapesGameTypes";

export class ShapeGameApiService {
    public async startGame(level: number): Promise<{ sessionId: string }> {
        return apiService.post(`shapesgame/start?level=${level}`);
    }

    public async fetchQuestion(sessionId: string, level: number): Promise<ShapeQuestion | GameResult> {
        return apiService.get("shapesgame/question", {
            sessionId,
            level: level.toString(),
        });
    }

    public async submitAnswer(questionId: number, answer: string, sessionId: string): Promise<{ correct: boolean; gameOver: boolean; stars: number }> {
        return apiService.post("shapesgame/answer", {
            questionId,
            answer,
            sessionId,
        });
    }
}
