import { apiService } from "./ApiService";
import { MemoryCard } from "../pages/Dashboard/Games/MemoryGames/LevelOne/MemoryGame/MemoryGamePresenter";

export class MemoryGameApiService {
    sessionId: string = "";

    async startGame(): Promise<void> {
        const res = await apiService.post("memorygame/start") as { sessionId: string };
        this.sessionId = res.sessionId;
    }

    async getInitialCards(): Promise<MemoryCard[]> {
        return apiService.get("memorygame/cards", { sessionId: this.sessionId });
    }

    public async sendProgress(level: number, stars: number) {
        return apiService.post("progress", {
            gameKey: "MemoryGame",
            level,
            stars,
            gameOver: true,
            levelCleared: stars === 5,
        });
    }

}
