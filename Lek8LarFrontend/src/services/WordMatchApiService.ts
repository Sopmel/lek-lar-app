import { apiService } from "./ApiService";
import { MatchQuestion, GameResult } from "../pages/Dashboard/Games/ABCGames/LevelOne/WordMatch/WordMatchTypes";

export class WordMatchApiService {
    public async startGame(level: number): Promise<{ sessionId: string }> {
        return apiService.post(`wordmatch/start?level=${level}`);
    }

    public async fetchQuestion(sessionId: string): Promise<MatchQuestion | GameResult> {
        return apiService.get("wordmatch/question", { sessionId });
    }

    public async submitAnswer(
        sessionId: string,
        answerImageUrl: string
    ): Promise<{ correct: boolean; gameOver: boolean; stars: number }> {
        return apiService.post("wordmatch/answer", {
            sessionId,
            answer: answerImageUrl,
        });
    }

    public async sendProgress(level: number, stars: number) {
        return apiService.post("progress", {
            gameKey: "WordMatch",
            level,
            stars,
            gameOver: true,
            levelCleared: stars === 5,
        });
    }

}