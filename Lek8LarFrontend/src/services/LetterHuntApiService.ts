import { apiService } from "./ApiService";
import { LetterQuestion, GameResult } from "../pages/Dashboard/Games/ABCGames/LevelOne/LetterHunt/LetterHuntTypes";

export class LetterHuntApiService {
    public async startGame(level: number): Promise<{ sessionId: string }> {
        return apiService.post(`letterhunt/start?level=${level}`);
    }

    public async fetchQuestion(sessionId: string): Promise<LetterQuestion | GameResult> {
        return apiService.get("letterhunt/question", { sessionId });
    }

    public async submitAnswer(sessionId: string, answer: string): Promise<{ correct: boolean; gameOver: boolean; stars: number }> {
        return apiService.post("letterhunt/answer", {
            sessionId,
            answer,
        });
    }
}
