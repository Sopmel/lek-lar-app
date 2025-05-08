import { apiService } from "./ApiService";
import { Question, GameResult } from "../pages/Dashboard/Games/MathGames/LevelOne/CountGame/CountGamePresenter";

export class CountGameApiService {
    async startGame(difficulty: string = "easy"): Promise<{ sessionId: string }> {
        return apiService.post(`CountGame/start?difficulty=${difficulty}`);
    }

    async fetchQuestion(sessionId: string): Promise<Question | GameResult> {
        return apiService.get("CountGame/question", { sessionId });
    }

    async submitAnswer(sessionId: string, answer: number): Promise<{ correct: boolean; gameOver: boolean; stars: number }> {
        return apiService.post(`CountGame/answer?sessionId=${sessionId}`, answer);
    }
}
