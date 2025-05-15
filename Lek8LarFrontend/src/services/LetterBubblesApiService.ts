import { LetterBubbleQuestion } from "../pages/Dashboard/Games/ABCGames/LevelOne/LetterBubbles/LetterBubblesTypes";

export class LetterBubblesApiService {
    async getQuestions(): Promise<LetterBubbleQuestion[]> {

        return [
            { targetLetter: "A", options: ["A", "B", "C"] },
            { targetLetter: "M", options: ["N", "M", "L"] },
            { targetLetter: "Z", options: ["X", "Y", "Z"] },
        ];
    }

    async sendProgress(result: {
        level: number;
        stars: number;
        gameOver: boolean;
        levelCleared: boolean;
    }) {
        await fetch("/api/letterbubble/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
        });
    }
}





