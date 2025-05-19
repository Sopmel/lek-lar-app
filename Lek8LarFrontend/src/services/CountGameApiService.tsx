import { apiService } from "./ApiService";
import { Question, GameResult } from "./../pages/Dashboard/Games/MathGames/LevelOne/CountGame/CountGameTypes";

export class CountGameApiService {
    public async startGame(level: number): Promise<{ sessionId: string }> {
        return apiService.post(`countGame/start?level=${level}`);
    }

    public async fetchQuestion(sessionId: string): Promise<Question | GameResult> {
        return apiService.get("countGame/question", { sessionId });
    }

    public async submitAnswer(sessionId: string, answer: number): Promise<{ correct: boolean; gameOver: boolean; stars: number }> {
        return apiService.post("countGame/answer", {
            sessionId,
            answer,
        });
    }

    public async sendProgress(level: number, stars: number) {
        return apiService.post("progress", {
            gameKey: "CountGame",
            level,
            stars,
            gameOver: true,
            levelCleared: stars === 5,
        });
    }


}

