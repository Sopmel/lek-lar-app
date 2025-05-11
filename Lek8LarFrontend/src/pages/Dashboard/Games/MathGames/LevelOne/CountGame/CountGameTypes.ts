export type Question = {
    id: number;
    objectImageUrl: string;
    objectCount: number;
    options: number[];
    correctAnswer: number;
    gameResult: GameResult;
};

export type GameResult = {
    gameOver: boolean;
    stars: number;
    level: number;
    levelCleared: boolean;
};

export type AnswerResponse = {
    correct: boolean;
    gameOver: boolean;
    stars: number;
};

export type StartGameResponse = {
    sessionId: string;
};

