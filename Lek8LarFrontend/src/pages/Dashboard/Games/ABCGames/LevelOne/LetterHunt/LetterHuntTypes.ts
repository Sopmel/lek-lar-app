export interface LetterQuestion {
    id: number;
    imageUrl: string;
    options: string[];
    partialWord: string;
    correctLetter: string;
    correctAnswer: string;
}

export interface GameResult {
    gameOver: boolean;
    stars: number;
    level: number;
    levelCleared: boolean;
}
