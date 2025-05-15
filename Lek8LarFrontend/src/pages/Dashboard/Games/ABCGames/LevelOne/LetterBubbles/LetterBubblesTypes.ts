export interface LetterBubbleQuestion {
    targetLetter: string;
    options: string[];
}

export interface GameResult {
    correctAnswers: number;
    totalQuestions: number;
}
