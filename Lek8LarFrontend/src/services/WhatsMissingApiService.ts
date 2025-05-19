import { apiService } from "./ApiService";
import { WhatsMissingQuestion, GameResult } from "../pages/Dashboard/Games/MemoryGames/LevelOne/WhatsMissing/WhatsMissingTypes";

export class WhatsMissingApiService {
    async startGame(): Promise<{ sessionId: string }> {
        return apiService.post("whatsmissing/start");
    }

    async fetchQuestion(sessionId: string): Promise<WhatsMissingQuestion> {
        return apiService.get(`whatsmissing/question?sessionId=${sessionId}`);
    }

    async submitAnswer(sessionId: string, answer: string): Promise<GameResult> {
        return apiService.post(`whatsmissing/answer?sessionId=${sessionId}`, answer, {
            headers: { "Content-Type": "application/json" },
        });
    }

    async sendProgress(result: GameResult) {
        return apiService.post("progress", {
            gameKey: "WhatsMissing",
            level: result.level,
            stars: result.stars,
            gameOver: result.gameOver,
            levelCleared: result.levelCleared,
        });
    }
}
