import { apiService } from "./ApiService";
import { LetterBubbleQuestion } from "../pages/Dashboard/Games/ABCGames/LevelOne/LetterBubbles/LetterBubblesTypes";

export class LetterBubblesApiService {
    sessionId: string = "";

    async startGame(): Promise<void> {
        const res = await apiService.post("letterbubble/start") as { sessionId: string };
        this.sessionId = res.sessionId;
    }

    async getQuestion(): Promise<LetterBubbleQuestion> {
        return apiService.get("letterbubble/question", { sessionId: this.sessionId });
    }

    async submitAnswer(answer: string): Promise<LetterBubbleQuestion> {
        return apiService.post("letterbubble/answer", {
            sessionId: this.sessionId,
            answer,
        });
    }

    async sendProgress(result: {
        level: number;
        stars: number;
        gameOver: boolean;
        levelCleared: boolean;
    }) {
        await apiService.post("letterbubble/progress", result);
    }
}
