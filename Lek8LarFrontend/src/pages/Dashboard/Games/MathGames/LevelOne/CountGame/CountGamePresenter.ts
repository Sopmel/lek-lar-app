import { makeObservable, observable, computed, action } from "mobx";
import { injectable, inject } from "inversify";
import { CountGameApiService } from "../../../../../../services/CountGameApiService";
import {
    Question,
    GameResult,
} from "./CountGameTypes";

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
    isLoadingMessage: string;
    feedback: string;
    correctText: string;
    incorrectText: string;
}

@injectable()
export class CountGamePresenter {
    sessionId: string | null = null;
    question: Question | null = null;
    feedback: string = "";
    stars: number = 0;
    gameOver: boolean = false;
    isLoading: boolean = true;

    constructor(
        @inject(CountGameApiService) private countGameApiService: CountGameApiService
    ) {
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
            submitAnswer: action,
        });

        this.startGame();
    }

    get viewModel(): CountGameViewModel {
        const { objectImageUrl, objectCount, options } = this.question ?? {};

        const safeImageUrl = objectImageUrl ?? "";
        const safeObjectCount = objectCount ?? 0;

        return {
            imageElements: Array.from({ length: safeObjectCount }).map((_, i) => ({
                key: i,
                src: `images/gameImages/${safeImageUrl}`,
                alt: `objekt: ${safeImageUrl.split(".")[0]}`,
            })),
            options: options ?? [],
            gameTitle: "🧮 Hur många ser du?",
            starText: "⭐".repeat(this.stars).padEnd(5, "☆"),
            fiveStarText: "Du fick 5 stjärnor:",
            finnishedLevelText: "🥳 Superbra jobbat! Du klarade nivå 1!",
            starCount: this.stars,
            isPerfect: this.stars === 5,
            isLoading: this.isLoading,
            isLoadingMessage: "Laddar...",
            feedback: this.feedback,
            correctText: "🎉 Rätt!",
            incorrectText: "❌ Fel, försök igen!",
        };
    }

    public async startGame(): Promise<void> {
        try {
            const res = await this.countGameApiService.startGame();
            this.sessionId = res.sessionId;
            this.fetchQuestion();
        } catch (error) {
            console.error("Kunde inte starta spelet:", error);
        }
    }

    public async submitAnswer(answer: number): Promise<void> {
        if (!this.sessionId) return;
        try {
            const res = await this.countGameApiService.submitAnswer(this.sessionId, answer);

            if (res.gameOver) {
                this.gameOver = true;
                this.stars = res.stars;
            } else {
                this.feedback = res.correct
                    ? this.viewModel?.correctText ?? ""
                    : this.viewModel?.incorrectText ?? "";
                setTimeout(() => {
                    this.feedback = "";
                    this.fetchQuestion();
                }, 1000);
            }
        } catch (error) {
            console.error("Fel vid svar:", error);
        }
    }

    public async fetchQuestion(): Promise<void> {
        if (!this.sessionId) return;
        try {
            this.isLoading = true;
            const res = await this.countGameApiService.fetchQuestion(this.sessionId);
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

    private isGameResult(res: any): res is GameResult {
        return typeof res.gameOver === "boolean" && typeof res.stars === "number";
    }
}
