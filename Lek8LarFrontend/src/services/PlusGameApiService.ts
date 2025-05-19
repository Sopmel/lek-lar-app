import { injectable } from "inversify";
import { apiService } from "./ApiService";
import { Question, GameResult } from "../pages/Dashboard/Games/MathGames/LevelOne/PlusGame/PlusGameTypes";

@injectable()
export class PlusGameApiService {
    public async startGame(level: number): Promise<{ sessionId: string }> {
        return apiService.post(`plusgame/start?level=${level}`);
    }

    public async fetchQuestion(sessionId: string): Promise<Question | GameResult> {
        return apiService.get("plusgame/question", { sessionId });
    }

    public async submitAnswer(
        sessionId: string,
        answer: number
    ): Promise<Question> {
        return apiService.post("plusgame/answer", { sessionId, answer });
    }

    public async sendProgress(level: number, stars: number) {
        return apiService.post("progress", {
            gameKey: "PlusGame",
            level,
            stars,
            gameOver: true,
            levelCleared: stars === 5,
        });
    }

}
