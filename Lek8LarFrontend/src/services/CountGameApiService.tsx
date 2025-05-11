import { apiService } from "./ApiService";
import { Question, GameResult } from "./../pages/Dashboard/Games/MathGames/LevelOne/CountGame/CountGameTypes";

export class CountGameApiService {
    public async startGame(difficulty: string = "easy"): Promise<{ sessionId: string }> {
        return apiService.post(`CountGame/start?difficulty=${difficulty}`);
    }

    public async fetchQuestion(sessionId: string): Promise<Question | GameResult> {
        return apiService.get("CountGame/question", { sessionId });
    }

    public async submitAnswer(sessionId: string, answer: number): Promise<{ correct: boolean; gameOver: boolean; stars: number }> {
        return apiService.post("CountGame/answer", {
            sessionId,
            answer,
        });
    }

}

