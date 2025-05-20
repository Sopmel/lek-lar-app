export interface ColorMixQuestion {
    id: number;
    color1: string;
    color2: string;
    options: string[];
    correctAnswer: string;
}

export interface GameResult {
    gameOver: boolean;
    stars: number;
    level: number;
    levelCleared: boolean;
}

export interface StartColorMixGameResponse {
    sessionId: string;
}