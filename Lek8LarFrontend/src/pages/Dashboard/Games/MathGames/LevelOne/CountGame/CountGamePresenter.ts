import { makeObservable, observable, computed, action } from "mobx";
import { apiService } from "../../../../../../services/ApiService";

export type Question = {
    id: number;
    objectImageUrl: string;
    objectCount: number;
    options: number[];
    correctAnswer: number;
    gameResult: GameResult;
};

type StartGameResponse = { sessionId: string };

export type GameResult = {
    gameOver: boolean;
    stars: number;
    levelCleared: boolean;
};

type AnswerResponse = {
    correct: boolean;
    gameOver: boolean;
    stars: number;
};

export interface CountGameViewModel {
    imageElements: { key: number; src: string; alt: string }[];
    options: number[];
    gameTitle: string;
    starText: string;
    fiveStarText: string;
    finnishedLevelText: string;
    starCount: number;
    isPerfect: boolean;
    isLoading: boolean;
    feedback: string;
}

export class CountGamePresenter {
    sessionId: string | null = null;
    question: Question | null = null;
    feedback: string = "";
    stars: number = 0;
    gameOver: boolean = false;
    isLoading: boolean = true;

    constructor() {
        makeObservable(this, {
            sessionId: observable,
            question: observable,
            feedback: observable,
            stars: observable,
            gameOver: observable,
            isLoading: observable,
            viewModel: computed,
            startGame: action,
            fetchQuestion: action,
            submitAnswer: action
        });

        this.startGame();
    }

    get viewModel(): CountGameViewModel | null {
        if (!this.question) return null;

        const { objectImageUrl, objectCount, options } = this.question;

        return {
            imageElements: Array.from({ length: objectCount }).map((_, i) => ({
                key: i,
                src: `images/gameImages/${objectImageUrl}`,
                alt: `objekt: ${objectImageUrl.split('.')[0]}`,
            })),
            options,
            gameTitle: "🧮 Hur många ser du?",
            starText: "⭐".repeat(this.stars).padEnd(5, "☆"),
            fiveStarText: "Du fick 5 stjärnor:",
            finnishedLevelText: "🥳 Superbra jobbat! Du klarade nivå 1!",
            starCount: this.stars,
            isPerfect: this.stars === 5,
            isLoading: this.isLoading,
            feedback: this.feedback
        };
    }

    async startGame(): Promise<void> {
        try {
            const res: StartGameResponse = await apiService.post("CountGame/start?difficulty=easy", {});
            this.sessionId = res.sessionId;
            this.fetchQuestion();
        } catch (error) {
            console.error("Kunde inte starta spelet:", error);
        }
    }

    async fetchQuestion(): Promise<void> {
        if (!this.sessionId) return;

        try {
            this.isLoading = true;
            const res = await apiService.get("CountGame/question", { sessionId: this.sessionId });

            this.isLoading = false;

            if (this.isGameResult(res)) {
                this.gameOver = true;
                this.stars = res.stars;
                this.question = null;
            } else {
                this.question = res;
            }
        } catch (error) {
            console.error("Kunde inte hämta fråga:", error);
        }
    }

    async submitAnswer(answer: number): Promise<void> {
        if (!this.sessionId) return;

        try {
            const res: AnswerResponse = await apiService.post(
                "CountGame/answer",
                { sessionId: this.sessionId, answer },
                { headers: { "Content-Type": "application/json" } }
            );

            if (res.gameOver) {
                this.gameOver = true;
                this.stars = res.stars;
            } else {
                this.feedback = res.correct ? "🎉 Rätt!" : "❌ Fel, försök igen!";
                setTimeout(() => {
                    this.feedback = "";
                    this.fetchQuestion();
                }, 1000);
            }
        } catch (error) {
            console.error("Fel vid svar:", error);
        }
    }

    private isGameResult(res: any): res is GameResult {
        return typeof res.gameOver === "boolean" && typeof res.stars === "number";
    }
}