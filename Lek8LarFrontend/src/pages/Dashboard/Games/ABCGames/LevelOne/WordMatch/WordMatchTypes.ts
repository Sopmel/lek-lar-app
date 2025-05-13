export interface MatchQuestion {
    id: number;
    imageUrl: string;
    options: string[];
    correctImage: string;
}

export interface MatchAnswerRequest {
    sessionId: string;
    answer: string;
}

export interface GameResult {
    gameOver: boolean;
    stars: number;
    level: number;
    levelCleared: boolean;
}