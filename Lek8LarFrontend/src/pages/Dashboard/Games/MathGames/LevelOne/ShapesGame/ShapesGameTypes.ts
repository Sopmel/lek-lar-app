export type ShapeQuestion = {
    id: number;
    shapeImageUrl: string;
    options: string[];
    correctAnswer: string;
    gameOver: boolean;
    sessionId: string;
};

export type GameResult = {
    gameOver: boolean;
    stars: number;
    level: number;
    levelCleared: boolean;
};