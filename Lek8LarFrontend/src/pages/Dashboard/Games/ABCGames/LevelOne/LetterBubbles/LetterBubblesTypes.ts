export interface LetterBubbleQuestion {
    targetLetter: string;
    options: string[];
    gameResult?: {
        correct: boolean;
        stars: number;
        level: number;
        gameOver: boolean;
        levelCleared: boolean;
    };
}

export interface GameResult {
    correctAnswers: number;
    totalQuestions: number;
}
