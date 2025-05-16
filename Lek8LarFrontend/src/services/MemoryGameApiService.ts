import { apiService } from "./ApiService";
import { MemoryCard } from "../pages/Dashboard/Games/MemoryGames/LevelOne/MemoryGamePresenter";

export class MemoryGameApiService {
    sessionId: string = "";

    async startGame(): Promise<void> {
        const res = await apiService.post("memorygame/start") as { sessionId: string };
        this.sessionId = res.sessionId;
    }

    async getInitialCards(): Promise<MemoryCard[]> {
        return apiService.get("memorygame/cards", { sessionId: this.sessionId });
    }

    async sendProgress(result: {
        level: number;
        stars: number;
        gameOver: boolean;
        levelCleared: boolean;
    }) {
        await apiService.post("progress", {
            gameKey: "MemoryGame",
            ...result,
        });
    }

}
