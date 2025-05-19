export interface WhatsMissingQuestion {
    initialImages: string[];
    remainingImages: string[];
    allImages: string[];
    options: string[];
    correctAnswer: string;
}

export interface GameResult {
    gameOver: boolean;
    stars: number;
    level: number;
    levelCleared: boolean;
}
