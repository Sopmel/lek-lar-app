import { apiService } from "./ApiService";

export interface GameProgressResponse {
    playerId: string;
    progress: {
        gameKey: string;
        level: number;
        stars: number;
        playedAt: string;
    }[];
}

export class DashboardApiService {

    public async getProgress(): Promise<GameProgressResponse> {
        return apiService.get("progress");
    }

}
