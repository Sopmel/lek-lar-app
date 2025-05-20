import { apiService } from "./ApiService";
import { ColorMixQuestion, GameResult } from "../pages/Dashboard/Games/MemoryGames/LevelOne/ColorMixGame/ColorMixTypes";

export class ColorMixApiService {
    public async startGame(level: number): Promise<{ sessionId: string }> {
        return apiService.post(`colormixgame/start?level=${level}`);
    }

    public async fetchQuestion(sessionId: string): Promise<ColorMixQuestion> {
        return apiService.get("colormixgame/question", { sessionId });
    }

    public async submitAnswer(sessionId: string, answer: string): Promise<{ correct: boolean; gameOver: boolean; stars: number }> {
        return apiService.post("colormixgame/answer", {
            sessionId,
            answer,
        });
    }

    public async sendProgress(result: GameResult) {
        return apiService.post("progress", {
            gameKey: "ColorMixGame",
            level: result.level,
            stars: result.stars,
            gameOver: result.gameOver,
            levelCleared: result.levelCleared,
        });
    }

}